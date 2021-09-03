import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { ArrowBack } from '../Components/SvgIcons'
import { StatusBar } from 'expo-status-bar';


const SettingsV = (props) => {

    const keyExtractor = useCallback((item, index) => index.toString(), []);







    return (
        <View style={{ flex: 1, backgroundColor: '#A047C8' }}>
            <ImageBackground
                source={require("../assets/HomeBGImage.png")}
                style={{ width: "100%", height: 265, flex: 1 }}
            >

                <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}>
                    <View style={{ paddingLeft: 40 }}>

                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('Support')
                            }}
                        >
                            <Text style={[styles.text, { marginTop: 40 }]}>Support</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Contact Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                onPress={() => {
                                    props.navigation.navigate('PrivacyPolicy')
                                }}
                                style={styles.text}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('TandCond')
                            }}
                        >
                            <Text style={styles.text}>Terms and Conditions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Share App</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {

                                props.navigation.navigate('SellerNavigator', {
                                    screen: 'ChangePassword',
                                    params: {
                                        Vendor: true
                                    }

                                })
                            }}
                               
                        >
                            <Text style={styles.text}>Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('SellerNavigator', {
                                    screen: 'ProfileDetailsV',
                                    params: {
                                        Vendor: true
                                    }

                                })
                            }}
                        >
                            <Text style={styles.text}>Update Profile</Text>
                        </TouchableOpacity>
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
                            <Text style={{ marginLeft: 10, fontFamily: 'PSBo', fontSize: 16, color: '#FFFFFF', }}>Settings</Text>
                        </View>
                    </View>
                </View>





            </ImageBackground>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('OnBoardingNavigator')
                }}
                style={{ width: "75%", alignSelf: 'center', backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 100, height: 54, borderRadius: 9 }}>
                <Text style={{ fontSize: 18, fontFamily: 'PMe', color: '#FFFFFF' }}>Logout</Text>
            </TouchableOpacity>

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

export default SettingsV
