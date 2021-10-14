import React, { useEffect, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView, Platform } from 'react-native'
import Header from '../Components/Header'
import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon, ArrowBack, PlusIcon, CAccountPerson, CalenderIcon, CAccountPhone, CAccountPassword, CAccountMail, TCTick } from '../Components/SvgIcons'
import Picker from '../Components/Picker';
import { StatusBar } from 'expo-status-bar';

import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import { apiRequest } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";



import Modal from "react-native-modal"
import { DatePicker } from '../Components/DatePicker.';


const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return React.useCallback(() => updateState({}), []);
}


var dropDownAlertRef;
const ProfileDetailsV = (props) => {


    const forceUpdate = useForceUpdate()


    const [dob, setDob] = useState('Date of birth')
    const [userName, setUserName] = useState('')
    const [phn, setPhone] = useState('');

    const [user, setUser] = useState();
    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false)



    function updateProfile() {
        var x = dropDownAlertRef;
        setLoading(true)
        retrieveItem("login_data_vendor")
            .then((d) => {
                const dbData = {
                    token: d.token,
                    name: userName,
                    phone: phn,
                    dob: dob,
                }
                console.log(dbData)
                apiRequest(dbData, 'update_account', true)
                    .then(data => {
                        if (data) {
                            console.log(data)
                            setLoading(false)
                            if (data.action == 'success') {
                                storeItem("login_data", data.data)
                                x.alertWithType("success", "Success", "Account Updated");
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

        if (!user.dob && user.name == userName && user.phone == phn) {
            x.alertWithType("error", "Error", "No Changes occured");
            return
        }
        if (userName.length < 3) {
            x.alertWithType("error", "Error", "Please enter a valid username");
            return
        }
        if (phn.length < 11) {
            x.alertWithType("error", "Error", "Phone number must contain 11 digits");
            return
        }
        if (!dob) {
            x.alertWithType("error", "Error", "Please enter a Date of Birth");
            return
        }
        setLoading(true)
        updateProfile()

    }



    useEffect(() => {

        retrieveItem("login_data_vendor")
            .then((d) => {
                console.log(d)
                setUser(d)
                if (d.dob) {
                    setDob(d.dob);
                }

                setUserName(d.name)
                setPhone(d.phone)
                forceUpdate();
            })
    }, [])


    if (!user) {
        return null
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
                            <Image
                                style={{ width: 44.16, height: 43.37, borderRadius: 22 }}
                                source={{ uri: user?.profile_pic_url }}
                            />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>{userName && userName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                    <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* TextInput */}
                    <Text style={[styles.text, { marginTop: 50 }]}>Profile Details</Text>
                    <View style={styles.textInputContainer}>
                        <CAccountPerson />
                        <View style={{ width: "100%", marginLeft: 10 }}>
                            <Text style={{ color: '#BFBFBF', position: 'absolute', top: Platform.OS == 'android' ? 8 : 10, fontSize: 10, fontFamily: 'PRe' }}>Name</Text>
                            <TextInput
                                style={[styles.textInput, { marginTop: 10, marginLeft: 0, color: '#A047C8', fontFamily: 'PRe', fontSize: 13 }]}
                                placeholderTextColor="#A047C8"
                                placeholder={user.name}
                                onChangeText={setUser}
                            />
                        </View>
                    </View>

                    {/* <View style={[styles.textInputContainer]}>
                        <CAccountMail />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            placeholder={user.email}
                        />
                    </View> */}

                    <View style={styles.textInputContainer}>
                        <CAccountPhone />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            placeholder={user.phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    {/* <View style={styles.textInputContainer}>
                        <CAccountPassword />
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            secureTextEntry={true}
                            placeholder="********"
                        />
                    </View> */}

                    <TouchableOpacity
                        onPress={() => {
                            setShow(!show);
                        }}

                        style={styles.textInputContainer}>
                        <CalenderIcon />

                        <Text style={{ color: '#BFBFBF', fontFamily: 'PRe', fontSize: 12, marginLeft: 10 }}>{dob ? dob : user?.dob}</Text>

                    </TouchableOpacity>








                    <TouchableOpacity
                        onPress={() => validate()}
                        style={{ width: 314, height: 54, borderRadius: 9, marginTop: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A047C8' }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Save Changes</Text>
                    </TouchableOpacity>

                    {
                        show && Platform.OS == 'android' &&

                        <DatePicker
                            // style={{}}
                            onValueChange={(i) => {
                                setDob(i.toString())
                                Platform.OS == "android" && setShow(false)

                            }}
                        />
                    }
                    {
                        Platform.OS == 'ios' &&

                        <Modal
                            isVisible={show}
                            onBackdropPress={() => { setShow(false) }}
                        >
                            <View>
                                <View style={{ backgroundColor: 'white', borderRadius: 12, height: 250 }}>

                                    <DatePicker
                                        // style={{}}
                                        onValueChange={(i) => {
                                            setDob(i.toString())
                                            Platform.OS == "android" && setShow(false)

                                        }}
                                    />

                                </View>

                                <TouchableOpacity
                                    onPress={() => setShow(false)}
                                    style={{ width: 314, height: 54, borderRadius: 9, marginTop: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#A047C8' }}>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Done</Text>
                                </TouchableOpacity>


                            </View>
                        </Modal>
                    }
                </View>

            </ImageBackground >

        </View >
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

export default ProfileDetailsV
