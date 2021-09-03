import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View,TouchableOpacity ,TextInput,Text,Image, StyleSheet, ActivityIndicator } from 'react-native'
import { AddressLocation } from '../Components/SvgIcons'

import { doConsole, retrieveItem, storeItem,validateEmail } from "./../utils/functions";
import { urls } from "./../utils/Api_urls";
import { changeLoggedIn, changeLoggedInVendor } from "../../Common";


import DropdownAlert from "react-native-dropdownalert";
import { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
var alertRef;


const Address1 = (props) => {


  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState("")
  const [langtext, setLangtext] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = React.useState({})
  useFocusEffect(React.useCallback(() => {
      retrieveItem("login_data").then((data) => {
          setUser(data)
      })
  }, []))

//   useEffect(()=>{
//       if(user && user?.token)
//       {
//           getData()
//           askNotificationPermission()
//       }
//   },[user])

  const doSignup = ()=>{
  


    if(address.length<6)
    {
      alertRef.alertWithType("error","Error","Please enter a valid Address");
      return;
    }
    goSignup()
  }


  const goSignup = ()=>{
    setLoading(true)
        
        var body_data = {token:user?.token,address};
        doConsole(" I request @ "+urls.API+"update_address");
        doConsole(body_data);
        fetch(urls.API + 'update_address', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_data),
        }).then((response) => response.json())
        .then((responseJson) => {
            doConsole(" I receive ");
            doConsole(responseJson);
            if (responseJson.action == "success") {
                storeItem("login_data", responseJson.data).then(() => {
                  setLoading(false)
                    if(responseJson.data.step==1)
                    {
                        navigation.navigate("Address1")
                    }
                    else if(responseJson.data.step==2)
                    {
                        navigation.navigate("Interests")
                    }
                    else if(responseJson.data.step==3)
                    {
                        navigation.navigate("TitleYouOwn")
                    }
                    else if(responseJson.data.step==4)
                    {
                        navigation.navigate("SystemOwns")
                    }
                    else{
                        changeLoggedIn.changeNow(1)
                    }
                });
            }
            else {
                setLoading(false)
                alertRef.alertWithType("error","Error",responseJson.error)
            }
        }).catch((error) => {
            setLoading(false)
            alertRef.alertWithType("error","Error","Internet error")
        });
  }

    return (
        <View style={{flex:1}}>
            <StatusBar
                hidden={true}
            />
            <View style={{ zIndex: 1 }}>
              <DropdownAlert ref={ref => alertRef = ref} />
            </View>
            <Image
                source={require("../assets/Map.png")}
            />
            <TouchableOpacity style={styles.address}>
                <TextInput
                    placeholder="Enter Text"
                    placeholderTextColor="#6D6D6D"
                    autoCapitalize={"none"}
                    value={address}
                    onChangeText={(t)=>setAddress(t)}
                    style={{
                        backgroundColor:'white',
                        borderBottomWidth:0,
                        fontFamily:'PRe',
                        fontSize:13,
                        width:"90%"
                    }}
                />
                <TouchableOpacity>
                    <AddressLocation/>
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity 
                 onPress={()=>{
                    if(!loading) doSignup()
                    // props.navigation.navigate('SignIn')
                    
                }}
                style={{width: 308,height:48,backgroundColor: '#A047C8',position: 'absolute',bottom:30,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:9,flexDirection:"row"}}>
                <Text style={{fontFamily:'PMe',fontSize:18,color:'#FFFFFF'}}>Choose Address</Text>{loading && <ActivityIndicator color={"#fff"} size={"small"} />}
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    address : {
        width: 308,
        height:48,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top:57,
        alignSelf:'center',
        borderRadius:8,
        paddingLeft:15,
        paddingRight:10,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        elevation:2,
        
    }
})
export default Address1
