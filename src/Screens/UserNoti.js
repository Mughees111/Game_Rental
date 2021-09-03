
import React, { useCallback, useState, useEffect } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon, ArrowBack, PlusIcon } from '../Components/SvgIcons'
import Modal from 'react-native-modal';
import Picker from '../Components/Picker';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';


import { apiRequest } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";
import { urls } from "./../utils/Api_urls";
import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";


var dropDownAlertRef;
const UserNoti = (props) => {

    const [loading, setLoading] = useState(false)
    const [notifs, setNotifs] = useState([])
    

    function getNoti() {
        var x = dropDownAlertRef;
        setLoading(true)
        retrieveItem("login_data")
            .then((d) => {

                const dbData = {
                    token: d.token
                }
                apiRequest(dbData, 'get_notifs', false)
                    .then(data => {
                        if (data) {
                            setLoading(false)
                            if (data.action == 'success') {
                                setNotifs(data.notifs)
                            }
                            else {
                                x.alertWithType("error", "Error", data.error);
                            }
                        }
                        else {
                            setLoading(false)
                            x.alertWithType("error", "Error", "Internet Error");
                        }
                    })
            })
    }


    useFocusEffect(React.useCallback(() => {
        getNoti()
    }, []))


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
                <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    <TouchableOpacity 
                        onPress={()=>{
                            props.navigation.goBack();
                        }}
                        style={{ width: "100%", justifyContent: 'space-between', marginTop: 20, flexDirection: 'row' }}>
                        <ArrowBack />
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#fff' }}>Notifications</Text>
                    </TouchableOpacity>

                    <StatusBar
                        hidden={true}
                    />
                    <View style={{ marginTop: "15%" }}>
                        {
                            notifs.length ? 
                            <FlatList
                            data={[1, 2, 4, 5, 123, 512, 1]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ width: "92%", alignSelf: 'center', marginTop: 20, paddingBottom: 15, borderBottomWidth: 1, borderColor: "#A047C8" }}>
                                    <Text style={{ color: "#fff", fontSize: 14, fontFamily: 'PRe', lineHeight: 22 }}>
                                        <Text style={{ fontFamily: 'PBo' }}>Mr. Talha</Text>
                                        <Text>  has Rented</Text>
                                        <Text style={{ fontFamily: 'PBo' }}>    Spiderman 3</Text>
                                        <Text>  for</Text>
                                        <Text style={{ fontFamily: 'PBo' }}>    7 Days 7 Days7 Days</Text>
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        : !loading &&  <Text style={{fontFamily:'PBo',fontSize:25,color:'#fff',textAlign:'center',alignSelf:'center',marginTop:20}}>You have no notification</Text>
                        }
                        
                    </View>
                </View>
            </ImageBackground>
        </View>

    )
}

export default UserNoti
