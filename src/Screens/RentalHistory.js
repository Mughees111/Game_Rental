import React, { useCallback, useState, useEffect } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView, Alert } from 'react-native'
import Header from '../Components/Header'
import { ArrowBack, PlusIcon } from '../Components/SvgIcons'
import { StatusBar } from 'expo-status-bar';
import { Drawer } from './Drawer';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { apiRequest } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";
import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import Seller from './Seller';



var dropDownAlertRef;

const RentalHistory = (props) => {


    const [loading, setLoading] = useState(false);

    const [livePost, setLivePost] = useState([]);
    const [approvalPosts, setApprovalPosts] = useState([]);
    const [rentedPosts, setRentedPosts] = useState([]);
    const [userData, setUserData] = useState()

    const [deniedPost, setDeniedPost] = useState([]);
    const [pendingPosts, setPendingPosts] = useState([]);
    const [rentedPosts1, setRentedPosts1] = useState([]);
    const [returnedPosts, setReturnedPosts] = useState([]);

    function get_my_post() {
        var x = dropDownAlertRef;
        setLoading(true)
        retrieveItem("login_data_vendor")
            .then((d) => {
                setUserData(d)
                const dbData = { token: d.token }
                apiRequest(dbData, 'get_my_posts', true)
                    .then(data => {
                        if (data) {
                            if (data.action == 'success') {
                                console.log(data)
                                setLivePost(data.live_posts);
                                setApprovalPosts(data.pending_posts);
                                setRentedPosts(data.rented_posts);
                                setLoading(false)
                            }
                            else {
                                x.alertWithType("error", "Error", "Internet Error");
                                setLoading(false)
                            }
                        }
                        else {
                            x.alertWithType("error", "Error", "Internet Error");
                            setLoading(false)
                        }

                    })
            })
    }

    function get_my_requests() {
        var x = dropDownAlertRef;
        setLoading(true)
        retrieveItem("login_data_vendor")
            .then((d) => {
                const dbData = { token: d.token }
                apiRequest(dbData, 'get_my_requests', true)
                    .then(data => {
                        if (data) {
                            if (data.action == 'success') {
                                console.log(data)
                                // setLivePost(data.live_posts);
                                setPendingPosts(data.pendings);
                                setRentedPosts1(data.rented);
                                setDeniedPost(data.denied)
                                setReturnedPosts(data.returned)
                                setLoading(false)
                            }
                            else {
                                x.alertWithType("error", "Error", "Internet Error");
                                setLoading(false)
                            }
                        }
                        else {
                            x.alertWithType("error", "Error", "Internet Error");
                            setLoading(false)
                        }

                    })
            })
    }




    useEffect(() => {
        get_my_post();
        get_my_requests()
    }, [])


    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const renderItems1 = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('PostDetailsV', {
                        params: item,
                        chat : true
                        // request :true
                    })
                }}
                style={{ marginLeft: 15, width: 128, height: 166, }}>


                <ImageBackground
                    source={{ uri: item.post.images[0] }}
                    imageStyle={{ borderRadius: 15, }}
                    resizeMode="stretch"
                    style={{ width: 128, height: 161, overflow: 'hidden' }}
                >

                    <Image
                        style={{ position: 'absolute', bottom: 0, overflow: 'hidden' }}
                        source={require("../assets/Mask1.png")}
                    />



                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                        <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 8, alignSelf: 'center' }}>{item.post.title}</Text>
                        <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 13 }}>{item.post.game_title}</Text>
                        {/* <Text>Asad Sultan</Text> */}

                    </View>
                </ImageBackground>
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: 87, height: 18, borderRadius: 6, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 8, color: "white" }}>
                        {/* 4 Days Left */}
                        {item.post.away}</Text>
                </View>
            </TouchableOpacity>

        )
    })
    const renderDenied = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('PostDetailsV', {
                        params: item,
                        // request :true
                    })
                }}
                style={{ marginLeft: 15, width: 128, height: 166, }}>


                <ImageBackground
                    source={{ uri: item.post.images[0] }}
                    imageStyle={{ borderRadius: 15, }}
                    resizeMode="stretch"
                    style={{ width: 128, height: 161, overflow: 'hidden' }}
                >

                    <Image
                        style={{ position: 'absolute', bottom: 0, overflow: 'hidden' }}
                        source={require("../assets/Mask1.png")}
                    />



                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                        <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 8, alignSelf: 'center' }}>{item.post.title}</Text>
                        <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 13 }}>{item.post.game_title}</Text>
                        {/* <Text>Asad Sultan</Text> */}

                    </View>
                </ImageBackground>
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: 87, height: 18, borderRadius: 6, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 8, color: "white" }}>
                        {/* 4 Days Left */}
                        {item.post.away}</Text>
                </View>
            </TouchableOpacity>

        )
    })


    const renderPendings = useCallback(({ item, index }) => {
        console.log(item)
        return (
            <TouchableOpacity
                onPress={() => {
                    // props.navigation.navigate('Chat12')
                    // props.navigation.navigate('PostDetailPage', {
                    //     params: item,
                    //     vendor: true
                    // })
                    props.navigation.navigate('PostDetailsV', {
                        params: item,
                        request: true
                    })
                }}
                style={{ marginLeft: 15, width: 128, height: 166 }}>


                <ImageBackground
                    source={{ uri: item.post.images[0] }}
                    imageStyle={{ borderRadius: 15 }}
                    style={{ width: 128, height: 161, overflow: 'hidden' }}
                >

                    <Image
                        style={{ position: 'absolute', bottom: 0, overflow: 'hidden' }}
                        source={require("../assets/Mask1.png")}
                    />



                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                        <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 8, alignSelf: 'center' }}>{item.post.title}</Text>
                        <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 13 }}>{item.post.game_title}</Text>
                        {/* <Text>Asad Sultan</Text> */}

                    </View>
                </ImageBackground>
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: 87, height: 18, borderRadius: 6, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 8, color: "white" }}>
                        {/* 4 Days Left */}
                        {item.post.away}</Text>
                </View>
            </TouchableOpacity>

        )
    })


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

                <View style={{ paddingHorizontal: "5%", flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 30 : 25, }}>
                    <StatusBar
                        hidden={true}
                    />
                    <TouchableOpacity
                        style={{ padding: 5 }}
                        onPress={() => props.navigation.goBack()}
                    >
                        <ArrowBack />
                    </TouchableOpacity>
                    {/* <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF' }} </Text> */}
                </View>

                <View style={{ paddingHorizontal: 20, position: 'absolute', bottom: 0, height: "92%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Returned Rentals({returnedPosts.length})</Text>
                        {returnedPosts.length ? <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('ViewAllV', {
                                    data: returnedPosts,
                                    title: "Returned Rentals",
                                    request: false,
                                    nextScreen: 'PostDetailsV',
                                    chat : true
                                })
                            }}
                            style={{ position: 'absolute', right: 20, }}>
                            <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
                        </TouchableOpacity>
                            : null}
                    </View>
                    <FlatList
                        data={returnedPosts}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ paddingRight: 10 }}
                        style={{ marginTop: 10, marginLeft: -15, }}
                        horizontal={true}
                        renderItem={renderItems1}
                        showsHorizontalScrollIndicator={false}

                    />


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Denied Rentals ({deniedPost.length})</Text>
                        {deniedPost.length ? <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('ViewAllV', {
                                    data: deniedPost,
                                    title: "Denied Posts",
                                    request: false,
                                    nextScreen: 'PostDetailsV'
                                })
                            }}
                            style={{ position: 'absolute', right: 20, }}>
                            <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
                        </TouchableOpacity>
                            : null}
                    </View>
                    <FlatList
                        data={deniedPost}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ paddingRight: 10 }}
                        style={{ marginTop: 10, marginLeft: -15 }}
                        horizontal={true}
                        renderItem={renderDenied}
                        showsHorizontalScrollIndicator={false}

                    />
                </View>


            </ImageBackground>

        </View>

    )
}


const styles = StyleSheet.create({
    col1: {
        borderRightWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        width: "30%"
    },
    col2: {
        borderRightWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        width: "25%"
    },
    tableText: {
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'PBo',
        fontSize: 15
    }
})
export default RentalHistory
