import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform, Image, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native'
import { ArrowBack, CAccountMail, CAccountPassword, CAccountPerson, CAccountPhone, TCContainer, TCTick } from '../Components/SvgIcons'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


import { doConsole, retrieveItem, storeItem, validateEmail } from "./../utils/functions";
import { urls } from "./../utils/Api_urls";
import { changeLoggedIn, changeLoggedInVendor, changeSelection } from "../../Common";

import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import DropdownAlert from "react-native-dropdownalert";
var alertRef;



const CreateAccount = (props) => {



    const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cpassword, setCPassword] = useState('')


    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')


    const doSignup = () => {


        if (username.length < 3) {
            alertRef.alertWithType("error", "Error", "Please enter a valid name");
            return;
        }


        if (!validateEmail(email)) {
            alertRef.alertWithType("error", "Error", "Please enter a valid email");
            return;
        }

        if (phone.length < 10) {
            alertRef.alertWithType("error", "Error", "Please enter a valid phone");
            return;
        }




        if (password.length < 6) {
            alertRef.alertWithType("error", "Error", "Please enter at least 6 characters as password");
            return;
        }

        if (password != cpassword) {
            alertRef.alertWithType("error", "Error", "Passwords don't match");
            return;
        }


        goSignup()

    }


    const goSignup = () => {
        setLoading(true)

        var token = "khali";
        var body_data = { email, password, name: username, image };
        doConsole(" I request @ " + urls.API + "signup");
        doConsole(body_data);
        fetch(urls.API + 'signup', {
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
                        // changeLoggedIn.changeNow(1)
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
        <View style={{ flex: 1, }}>
            <StatusBar
                hidden={true}
            />
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => alertRef = ref} />
            </View>
            <LinearGradient
                // Background Linear Gradient
                colors={['#111111', '#17162B']}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} >
                    <View style={{ marginLeft: 10, width: "80%", alignSelf: 'center', flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 30 : 27, }}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.goBack()
                                }}
                            >
                                <ArrowBack />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF', }}> </Text>
                        </View>
                        <Text style={{ marginTop: 98, fontFamily: 'PSBo', fontSize: 24, color: '#FFFFFF' }}>Create Account</Text>




                        <View style={styles.textInputContainer}>
                            <CAccountPerson />
                            <TextInput
                                style={[styles.textInput]}
                                placeholderTextColor="#BFBFBF"
                                placeholder="Email"
                                placeholder="Name"
                                value={username} // just a state variable
                                autoCapitalize={"none"}
                                onChangeText={(v) => {
                                    setUsername(v)
                                }}

                            />
                        </View>

                        <View style={styles.textInputContainer}>
                            <CAccountMail />
                            <TextInput
                                style={[styles.textInput]}
                                placeholderTextColor="#BFBFBF"
                                placeholder="Email"
                                value={email} // just a state variable
                                autoCapitalize={"none"}
                                onChangeText={(v) => {
                                    setEmail(v)
                                }}

                            />
                        </View>

                        <View style={styles.textInputContainer}>
                            <CAccountPhone />
                            <TextInput
                                style={[styles.textInput]}
                                placeholderTextColor="#BFBFBF"
                                placeholder="Phone"
                                value={phone} // just a state variable
                                autoCapitalize={"none"}
                                onChangeText={(v) => {
                                    setPhone(v)
                                }}
                            />
                        </View>

                        <View style={styles.textInputContainer}>
                            <CAccountPassword />
                            <TextInput
                                style={[styles.textInput]}
                                placeholderTextColor="#BFBFBF"
                                secureTextEntry
                                placeholder="Password"
                                value={password} // just a state variable
                                autoCapitalize={"none"}
                                onChangeText={(v) => {
                                    setPassword(v)
                                }}
                            />
                        </View>

                        <View style={styles.textInputContainer}>
                            <CAccountPassword />
                            <TextInput
                                style={[styles.textInput]}
                                placeholderTextColor="#BFBFBF"
                                secureTextEntry
                                autoCapitalize={"none"}
                                placeholder="Confirm Password"
                                value={cpassword}
                                onChangeText={(v) => {
                                    setCPassword(v)
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, }}>

                            <View style={{ backgroundColor: '#A047C8', alignItems: 'center', height: 20.55, width: 23.07, justifyContent: 'center', borderRadius: 4 }}>
                                <TCTick />
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                <Text style={{ color: '#878787', fontFamily: 'PRe', fontSize: 12 }}>I agree to the</Text>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('TandCond')}
                                >
                                    <Text style={{ color: '#A047C8', fontFamily: 'PMe', fontSize: 12 }}> Terms & Conditions</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#878787', fontFamily: 'PRe', fontSize: 12, textAlign: 'left' }}> and</Text>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('PrivacyPolicy')}
                                    style={{ position: 'absolute', left: 0 }}>
                                    <Text style={{ color: '#A047C8', fontFamily: 'PMe', fontSize: 12, }}>{"\n"}Privacy Policy.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('Address1')
                                if (!loading)
                                    doSignup()
                            }}
                            style={{ borderWidth: 1, borderColor: '#FFFFFF', width: "100%", height: 54, borderRadius: 9, marginTop: 40, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                            <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Sign Up</Text>{loading && <ActivityIndicator color={"#fff"} size={"small"} />}
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
                            navigation.navigate("SignIn")
                        }}>
                            <Text style={{ fontSize: 12, fontFamily: "PMe", color: '#A047C8', alignSelf: "center" }}>Login</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

                {/* <Image
                    style={{position: 'absolute',right:Dimensions.get('screen').width-502.79,top:Dimensions.get('window').height-250,}}
                    source={require("../assets/CAccountC1.png")}
                /> */}

                {/* <Image
                    style={{position: 'absolute', top:502,left:10}}
                    source={require("../assets/CAccountC2.png")}
                /> */}




            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        // width: 315,
        height: 48,
        backgroundColor: '#000000',
        borderRadius: 8,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    textInput: {
        width: '100%',
        height: "100%",
        color: '#BFBFBF',
        fontFamily: 'PRe',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 2,
        alignItems: 'center'
    }
})

export default CreateAccount
