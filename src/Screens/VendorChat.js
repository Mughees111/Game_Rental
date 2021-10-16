import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState, useEffect } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, Alert } from 'react-native'
import Header from '../Components/Header'
import { RattingStarIcon, HeartWhiteIcon, XBoxIcon, KMLocationIcon, PickupIcon, PDPChatIcon, SearchIcon, DrawerIcon, ChatLargeIcon } from '../Components/SvgIcons'
import { Drawer } from './Drawer'


import { doConsole, retrieveItem, storeItem, validateEmail } from "./../utils/functions";
import { apiRequest, doPost, doPostDoc } from "./../utils/apiCalls";
import DropdownAlert from "react-native-dropdownalert";
import Loader from '../utils/Loader';


var dropDownAlertRef;

const VendorChat = (props) => {

    const [chatBg, setChatBg] = useState(false)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState()
    const [chatsData, setChatData] = useState([]);


    useEffect(() => {

        retrieveItem("login_data_vendor").then((data) => {
            setUser(data)

            const reqObj = {
                token: data.token
            }
            console.log(reqObj)
            setLoading(true)
            apiRequest(reqObj, "get_chats", true)
                .then(data => {
                    console.log('data is')
                    console.log(data)
                    setLoading(false)
                    if (data.action == 'success') {
                        setChatData(data.chats)
                    }
                    else {
                        Alert.alert(data.error)
                    }
                })
                .catch(err => {
                    console.log(err)
                    Alert.alert('Internet Error')
                })
        })


    }, [])


    const keyExtractor = useCallback((item, index) => index.toString(), []);



    const renderChats = useCallback(({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    // item.selected = true
                    // setChatBg(!chatBg)
                    console.log(item)
                    props.navigation.navigate('VendorChatDetails', {
                        user_id: item.user.id,
                        convo_id: item.id,
                        name: item.user.name,
                        picUrl: item.user.profile_pic
                    })
                }}
                style={{ flexDirection: 'row', width: "100%", height: 58.67, marginTop: 20 }}>
                <View style={[!item.selected ? styles.chatSelected : styles.chatUnselected]}>
                    <Text style={{ marginLeft: 40, fontFamily: 'PRe', fontSize: 18, color: '#FFFFFF' }}>{item.user.name}</Text>
                    <Text style={{ marginLeft: 40, fontFamily: 'PRe', fontSize: 8, color: '#FFFFFF' }}>{item.last_msg.ago}</Text>
                </View>
                <Image
                    style={{ position: 'absolute', left: 0, width: 58, height: 59, borderRadius: 39.5 }}
                    source={{ uri: item.image }}
                />
            </TouchableOpacity>)
    }, [chatBg])



    return (



        <View style={{ flex: 1, backgroundColor: '#A047C8' }}>
            <View>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}
            <ImageBackground
                source={require("../assets/HomeBGImage.png")}
                style={{ width: "100%", height: 265, flex: 1 }}
            >
                <View style={{ width: "80%", alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
                        <StatusBar
                            hidden={true}
                        />
                        <Drawer />
                        <View style={{ flexDirection: 'row' }}>
                            <ChatLargeIcon />
                            <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF', marginTop: -5, marginLeft: 5 }}>Chats</Text>
                        </View>
                    </View>
                </View>

                <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}>
                    <View style={{ width: "90%", alignSelf: 'center', marginTop: 15 }}>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: 145, height: 35, backgroundColor: '#000000', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LR', fontSize: 16, color: '#FFFFFF' }}>Buyer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 145, height: 35, backgroundColor: '#A047C8', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LR', fontSize: 16, color: '#FFFFFF' }}>Seller</Text>
                        </TouchableOpacity>
                    </View> */}
                        {/* <TouchableOpacity style={{ width: "100%", height: 45, backgroundColor: '#000000', borderRadius: 8, marginTop: 20, flexDirection: 'row', paddingLeft: 14, alignItems: 'center' }}>
                        <SearchIcon />
                        <TextInput placeholder="Spider Man 3" placeholderTextColor="#FFFFFF" style={{ width: "100%", marginLeft: 20, fontFamily: 'LR', color: '#FFFFFF', fontSize: 14 }} />
                    </TouchableOpacity> */}
                        {
                            !loading && !chatsData.length ?
                                <Text style={{ fontFamily: 'LBo', fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 20 }}>You have no chats</Text>
                                : null
                        }
                        <FlatList
                            data={chatsData}
                            contentContainerStyle={{ paddingBottom: 200 }}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderChats}
                        />

                    </View>
                </View>
            </ImageBackground>
        </View >

    )
}
const styles = StyleSheet.create({
    chatSelected: {
        width: '90%',
        marginLeft: 30,
        justifyContent: 'center',
        height: "100%",
        borderRadius: 9,
        backgroundColor: '#000000'
    },
    chatUnselected: {
        width: '90%',
        marginLeft: 30,
        justifyContent: 'center',
        height: "100%",
        borderRadius: 9,
        backgroundColor: '#A047C8'
    }
})
export default VendorChat





