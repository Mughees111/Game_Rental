import React, { useEffect, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import { ArrowBack, SettingsLargeIcon } from '../Components/SvgIcons'
import { StatusBar } from 'expo-status-bar';


import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import { apiRequest } from '../utils/apiCalls'




var dropDownAlertRef;


const TandCond = (props) => {


    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)

    function getNoti() {
        setLoading(true)
        const dbData = {
            slug: "terms-and-conditions"
        }
        apiRequest(dbData, 'get_page', false)
            .then(data => {
                if (data) {
                    setLoading(false)
                    if (data.action == 'success') {
                        setContent(data.data.content)
                        setTitle(data.data.title)
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

    }


    useEffect(() => {
        getNoti()
    }, [])


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


                <View style={{ flexL: 1, position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}>
                    <ScrollView style={{ height: "100%", flex: 1 }}>
                        <Text style={{ width: 316, alignSelf: 'center', fontFamily: 'LR', fontSize: 12, color: '#FFFFFF', marginTop: 30, lineHeight: 15 }}>{content}</Text>
                    </ScrollView>

                </View>

                <View style={{ width: "90%", alignSelf: 'center' }}>
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

                        <Text style={{ marginLeft: 10, fontFamily: 'PSBo', fontSize: 16, color: '#FFFFFF', }}>{title}</Text>

                    </View>
                </View>

            </ImageBackground>

        </View>

    )
}

export default TandCond


