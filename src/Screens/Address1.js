import { StatusBar } from 'expo-status-bar'
import React, { useRef } from 'react'
import { View, TouchableOpacity, TextInput, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { AddressLocation, ArrowBack } from '../Components/SvgIcons'

import { doConsole, retrieveItem, storeItem, validateEmail } from "./../utils/functions";
import { urls } from "./../utils/Api_urls";
import { changeLoggedIn, changeLoggedInVendor } from "../../Common";


import DropdownAlert from "react-native-dropdownalert";
import { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import ReactNativeModal from 'react-native-modal'
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from "fiction-places-autocomplete";
import Loader from '../utils/Loader';



var alertRef;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const Address1 = (props) => {


    const navigation = useNavigation()
    var map = useRef(null)
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState("")
    const [langtext, setLangtext] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mapFlex, setFlex] = useState(1)
    const [GOOGLE_MAPS, setGOOGLE_MAPS] = useState('AIzaSyBCcRdOVZFoGUabErTjle8HTXP0R5arBuw')
    const [userSelectedLocation, setUserSelectedLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        locationTitle: ''
    });

    const [user, setUser] = React.useState({})
    useFocusEffect(React.useCallback(() => {
        retrieveItem("login_data").then((data) => {
            setUser(data)
        })
    }, []))


    async function handleUserLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let locationn = await Location.getCurrentPositionAsync({});
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;
        const latDelta = locationn.coords.accuracy * (1 / (Math.cos(locationn.coords.latitude) * circumference));
        const lonDelta = (locationn.coords.accuracy / oneDegreeOfLongitudeInMeters);

        var r = locationn.coords

        var pkey = GOOGLE_MAPS;
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + r.latitude + "," + r.longitude + "&key=" + pkey;
        console.log(url);
        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([]),
        }).then((response) => response.json())
            .then((responseJson) => {
                setLoading(false)
                // console.log("I get:");
                // console.log(responseJson.status);
                if (responseJson.status == "OK") {

                    console.log(responseJson.results[0].formatted_address);

                    var address = responseJson.results[0].formatted_address;

                    setUserSelectedLocation({
                        ...userSelectedLocation,
                        latitude: locationn.coords.latitude,
                        longitude: locationn.coords.longitude,
                        latitudeDelta: Math.max(0, latDelta),
                        longitudeDelta: Math.max(0, lonDelta),
                        locationTitle: address
                    })
                }

            })
            .catch((error) => {
                setLoading(false)
                setTimeout(() => {
                    dropDownAlertRef.alertWithType('error', 'error', "Network Request Failed, Please check your internet connect and try again");
                    //   alert(error);
                }, 500);

            });

    }


    useEffect(() => {
        handleUserLocation()
        setTimeout(() => setFlex(1), 100);

    }, [])

    const doSignup = () => {



        if (userSelectedLocation.locationTitle < 6) {
            alertRef.alertWithType("error", "Error", "Please enter a valid Address");
            return;
        }
        goSignup()
    }


    const goSignup = () => {
        setLoading(true)

        var body_data = { token: user?.token, address: userSelectedLocation.locationTitle };
        doConsole(" I request @ " + urls.API + "update_address");
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
                        if (responseJson.data.step == 1) {
                            navigation.navigate("Address1")
                        }
                        else if (responseJson.data.step == 2) {
                            navigation.navigate("Interests")
                        }
                        else if (responseJson.data.step == 3) {
                            navigation.navigate("TitleYouOwn")
                        }
                        else if (responseJson.data.step == 4) {
                            navigation.navigate("SystemOwns")
                        }
                        else {
                            changeLoggedIn.changeNow(1)
                        }
                    });
                }
                else {
                    setLoading(false)
                    alertRef.alertWithType("error", "Error", responseJson.error)
                }
            }).catch((error) => {
                setLoading(false)
                alertRef.alertWithType("error", "Error", "Internet error")
            });
    }

    return (

        <View style={{ width: "100%", height: "100%", backgroundColor: 'white' }}>
            <View style={[{ flex: 1, }]}>

                <View style={{ zIndex: 1 }}>
                    <DropdownAlert ref={ref => alertRef = ref} />
                </View>
                {loading && <Loader />}

                <View>
                    <View style={{
                        position: "relative",paddingTop:mapFlex, marginTop: 30, borderTopLeftRadius: 10, overflow: "hidden", borderTopRightRadius: 10,
                    }}>
                        <MapView
                        onMapReady={()=>setFlex(45)}
                            
                            // ref={ref => map = ref}

                            initialRegion={userSelectedLocation}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            // onRegionChangeComplete={region => setUserSelectedLocation(region)}
                            // onRegionChangeComplete={(v) => {
                            //   getLocationTitle(v)
                            // }}
                            region={userSelectedLocation}
                            provider={PROVIDER_GOOGLE}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Marker
                                title="Me" coordinate={userSelectedLocation}
                                pinColor="#A047C8"
                            />
                        </MapView>
                    </View>

                    <View
                        style={{ width: viewportWidth, position: 'absolute', top: 30 }}
                    >
                        <GooglePlacesAutocomplete
                            ref={map}
                            placeholder={'Search'}
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                            listViewDisplayed={false}    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} // custom description render
                    
                            onPress={(data, details) => { // 'details' is provided when fetchDetails = true
                                // console.log('lat = ' + details.geometry.location.lat);
                                // console.log(details.geometry.location.lng);
                                // let region = {
                                //   latitude: details.geometry.location.lat,
                                //   longitude: details.geometry.location.lng,
                                //   latitudeDelta: 0,
                                //   longitudeDelta: 0
                                // }
                                // setRegion(region)
                                setUserSelectedLocation({
                                    ...userSelectedLocation,
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    locationTitle: data.description
                                })


                            }}


                            // getDefaultValue={()=>{this.state.searched_location}}

                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: GOOGLE_MAPS,
                                language: 'en', // language of the results
                                // types: '(cities)' // default: 'geocode'
                                components: "country:us|country:pr|country:vi|country:gu|country:mp"
                            }}

                            styles={{
                                textInputContainer: {
                                    width: viewportWidth * (75 / 100),
                                    // alignSelf: "center",
                                    marginLeft:20,
                                    backgroundColor: "#fff",
                                    borderWidth: 1,
                                    borderTopWidth: 1,
                                    zIndex: 22,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#0E2163",
                                    borderTopColor: "#0E2163",
                                    borderLeftColor: "#0E2163",
                                    borderRightColor: "#0E2163",
                                    marginTop: 10,
                                    borderRadius: 4,
                                },
                                row: { paddingLeft: viewportWidth * (5 / 100) },
                                listView: { backgroundColor: "#fff" },
                                description: { fontWeight: 'bold' },
                                predefinedPlacesDescription: { color: '#1faadb' },
                                container: { width: viewportWidth, alignSelf: "center", zIndex: 55555 }
                            }}
                            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                            // currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                type: 'cafe'
                            }}


                            GooglePlacesDetailsQuery={{
                                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                fields: ['formatted_address', 'geometry'],
                            }}

                            // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                            // predefinedPlaces={[cancel]}

                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                            renderLeftButton={() => (
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.goBack()
                                    }}
                                    style={{ justifyContent: "center", marginLeft: 15 }}>
                                    <ArrowBack color="black" />
                                </TouchableOpacity>
                            )}
                            renderRightButton={() => null}
                        />
                    </View>
                </View>



            </View>

            <TouchableOpacity
                onPress={() => {
                    if (!loading) doSignup()
                    // props.navigation.navigate('SignIn')

                }}
                style={{ width: 308, height: 48, backgroundColor: '#A047C8', position: 'absolute', bottom: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 9, flexDirection: "row" }}>
                <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Choose Address</Text>{loading && <ActivityIndicator color={"#fff"} size={"small"} />}
            </TouchableOpacity>


        </View>


        // <View style={{ flex: 1 }}>
        //     <StatusBar
        //         hidden={true}
        //     />
        //     <View style={{ zIndex: 1 }}>
        //         <DropdownAlert ref={ref => alertRef = ref} />
        //     </View>
        //     <Image
        //         source={require("../assets/Map.png")}
        //     />
        //     <TouchableOpacity style={styles.address}>
        //         <TextInput
        //             placeholder="Enter Text"
        //             placeholderTextColor="#6D6D6D"
        //             autoCapitalize={"none"}
        //             value={address}
        //             onChangeText={(t) => setAddress(t)}
        //             style={{
        //                 backgroundColor: 'white',
        //                 borderBottomWidth: 0,
        //                 fontFamily: 'PRe',
        //                 fontSize: 13,
        //                 width: "90%"
        //             }}
        //         />
        //         <TouchableOpacity>
        //             <AddressLocation />
        //         </TouchableOpacity>
        //     </TouchableOpacity>

        //     <TouchableOpacity
        //         onPress={() => {
        //             if (!loading) doSignup()
        //             // props.navigation.navigate('SignIn')

        //         }}
        //         style={{ width: 308, height: 48, backgroundColor: '#A047C8', position: 'absolute', bottom: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 9, flexDirection: "row" }}>
        //         <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Choose Address</Text>{loading && <ActivityIndicator color={"#fff"} size={"small"} />}
        //     </TouchableOpacity>

        // </View>
    )
}

const styles = StyleSheet.create({
    address: {
        width: 308,
        height: 48,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 57,
        alignSelf: 'center',
        borderRadius: 8,
        paddingLeft: 15,
        paddingRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,

    }
})
export default Address1
