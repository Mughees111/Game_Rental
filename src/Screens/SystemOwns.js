import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


import { doConsole, retrieveItem, storeItem, validateEmail } from "./../utils/functions";
import { urls } from "./../utils/Api_urls";
import { changeLoggedIn, changeLoggedInVendor } from "../../Common";


import DropdownAlert from "react-native-dropdownalert";

import { useFocusEffect, useNavigation } from '@react-navigation/native';
var alertRef;


import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

const SystemOwns = (props) => {


    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [interests, setInterests] = useState([])
    const [address, setAddress] = useState("")
    const [langtext, setLangtext] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [notif_token, setNotif_token] = useState('')

    const [user, setUser] = React.useState({})
    useFocusEffect(React.useCallback(() => {
        retrieveItem("login_data").then((data) => {
            setUser(data)
        })
    }, []))

    useEffect(() => {
        if (user && user?.token) {
            getData()
            askNotificationPermission()
        }
    }, [user])



    const getData = () => {
        setLoading(true)

        var body_data = {
            token: user?.token
        };
        doConsole(" I request @ " + urls.API + "get_systems");
        doConsole(body_data);
        fetch(urls.API + 'get_systems', {
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
                    setInterestsArray(responseJson.list)
                    setLoading(false)
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

    const doSignup = () => {
        if (state < 1) {
            changeLoggedIn.changeNow(1)
            return
        }
        // else if (state < 3) {
        //     alertRef.alertWithType("error", "Error", "Please select at least 3 interests");
        //     return;
        // }


        goSignup()
    }


    const goSignup = () => {
        setLoading(true)

        var list = []
        for (var i = 0; i <= interestsArray.length - 1; i++) {
            if (interestsArray[i].selected) {
                list.push(interestsArray[i]?.id)
            }
        }



        var body_data = { token: user?.token, list };
        doConsole(" I request @ " + urls.API + "update_systems");
        doConsole(body_data);
        fetch(urls.API + 'update_systems', {
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



    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const [state, setState] = useState(0)
    const renderInterests = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (state < 30) {
                        item.selected = !item.selected
                        setState(state + 1)
                    }
                    else {
                        if (item.selected == true) {
                            item.selected = false
                            setState(state - 1)
                        }
                    }
                }}
                style={[item.selected ? styles.selectedInterestContainer : styles.unSelectedInterestContainer]}>
                <Text style={item.selected ? styles.selectedInterestText : styles.unSelectedInterestText}>{item.title}</Text>
            </TouchableOpacity>
        )
    }, [state])


    const [interestsArray, setInterestsArray] = useState(
        [
            // { name: "Fighting Game", selected: false },
            // { name: "Arcade Games", selected: false },
            // { name: "Fighting Game", selected: false },
            // { name: "Arcade Games", selected: false },
            // { name: "Fighting Game", selected: false },
            // { name: "Arcade Games", selected: false },
            // { name: "Fighting Game", selected: false },
            // { name: "Arcade Games", selected: false },
            // { name: "Fighting Game", selected: false },
            // { name: "Arcade Games", selected: false },
            // { name: "Fighting Game", selected: false },
            // { name: "Arcade Games", selected: false },
            // { name: "Fighting Game", selected: false },
            // { name: "Arcade Games", selected: false },
        ]
    )



    const askNotificationPermission = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;


        if (finalStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus == 'granted') {
            try {
                let token = await Notifications.getExpoPushTokenAsync();
                setNotif_token(token.data)
                store_location_on_server(token.data)
            } catch (error) {
                alert(error);
            }
        }
    }


    const store_location_on_server = async (localToken) => {
        const dbData = { token: user?.token ?? "", notif_key: localToken };
        console.log(dbData);
        console.log("push token")
        fetch(urls.API + 'do_store_notifiation_key', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbData),
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

                <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF', marginTop: Platform.OS == 'ios' ? 30 : 27, alignSelf: 'flex-end', width: "30%", }}>LOGO</Text>
                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <View style={{ width: 223 - 53, height: 39, borderWidth: 1, borderLeftWidth: 0, marginLeft: -5, borderColor: '#FFFFFF', borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'PMe', color: '#FFFFFF' }}>Systems</Text>
                    </View>
                    {/* <Text style={{ color: '#818181', alignSelf: 'flex-end', marginLeft: 10, fontFamily: 'PLi', fontSize: 14 }}>Select at least 3</Text> */}
                </View>
                <FlatList
                    data={interestsArray}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ marginTop: 10, }}
                    columnWrapperStyle={{ justifyContent: 'space-between', width: "85%", alignSelf: 'center' }}
                    numColumns={2}
                    renderItem={renderInterests}
                />

                <TouchableOpacity
                    onPress={() => {
                        // props.navigation.navigate('TitleYouOwn')
                        if (!loading) doSignup()
                    }}
                    style={{ position: 'absolute', bottom: 20, width: 314, height: 54, backgroundColor: '#A047C8', borderRadius: 9, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: '#FFFFFF', fontFamily: 'PMe', fontSize: 18 }}>Next</Text>{loading && <ActivityIndicator color={"#fff"} size={"small"} />}
                </TouchableOpacity>


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
    },
    unSelectedInterestContainer: {
        width: 160,
        height: 37,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 9
    },
    unSelectedInterestText: {
        fontSize: 14,
        fontFamily: 'PLi',
        lineHeight: 21,
        color: '#FFFFFF'
    },
    selectedInterestText: {
        fontSize: 14,
        fontFamily: 'PBo',
        lineHeight: 21,
        color: '#A047C8'
    },
    selectedInterestContainer: {
        width: 160,
        height: 37,
        borderWidth: 2,
        borderColor: '#A047C8',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 9
    },
})


export default SystemOwns
