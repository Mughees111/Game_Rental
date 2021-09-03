import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { ArrowBack } from '../Components/SvgIcons'
import { StatusBar } from 'expo-status-bar';


const UserProfile = (props) => {



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
                                props.navigation.navigate('ProfileDetails')
                            }}
                        >
                            <Text style={[styles.text, { marginTop: 40 }]}>Update Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                props.navigation.navigate('ChangePassword');
                            }}
                        >
                            <Text style={styles.text}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                onPress={() => {
                                    // props.navigation.navigate('PrivacyPolicy')
                                }}
                                style={styles.text}>Interest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('TandCond')
                            }}
                        >
                            <Text style={styles.text}>What system do you own?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Gamertags</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        fontFamily: 'PRe',
        fontSize: 18,
        color: '#FFFFFF',
        marginTop: 25
    }

})

export default UserProfile
