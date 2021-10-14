


import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    StatusBar,
    SafeAreaView,
    PixelRatio,
    Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Keyboard,
    ImageBackground,
    AsyncStorage,
    ActivityIndicator,
    Alert,
    Modal,
    Linking,
} from "react-native";
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Right,
    Button,
    Title,
} from "native-base";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window")
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { doConsole, retrieveItem, storeItem, validateEmail } from "./../utils/functions";
import { apiRequest, doPost, doPostDoc } from "./../utils/apiCalls";

import { AppColors } from '../Components/AppColors';

import DropdownAlert from "react-native-dropdownalert";
import { urls } from "./../utils/Api_urls";
// import { StoryContainer } from 'react-native-stories-view';
import { Entypo } from '@expo/vector-icons';

import { Bubble, Composer, GiftedChat, InputToolbar, Send, Time } from 'react-native-gifted-chat'
import { ArrowBack,ArrowRight  } from '../Components/SvgIcons';


let alertRef;
//ATUO
import Pusher from 'pusher-js/react-native';
Pusher.logToConsole = true;
var pusher = new Pusher('ffd599b02dc20be9885c', {
    cluster: 'ap2'
});
//ATUO

var textType = "image";
var mimeType = "image/png";
var extType = ".png";

const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}
const filters = [
    "Posts",
    "Media",
    "People"
]
const VendorChatDetails = (props) => {

    let carousell;
    console.log('params are')
    
    console.log(props.route.params)
    const { user_id, convo_id, picUrl, name, username } = props?.route?.params ?? { user_id: 0, convo_id: 0, picUrl: "" }
    const forceUpdate = useForceUpdate()

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const [moreAvailable, setMoreAvailable] = useState(0)
    const [page, setPage] = useState(0)
    const [canSend, setCanSend] = useState(true)


    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [state_convo_id, setConvoId] = useState(convo_id)
    let isFirstTime = true;
    //ATUO
    var channel = pusher.subscribe('chat-channel');
    //ATUO
    const navigation = useNavigation()
    const [search, setSearchText] = React.useState("")


    const [mainChats, setMainChats] = React.useState([])
    const [chats, setChats] = React.useState([])


    const [user, setUser] = React.useState({})

    useFocusEffect(React.useCallback(() => {

        retrieveItem("login_data_vendor").then((data) => {
            setUser(data)
        })


    }, []))
    useEffect(() => {
        if (user) {
            loadChat()

        }
    }, [user])

    //ATUO
    const setupPusher = () => {
        console.log("binding");
        if (!isFirstTime) return
        isFirstTime = false
        console.log("binding2");
        channel.bind('chat', function (data) {
            // alert(JSON.stringify(data));
            console.log("Pusher data")
            console.log(data?.to_alert + " with " + user?.id)
            if (data?.to_alert == user?.id) {
                var x = [data?.msg]
                setMessages(previousMessages => GiftedChat.append(previousMessages, x))
            }
        });
    }
    //ATUO
    const loadChat = async () => {

        var x = alertRef;
        const dbData = { token: user?.token ?? "", convo_id: state_convo_id, user_id };

        if (dbData?.token == "") return
        console.log(dbData)
        console.log("@get_msgs");
        // const { isError, data } = await doPost(dbData, "get_msgs");
        apiRequest(dbData, "get_msgs", true)
            .then(data => {
                console.log('data is')
                console.log(data)
                console.log('console 3')
                console.log(data);
                setLoading(false)

                if (data.action == "success") {

                    setMessages(data.msgs)
                    // setCanSend(data?.can_send == 1 ? 1 : 0)
                    setMoreAvailable(data.more_available)
                    //ATUO
                    setupPusher();
                    //ATUO
                    setTimeout(() => {
                        setLoading(false)
                    }, 500)

                }
                else {
                    setLoading(false)
                    console.log(data.error)
                    console.log("^^^^^^^^^");
                    x.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                console.log('console 4')
                Alert.alert('Internet Error')
            })
        //   console.log(isError);


    }



    const onSend = async (text) => {

        var x = alertRef;

        if (text.length < 1) {
            x.alertWithType("error", "Error", "Please type your message");

            return;
        }
        setLoading(true)
        const dbData = { token: user?.token ?? "", msg: text, convo_id: state_convo_id, user_id };
        console.log('db data')
        console.log(dbData)
        setSending(true);
        setLoading(false)
        const { isError, data } = await doPost(dbData, "send_msg",true);
        console.log(isError);
        console.log(data);
        setSending(false)
        if (isError) {
            x.alertWithType("error", "Error", "Internet");
        }
        else {
            if (data.action == "success") {

                var x = [data?.msg];
                setConvoId(data.convo_id)

                setMessages(previousMessages => GiftedChat.append(previousMessages, x))
                setTimeout(() => {
                    setSending(false)
                }, 500)
            }
            else {
                setSending(false)
                x.alertWithType("error", "Error", data.error);
            }
        }

    }


    return (
        <View
            style={{ flex: 1, backgroundColor: '#A047C8' }}>
            <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <ImageBackground
                source={require("../assets/HomeBGImage.png")}
                style={{ width: "100%", height: 100, }}
                imageStyle={{ resizeMode: 'stretch',height:220 }}
            >
                <View style={{ width: "80%", alignSelf: 'center' }}>
                    {/* Header */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
                        
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
                                source={{uri:picUrl}}
                            />
                            <View style={{ marginLeft: 5, marginTop: 4 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold', textTransform: 'capitalize' }}>{name}</Text>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                        <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                    </View> */}
                            </View>
                        </View>
                    </View>
                </View>


            </ImageBackground>


            <View style={{ flex: 1, position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43, paddingRight: 20, paddingTop: 30, paddingLeft: 20 }}></View>


            <View>
                {loading && <View style={{ marginVertical: 20, alignSelf: "center" }}><ActivityIndicator color={"white"} size={"large"} /></View>}
                {!loading && messages?.length == 0 && <View style={{ marginVertical: 20, alignSelf: "center" }}><Text style={{ textAlign: "center",color:'white',fontFamily:'PMe' }}>No messages yet</Text></View>}

            </View>



            <View style={{ flex: 1, marginBottom: 100, }}>

                <GiftedChat
                    messages={messages}
                    showUserAvatar={false}
                    renderAvatar={null}
                    renderTime={props => {
                        return (
                            <></>
                        );
                    }}
                    // renderInputToolbar={() => {
                    //     return <View style={{ backgroundColor: 'red', width: "100%" }}>

                    //     </View>



                    // }}
                    renderSend={(props) => {
                        return (
                            <Send
                                {...props}
                                containerStyle={{ width: 50.61, height: 50.61, borderRadius: 25.30, backgroundColor: '#A047C8', justifyContent: "center", alignItems: 'center', }}
                            >
                                {/* <View style={{width: 50.61, height: 50.61, borderRadius: 25.30, backgroundColor: '#A047C8', justifyContent: "center", alignItems: 'center', marginLeft: -10 }}
                                > */}
                                <ArrowRight />
                                {/* </View> */}
                            </Send>
                        )
                    }}

                    renderComposer={props => {
                        return (
                            <Composer
                                textInputStyle={{ height: 41.2, borderRadius: 5, marginLeft: 15, color: '#A047C8', fontSize: 13, paddingLeft: 10, fontFamily: 'PRe' }}
                                multiline={true}
                                {...props}
                                placeholder="Type message"
                                placeholderTextColor="#A047C8"
                            // style={{ }}
                            />


                        )
                    }}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}

                                textStyle={{
                                    right: {
                                        color: '#fff',
                                        fontFamily: 'PRe'
                                    },
                                    left: {
                                        color: '#A047C8',
                                        fontFamily: 'PRe'

                                    },
                                }}


                                wrapperStyle={{
                                    left: {

                                        // borderRadius: 0,
                                        // borderRadius: 18,
                                        // backgroundColor: "#A047C8",
                                        // paddingLeft: 20,
                                        // paddingRight: 20,
                                        // paddingTop: 5,
                                        // paddingBottom: 5

                                        marginBottom: 5,
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 8,
                                        borderTopStartRadius: 0,


                                    },
                                    right: {

                                        marginTop: 5,
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#A047C8',
                                        borderRadius: 8,
                                        borderTopEndRadius: 0,
                                    },
                                }}
                            />
                        );
                    }}
                    user={{
                        _id: user?.id,
                    }}
                    onSend={(msgss) => {
                        var msg = msgss[0].text;
                        onSend(msg)
                    }}
                    renderInputToolbar={(props) => {
                        // if (!canSend) {
                        // return (<View style={{ width: "90%", alignSelf: "center", alignItems: "center" }}>
                        //     <Text style={{ color: "red", textAlign: "center", fontSize: 11, fontStyle: "italic" }}>You cannot send message to this user, as you are not linked to this user yet</Text>
                        // </View>)
                        // } else {
                        return (
                            <InputToolbar
                                {...props}
                            />
                        );
                        // }
                    }}

                />
            </View>





        </View >
        // </Container>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.appColor, paddingVertical: 10
    },
    bookview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 56, backgroundColor: AppColors.appColor, paddingVertical: 6
    },
    loginview: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.white, paddingVertical: 10
    },
    signtext: {
        fontSize: 20, color: AppColors.white, fontFamily: 'SR', lineHeight: 24
    },
    logintext: {
        fontSize: 20, color: AppColors.appColor, fontFamily: 'SR', lineHeight: 24
    }
});


export default VendorChatDetails