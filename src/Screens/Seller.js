


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



var dropDownAlertRef;


const Seller = (props) => {


    const [loading, setLoading] = useState(false);

    const [deniedPost, setDeniedPost] = useState([]);
    const [pendingPosts, setPendingPosts] = useState([]);
    const [rentedPosts, setRentedPosts] = useState([]);
    const [returnedPosts, setReturnedPosts]  = useState([]);

    const navigation = useNavigation()

    function get_my_post() {
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
                                setRentedPosts(data.rented);
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



    useFocusEffect(React.useCallback(() => {
        get_my_post();
    }, []))



    const keyExtractor = useCallback((item, index) => index.toString(), []);



    const renderItems = useCallback(({ item, index }) => {
        console.log(item)
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('PostDetailsV', {
                        params:item,
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
                        params : item,
                        request :true
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

    // if (loading) {
    //     return (
    //         <View style={{ flex: 1, backgroundColor: '#A047C8' }}>
    //             <Loader />
    //         </View>
    //     )


    // }


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
                    <TouchableOpacity>
                        <Drawer />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF' }}>LOGO</Text>
                </View>

                <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>




                {/* <View style={{ width: "90%", marginTop: 30, alignSelf: 'center', borderRadius: 18, borderWidth: 1, borderColor: '#A047C8', height: 87, backgroundColor: '#000000', paddingHorizontal: 30, paddingTop: 15, marginTop: 50 }}>
                    <Text style={{ fontFamily: 'LR', fontSize: 12, color: '#FFFFFF', alignSelf: 'center' }}>You have Rented 12 Games this week & Earned</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', width: '85%', alignSelf: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text style={{ fontSize: 27, fontFamily: 'LR', color: '#FFFFFF' }}>$654</Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 116, height: 24, backgroundColor: '#A047C8', borderRadius: 5, }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'LR' }}>View Details</Text>
                        </TouchableOpacity>



                    </View>

                </View> */}




                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View style={{ paddingLeft: 20 ,marginTop:25}}>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Requests ({pendingPosts.length})</Text>
                            {pendingPosts.length ? <TouchableOpacity 
                                onPress={() => {
                                    props.navigation.navigate('ViewAllV', {
                                        data: pendingPosts,
                                        title: "Requests",
                                        request: true,
                                        nextScreen: 'PostDetailsV'
                                    })
                                }}
                                style={{ position: 'absolute', right: 20, }}>
                                <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
                            </TouchableOpacity> : null}
                        </View>
                        <FlatList
                            data={pendingPosts}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderPendings}
                            showsHorizontalScrollIndicator={false}

                        />




                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Out on Rental ({rentedPosts.length})</Text>
                            {rentedPosts.length ? <TouchableOpacity 
                                 onPress={() => {
                                    props.navigation.navigate('ViewAllV', {
                                        data: rentedPosts,
                                        title: "Given on Rent",
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
                            data={rentedPosts}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                            showsHorizontalScrollIndicator={false}

                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Dinied Rentals ({deniedPost.length})</Text>
                            {deniedPost.length ? <TouchableOpacity 
                                onPress={() => {
                                    props.navigation.navigate('ViewAllV', {
                                        data: deniedPost,
                                        title: "Dinied Posts",
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
                            renderItem={renderItems}
                            showsHorizontalScrollIndicator={false}

                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Returned Games({returnedPosts.length})</Text>
                            {returnedPosts.length ? <TouchableOpacity 
                                   onPress={() => {
                                    props.navigation.navigate('ViewAllV', {
                                        data: returnedPosts,
                                        title: "Returned Games",
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
                            data={returnedPosts}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                            showsHorizontalScrollIndicator={false}

                        />

                    </View>

                </ScrollView>


            </ImageBackground>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("NewPost")
                }}
                style={{ position: 'absolute', bottom: 100, right: 10, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', width: 59, height: 59, borderRadius: 59 / 2, paddingBottom: 5 }}>
                <PlusIcon />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: "100%",
        height: 44,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 10,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 8,
        alignItems: 'center',

    },
    inActiveFilterIcon: {
        position: 'absolute',
        right: 0,
        paddingRight: 10,
        height: "100%",
        justifyContent: 'center'
    },
    activeFilterIcon: {
        position: 'absolute',
        right: 0,
        height: 35,
        width: 35,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35 / 2
    },
    filterItems: {
        width: 105,
        height: 30,
        backgroundColor: '#340057',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 13
    },
    filterItemsLabel: {
        fontFamily: 'LR',
        fontSize: 12,
        color: '#FFFFFF',
        lineHeight: 15,
    },
    rangeTextInput: {
        width: 138,
        height: 35,
        backgroundColor: '#000000',
        borderRadius: 8,
        color: "#FFFFFF",
        fontFamily: 'LR',
        paddingLeft: 20
    }
})

export default Seller

