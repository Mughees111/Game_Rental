import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform, Image, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ArrowBack, CAccountMail, CAccountPassword } from '../Components/SvgIcons';



import { doConsole, retrieveItem, storeItem, validateEmail } from "./../utils/functions";
import { urls } from "./../utils/Api_urls";
import { changeLoggedIn, changeLoggedInVendor } from "../../Common";


import DropdownAlert from "react-native-dropdownalert";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
var alertRef;


const SignIn = (props) => {


    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [langg, setLangg] = useState(false)
    const [langtext, setLangtext] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const doSignup = () => {
        if (!validateEmail(email)) {
            alertRef.alertWithType("error", "Error", "Please enter your valid email");
            return;
        }


        if (password.length < 6) {
            alertRef.alertWithType("error", "Error", "Please enter at least 6 characters as password");
            return;
        }
        goSignup()
    }


    const goSignup = () => {
        setLoading(true)

        var token = "khali";
        var body_data = { email, password };
        doConsole(" I request @ " + urls.API + "login");
        doConsole(body_data);
        fetch(urls.API + 'login', {
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
                console.log(error)
                alertRef.alertWithType("error", "Error", "Internet error")
            });
    }

    const doGuest = () => {
        setLoading(true)

        var token = "khali";
        var body_data = { email, password };
        doConsole(" I request @ " + urls.API + "do_guest");
        doConsole(body_data);
        fetch(urls.API + 'do_guest', {
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
        <View style={{ flex: 1, }}>
            <StatusBar
                hidden={true}
            />
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => alertRef = ref} />
            </View>
            <LinearGradient
                // Background Linear Gradient
                colors={['#0D0D0D', '#17162B']}
                style={{ flex: 1 }}
            >
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
                    <Text style={{ fontFamily: 'PSBo', fontSize: 24, color: '#FFFFFF', marginTop: 130 }}>Sign In</Text>

                    <View style={[styles.textInputContainer]}>
                        <CAccountMail />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            autoCapitalize="none"
                            placeholder="Email"
                            value={email} // just a state variable
                            onChangeText={(v) => {
                                setEmail(v)
                            }}
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <CAccountPassword />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholder="Password"
                            value={password}
                            onChangeText={(v) => {
                                setPassword(v)
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {
                        alert("this will work on your server only")
                    }}>
                        <Text style={{ fontSize: 12, fontFamily: "PMe", color: '#A047C8', alignSelf: 'flex-end' }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            // props.navigation.navigate('OTP')
                            if (!loading) doSignup()
                        }}
                        style={{ borderWidth: 1, borderColor: '#FFFFFF', width: 314, height: 54, borderRadius: 9, marginTop: 40, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Sign In</Text>{loading && <ActivityIndicator color={"#fff"} size={"small"} />}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
                        navigation.navigate("CreateAccount")
                    }}>
                        <Text style={{ fontSize: 12, fontFamily: "PMe", color: '#A047C8', alignSelf: "center" }}>Create Account</Text>
                    </TouchableOpacity>


                </View>

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


export default SignIn
