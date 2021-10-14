import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { ArrowBack, FbIcon, InstaIcon, LocationIcon, Phone } from '../Components/SvgIcons'
import { StatusBar } from 'expo-status-bar';


const ContactUs = (props) => {

    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const [sentRequest, setSentRequest] = useState(false)

    const topRatedData = [
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img7.png")
        },
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img8.png")
        },
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img7.png")
        },
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img8.png")
        },
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img7.png")
        },
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img8.png")
        },
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img7.png")
        },
        {
            name: " Asad Sultan",
            gameName: "Game Name",
            image: require("../assets/img8.png")
        },

    ]







    return (
        <View style={{ flex: 1, backgroundColor: '#A047C8' }}>
            <ImageBackground
                source={require("../assets/HomeBGImage.png")}
                style={{ width: "100%", height: 265, flex: 1 }}
            >

                <View style={{ paddingHorizontal: 25, position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }}>
                            <Image source={require('../assets/instaIcon.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 20 }}>
                            <FbIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <LocationIcon />
                        <Text style={{ marginLeft: 10, fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF', }}>lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,</Text>
                    </View>
                    <View style={{ flexDirection: 'row',marginTop:20 }}>
                        <Phone color="white" />
                        <Text style={{ marginLeft: 10, fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF', }}>536546657567</Text>
                    </View>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <SettingsLargeIcon/> */}
                            <Text style={{ marginLeft: 10, fontFamily: 'PSBo', fontSize: 16, color: '#FFFFFF', }}>Contact Us</Text>
                        </View>
                    </View>


                </View>





            </ImageBackground>
            {/* <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('OnBoardingNavigator')
                }}
                style={{ width: "75%", alignSelf: 'center', backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 100, height: 54, borderRadius: 9 }}>
                <Text style={{ fontSize: 18, fontFamily: 'PMe', color: '#FFFFFF' }}>Logout</Text>
            </TouchableOpacity> */}

        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        fontFamily: 'PRe',
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 20
    }

})

export default ContactUs
