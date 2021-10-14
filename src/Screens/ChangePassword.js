import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon, ArrowBack, PlusIcon, CAccountPerson, CalenderIcon, CAccountPhone, CAccountPassword, CAccountMail, TCTick } from '../Components/SvgIcons'
import Modal from 'react-native-modal';
import Picker from '../Components/Picker';
import { StatusBar } from 'expo-status-bar';

import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import { apiRequest } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";






var dropDownAlertRef;


const ChangePassword = (props) => {



    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [cupassword, setCupassword] = useState('')
    const [cPassword, setCpassword] = useState('')
    const [password, setPassword] = useState('')


    
    function changePass() {
        var x = dropDownAlertRef;
        setLoading(true)

        var vendor = props.route.params.Vendor
        retrieveItem(vendor?"login_data_vendor":"login_data")
            .then((d) => {
                const dbData = {
                    token: d.token,
                    cupassword: cupassword,
                    password: password
                }
                console.log(dbData)
                apiRequest(dbData, 'update_password',vendor?true:false)
                    .then(data => {
                        if (data) {
                            setLoading(false)
                            if (data.action == 'success') {
                                x.alertWithType("success", "Success", "Password changed successfully");
                                setTimeout(() => {
                                    props.navigation.goBack();
                                }, 1000);
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




    function validate() {
        var x = dropDownAlertRef
        if (!cupassword) {
            x.alertWithType("error", "Error", "Please Enter previous password");
            return
        }
        if (password.length<5) {
            x.alertWithType("error", "Error", "Password must contain 5 words");
            return
        }
        if (!cPassword) {
            x.alertWithType("error", "Error", "Please Enter confirm password");
            return
        }
        if (password!=cPassword) {
            x.alertWithType("error", "Error", "password not match");
            return
        }

        setLoading(true)
        changePass()
        
    }

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
                <View style={{ width: "80%", alignSelf: 'center' }}>
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
                        <View style={{ flexDirection: 'row' }}>
                            {/* <Image
                                style={{ width: 44.16, height: 43.37, borderRadius: 22 }}
                                source={require("../assets/ChatsProfile.png")}
                            />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>Joe Adam</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                    <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                </View>
                            </View> */}
                        </View>
                    </View>
                    {/* TextInput */}





                    <Text style={[styles.text, { marginTop: 50 }]}>Change Password</Text>
                    <View style={styles.textInputContainer}>
                        <CAccountPassword />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            secureTextEntry={true}
                            onChangeText={setCupassword}
                            placeholder="Enter Previous Password"
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <CAccountPassword />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            placeholder="Enter New Password"
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <CAccountPassword />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            secureTextEntry={true}
                            onChangeText={setCpassword}
                            placeholder="Re - Enter New Password"
                        />
                    </View>




                    <TouchableOpacity
                        onPress={() => {
                            validate();
                        }}
                        style={{ width: 314, height: 54, borderRadius: 9, marginTop: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A047C8' }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Save Changes</Text>
                    </TouchableOpacity>
                </View>



            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF', fontFamily: 'PMe', fontSize: 18, marginTop: 30, marginLeft: 20
    },
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
        marginLeft: 20,
        marginTop: 2,
        alignItems: 'center'
    }
})

export default ChangePassword
