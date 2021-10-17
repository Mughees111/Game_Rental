import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { changeSelection, loggedInVendorObservable, selectionObservable } from '../../Common'
import { Phone, EmailIcon, GoogleIcon, FaceBookIcon, ArrowBack } from '../Components/SvgIcons'
import { useFocusEffect } from '@react-navigation/native';


const OnBoardingV = (props) => {


  
    return (
        <View style={{ flex: 1, backgroundColor: '#111111', }}>
            <StatusBar
                hidden={true}
            />

            <Image
                source={require("../assets/onBoarding1.png")}
                style={{
                    marginTop: -25,
                    marginLeft: -20
                }}
            />
            <SafeAreaView
                style={{ position: 'absolute', left: 20 }}
            >
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                        changeSelection.changeNow(0)
                    }}
                >
                    <ArrowBack />
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>

                {/* <Text style={{ fontFamily: 'LR', fontSize: 16, color: '#707070', lineHeight: 20, paddingLeft: 35, paddingRight: 40, alignSelf: 'center' }}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.Lorem
                    Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an
                    of Lorem Ipsum.
                </Text> */}
                <Text style={{ fontFamily: 'PSBo', fontSize: 32, color: '#FFFFFF', marginLeft: 35, marginTop: 25, lineHeight: 42 }}>Make Money off your Gaming Collection</Text>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('CreateAccountV')
                    }}
                    style={{ flexDirection: 'row', width: "85%", alignSelf: "center", height: 47, marginTop: 25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRadius: 29 }}>
                    {/* <Phone /> */}
                    <Text style={{ color: '#8D8D8D', fontFamily: 'LR', fontSize: 15, marginLeft: 10 }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('SignInV')
                    }}
                    style={{ flexDirection: 'row', width: "85%", alignSelf: "center", height: 47, marginTop: 15, backgroundColor: '#1757C6', justifyContent: 'center', alignItems: 'center', borderRadius: 29 }}>
                    {/* <EmailIcon /> */}
                    <Text style={{ color: '#FFFFFF', fontFamily: 'LR', fontSize: 16, marginLeft: 10 }}>Login</Text>
                </TouchableOpacity>

                {/* <View style={{ flexDirection: 'row', width: "85%", alignSelf:"center",  height: 47,justifyContent:'space-between',marginTop:20}}>
                    <TouchableOpacity style={{width: 152,height:47,borderRadius:29,borderWidth:1,justifyContent:'center',alignItems:'center',borderColor:'#EB4132'}}>
                        <GoogleIcon/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 152,height:47,borderRadius:29,borderWidth:1,justifyContent:'center',alignItems:'center',borderColor:'#1757C6'}}>
                        <FaceBookIcon/>
                    </TouchableOpacity>
                    
                </View> */}


            </ScrollView>
        </View>
    )
}

export default OnBoardingV
