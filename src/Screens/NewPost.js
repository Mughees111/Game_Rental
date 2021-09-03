import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, Platform, ScrollView,Alert } from 'react-native'
import Header from '../Components/Header'
import { SendMsg, RecieveMsg } from '../Components/Msg'
import { RattingStarIcon, HeartWhiteIcon, XBoxIcon, KMLocationIcon, PickupIcon, PDPChatIcon, SearchIcon, DrawerIcon, ChatLargeIcon, ArrowBack, ShareIcon, ArrowRight, PickupLargeIcon, DeliveryLargeIcon } from '../Components/SvgIcons'
import Loader from '../utils/Loader'
import { apiRequest, doPost } from "./../utils/apiCalls";
import DropdownAlert from "react-native-dropdownalert";
import { validateEmail, retrieveItem, storeItem, doAlertPlease } from "./../utils/functions";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react'
import PrivacyPicker from '../Components/PrivacyPicker';
import { urls } from '../utils/Api_urls';

var dropDownAlertRef;

const NewPost = (props) => {

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)


  const [imagesArray, setImagesArray] = useState([])
  const [url, setUrl] = useState();
  const [imagesArrayFile, setImagesArrayFile] = useState([])


  const [title, setTitle] = React.useState("")
  const [selectedSystem, setSelectedSystem] = React.useState("")
  const [condition, setCondition] = React.useState("")
  const [games, setGame] = useState("")
  const [interest, setInterest] = useState("")
  const [pickup, setPickup] = useState(0);


  const [gamesList, setGamesList] = useState([]);
  const [interestList, setInterestList] = useState([]);
  const [systemList, setSystemList] = useState([]);

  const [user, setUser] = React.useState({})


  useFocusEffect(React.useCallback(() => {
    getData()
  }, []))




  const getData = () => {

    retrieveItem("login_data_vendor").then((d) => {
      setUser(d)
      apiRequest({ token: d.token }, 'get_systems', true)
        .then(data => {
          if (data) {
            var tor = [];
            // for (let key in data.list) {
            //   tor.push({
            //     title: data.list[key].title,
            //     id: data.list[key].id,
            //     selected: data.list[key].selected
            //   })
            // }
            setSystemList(data.list)
          } //test git
          else dropDownAlertRef.alertWithType("error", "Error", "No Internet");
        })

      apiRequest({ token: d.token }, 'get_games', true)
        .then(data => {
          if (data) {
            if (data.action == 'success') {
              setGamesList(data.list)
            }
          }
          else dropDownAlertRef.alertWithType("error", "Error", "No Internet");
        })

      apiRequest({ token: d.token }, 'get_interests', true)
        .then(data => {
          if (data) {
            if (data.action == 'success') {
              setInterestList(data.list)
            }
          }
          else dropDownAlertRef.alertWithType("error", "Error", "No Internet");
        })

    })
  }

  function getCondition() {
    var tor = [];
    for (let i = 1; i <= 10; i++) tor.push({
      title: i
    })
    return tor

  }

  function postAd() {

    const postDataObj = {
      token: user.token,
      title,
      photos: imagesArrayFile,
      system_id: selectedSystem,
      game_id: games,
      interest_id: interest,
      condition,
      is_pickup: pickup
    }
    console.log(postDataObj)
    apiRequest(postDataObj, 'add_post', true)
      .then(data => {
        if (data) {
          console.log(data)
          if (data.action == 'success') {
            setLoading(false)
            console.log(data)
            dropDownAlertRef.alertWithType("success", "Success", "Post Added");
            navigation.goBack();
          }
          else {
            setLoading(false)
            console.log('error generated');
            console.log(data);
            dropDownAlertRef.alertWithType("error", "Error", "Error");
          }

        }
        else {
          setLoading(false)
          dropDownAlertRef.alertWithType("error", "Error", "Internet Error");
        }
      })
  }

  function validatePost() {

    if (title.length < 5) {
      dropDownAlertRef.alertWithType("error", "Error", "Please enter a valid title");
      return
    }
    if (imagesArray.length < 1) {
      dropDownAlertRef.alertWithType("error", "Error", "Please post at least 1 photo");
      return
    }
    if (selectedSystem.length < 1) {
      dropDownAlertRef.alertWithType("error", "Error", "Please select system ");
      return
    }
    if (games.length < 1) {
      dropDownAlertRef.alertWithType("error", "Error", "Please select game");
      return
    }
    if (interest.length < 1) {
      dropDownAlertRef.alertWithType("error", "Error", "Please select interest");
      return
    }
    if (condition.length < 1) {
      dropDownAlertRef.alertWithType("error", "Error", "Please select condition");
      return
    }
    setLoading(true)
    postAd();
  }

  // useEffect(() => {
  //   if (user && user?.token) {
  //     // getOffers()
  //   }
  // }, [user])


  const addOffer = async () => {

    if (!validateEmail(email)) {
      dropDownAlertRef.alertWithType("error", "Error", "Please enter a valid email");
      return
    }

    if (number.length < 10) {
      dropDownAlertRef.alertWithType("error", "Error", "Please a valid phone number");
      return
    }


    setLoading(true)
    const dbData = { token: user?.token ?? "", email, phone: number, address, image };
    console.log(dbData)
    const { isError, data } = await doPost(dbData, "update_profile", true);
    console.log(isError);
    console.log(data);
    setLoading(false)
    if (isError) {
      dropDownAlertRef.alertWithType("error", "Error", "Internet");
    }
    else {
      if (data.action == "success") {
        setLoading(false)
        dropDownAlertRef.alertWithType("success", "Success", "Profile has been updated successfully");
        setBtn(false)
        storeItem("login_data_vendor", data.data).then(() => {
          doData()
        })
      }
      else {
        setLoading(false)
        dropDownAlertRef.alertWithType("error", "Error", data.error);
      }
    }
  }


  const update_dp = async (dp_type = 1) => {

    console.log(Permissions.MEDIA_LIBRARY);

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.MEDIA_LIBRARY
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      finalStatus = status;

    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      var err = 'You need to allow storage permission manually from your phone settings in order add this data';
      alert(err)
      return;
    }
    else {

      var result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        base64: false,
      });
      if (result) {
        do_update_dp(result.uri, result, dp_type);
      }



    }

  }
  const update_dp_2 = async (dp_type = 1) => {

    console.log(Permissions.CAMERA);

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.CAMERA
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      finalStatus = status;

    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      var err = 'You need to allow storage permission manually from your phone settings in order add this data';
      alert(err)
      return;
    }
    else {

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        base64: false,
      });
      if (result.uri) {
        do_update_dp(result.uri, result, dp_type);
      }
    }

  }
  const do_update_dp = (url, response, type__) => {

    setLoading(true)

    console.log("gallery response");
    console.log(response);

    // var response = this.state.selected_modal_image[0];
    var my_ext = response.uri.split('.');

    var _ext = my_ext[my_ext.length - 1];


    var real_name = response.uri.split('/');
    var _real_name = real_name[real_name.length - 1];



    const data = new FormData();

    data.append("photo", {
      name: _real_name,
      type: Platform.OS === "android" ? "image/jpeg" : response.type,
      uri:
        Platform.OS === "android" ? response.uri : response.uri.replace("file://", "")
    });
    data.append("token", user.token);
    // data.append("path", "public/");

    console.log("this is wat I'm submitting");
    console.log(data);
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    fetch(urls.Image_Uri + "public", config)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("final_server_photo_response");
        console.log(1);
        console.log(responseJson);
        console.log(2);
        if (responseJson.action == "success") {
          console.log(3);
          console.log("here");
          var __final__url__ = responseJson.filename;
          var profile_pic_url = responseJson.url;

          setUrl(__final__url__);


          setImagesArray([...imagesArray, profile_pic_url]);
          setImagesArrayFile([...imagesArrayFile, __final__url__]);
          setLoading(false)
          // setImage(__final__url__)
          // setLoading(false)
        }
        else {
          console.log(4);
          setLoading(false)
          dropDownAlertRef.alertWithType('error', 'error', responseJson.error);
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(5);
        setLoading(false)

        dropDownAlertRef.alertWithType('error', 'error', "Internet Error");
        setLoading(false)
      });
  }



  return (
    <View style={{ flex: 1, backgroundColor: '#A047C8' }}>
      <View style={{ zIndex: 1 }}>
        <DropdownAlert ref={ref => dropDownAlertRef = ref} />
      </View>
      {loading && <Loader />}
      <ImageBackground
        source={require("../assets/HomeBGImage.png")}
        style={{ width: "100%", height: 265, flex: 1 }}
      >
        <View style={{ width: "80%", alignSelf: 'center' }}>
          {/* Header */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
            <StatusBar
              hidden={true}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={{ alignSelf: 'center' }}>
              <ArrowBack />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF', marginTop: -5, marginLeft: 5 }}>New Post</Text>
          </View>
        </View>


      </ImageBackground>


      <View style={{ flex: 1, position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43, paddingRight: 20, paddingTop: 30, paddingLeft: 25 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 250 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.text}>Game Title</Text>
          <TextInput
            placeholder="Enter Game Title Here"
            placeholderTextColor="#D5D5D5"
            style={styles.textInput}
            value={title}
            onChangeText={(t) => setTitle(t)}
          />
          {
            imagesArray.map((item, index) => {
              return (

                <Image
                  key={index}
                  style={{ width: 100, height: 100, borderRadius: 10, marginLeft: 10, marginTop: 15 }}
                  source={{ uri: item }} />

              )
            })
          }
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Upload Picture",
                'How do you want to upload picture?',

                [
                  { text: 'Camera', onPress: () => update_dp_2() },

                  { text: 'Gallery', onPress: () => update_dp() },
                ],
                { cancelable: true },
              );
            }}
            style={{ alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', width: 159, height: 40, borderRadius: 9, borderWidth: 1, borderColor: '#FFFFFF', marginTop: 10, backgroundColor: '#000000' }}>
            <Text style={{ fontFamily: 'PMe', fontSize: 12, color: '#FFFFFF' }}>Upload Photos</Text>
          </TouchableOpacity>

          <Text style={[styles.text, { marginTop: 10 }]}>System</Text>
          <View style={[styles.textInput, { paddingLeft: -0, paddingRight: 5, justifyContent: 'center', }]}>
            <PrivacyPicker
              selected={{ title: 'Select' }}
              data={systemList}
              onValueChange={(index, title) => {
                setSelectedSystem(title.id)
              }}
            />
          </View>

          <Text style={[styles.text, { marginTop: 10 }]}>Game</Text>
          <View style={[styles.textInput, { paddingLeft: -0, paddingRight: 5, justifyContent: 'center', }]}>
            <PrivacyPicker
              selected={{ title: 'Select' }}
              data={gamesList}
              onValueChange={(index, title) => {
                setGame(title.id)
              }}
            />
          </View>

          <Text style={[styles.text, { marginTop: 10 }]}>Interest</Text>
          <View style={[styles.textInput, { paddingLeft: -0, paddingRight: 5, justifyContent: 'center', }]}>
            <PrivacyPicker
              selected={{ title: 'Select' }}
              data={interestList}
              onValueChange={(index, title) => {
                setInterest(title.id)
              }}
            />
          </View>


          <Text style={[styles.text, { marginTop: 10 }]}>Condition</Text>
          <View style={[styles.textInput, { paddingLeft: -0, paddingRight: 5, justifyContent: 'center', }]}>
            <PrivacyPicker
              selected={{ title: 'Select' }}
              data={getCondition()}
              onValueChange={(index, title) => {
                setCondition(title.title)
              }}
            />
          </View>
          {/* <Text style={[styles.text, { marginTop: 30 }]}>Condition</Text>
          <TextInput
            placeholder="Enter Game Title Here"
            placeholderTextColor="#D5D5D5"
            style={styles.textInput}
          /> */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setPickup(1)}
                style={{ width: 65, height: 65, borderRadius: 32.5, backgroundColor: pickup == 1 ? "#A047C8" : '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <PickupLargeIcon />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginTop: 5 }}>Pickup</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setPickup(0)}
                style={{ width: 65, height: 65, borderRadius: 32.5, backgroundColor: pickup == 1 ? "#000000" : '#A047C8', alignItems: 'center', justifyContent: 'center' }}>
                <DeliveryLargeIcon />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginTop: 5 }}>Delivery</Text>
            </View>
          </View>

          <Text style={[styles.text, { marginTop: 30 }]}>Location</Text>
          <Image
            style={{ width: "100%", borderRadius: 9, marginTop: 10 }}
            source={require("../assets/Map1.png")}
          />
          <TouchableOpacity
            onPress={() => {
              validatePost()
            }}
            style={{ height: 54, justifyContent: 'center', alignItems: 'center', backgroundColor: "#A047C8", marginTop: 20, borderRadius: 9 }}>
            <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Send For Approval</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 48, backgroundColor: '#000000', color: '#D5D5D5', paddingLeft: 15, borderRadius: 8, marginTop: 10, fontFamily: 'PLi'
  },
  text: {
    fontSize: 16, fontFamily: 'PRe', color: '#FFFFFF'
  }
})

export default NewPost
