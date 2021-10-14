import React, { useCallback, useState, useEffect } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon, ArrowBack, PlusIcon } from '../Components/SvgIcons'
import Modal from 'react-native-modal';
import Picker from '../Components/Picker';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';


import { apiRequest } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";
import { urls } from "./../utils/Api_urls";
import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";


var dropDownAlertRef;

const OrderHistory = (props) => {


    const [pending, setPending] = useState([]);
    const [rented, setRented] = useState([]);
    const [denied, setDenied] = useState([]);
    const [returned, setReturned] = useState([]);

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false);



    const keyExtractor = useCallback((item, index) => index.toString(), []);
    useFocusEffect(React.useCallback(() => {
        getData()
    }, []))




    function getData() {


        var x = dropDownAlertRef;
        setLoading(true)
        retrieveItem("login_data")
            .then((d) => {

                console.log(d)
                setUser(d)
                // console.log("token")
                // console.log(d.token)
                const dbData = {
                    token: d.token
                }
                apiRequest(dbData, 'get_my_bookings', false)
                    .then(data => {
                        // console.log(data)
                        if (data) {
                            if (data.action == 'success') {
                                // console.log(data)
                                setPending(data.pendings);
                                setRented(data.rented);
                                setDenied(data.denied);
                                setReturned(data.returned);
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





    const renderItems = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('BuyerStackNavigator', {
                        screen: 'PostDetails',
                        params: {
                            item,
                            mAR: false
                        }
                    })
                }}
                style={{ marginLeft: 15, width: 156, height: 183 }}>


                <ImageBackground
                    source={{ uri: item.post.images[0] }}
                    style={{ width: 156, height: 183, overflow: 'hidden' }}
                    imageStyle={{ borderRadius: 10 }}
                >

                    <Image
                        style={{ position: 'absolute', bottom: 0, overflow: 'hidden', width: 156, }}
                        source={require("../assets/Mask2.png")}
                    />

                    <View style={{ position: 'absolute', bottom: 25, alignSelf: 'center' }}>
                        <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 8, alignSelf: 'center' }}>{item.post.title}</Text>
                        <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 13 }}>{item.post.game_title}</Text>
                        {/* <Text>Asad Sultan</Text> */}

                    </View>
                </ImageBackground>
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: 87, height: 18, borderRadius: 6, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 8, color: "white" }}>{item.days} days Left</Text>
                </View>
            </TouchableOpacity>

        )
    })
    const renderRented = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('BuyerStackNavigator', {
                        screen: 'PostDetails',
                        params: {
                            item,
                            mAR: true
                        }
                    })
                }}
                style={{ marginLeft: 15, width: 156, height: 183 }}>


                <ImageBackground
                    source={{ uri: item.post.images[0] }}
                    style={{ width: 156, height: 183, overflow: 'hidden' }}
                    imageStyle={{ borderRadius: 10 }}
                >

                    <Image
                        style={{ position: 'absolute', bottom: 0, overflow: 'hidden', width: 156, }}
                        source={require("../assets/Mask2.png")}
                    />

                    <View style={{ position: 'absolute', bottom: 25, alignSelf: 'center' }}>
                        <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 8, alignSelf: 'center' }}>{item.post.title}</Text>
                        <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 13 }}>{item.post.game_title}</Text>
                        {/* <Text>Asad Sultan</Text> */}

                    </View>
                </ImageBackground>
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: 87, height: 18, borderRadius: 6, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 8, color: "white" }}>{item.days} days Left</Text>
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

                <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
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
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ width: 44.16, height: 43.37, borderRadius: 22 }}
                                source={{ uri: user?.profile_pic_url }}
                            />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>{user?.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                    <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>


                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View style={{ paddingLeft: 20 }}>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Sent Request ({pending.length})</Text>
                            {/* {pending.length ? <TouchableOpacity style={{ position: 'absolute', right: 20, }}>
                                <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
                            </TouchableOpacity> : null} */}
                        </View>
                        <FlatList
                            data={pending}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                            showsHorizontalScrollIndicator={false}

                        />




                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Out on rent ({rented.length})</Text>
                            {/* {rented.length ? <TouchableOpacity style={{ position: 'absolute', right: 20, }}>
                                <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
                            </TouchableOpacity>
                                : null} */}
                        </View>
                        <FlatList
                            data={rented}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderRented}
                            showsHorizontalScrollIndicator={false}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Denied Requests ({denied.length})</Text>
                            {/* {denied.length ? <TouchableOpacity style={{ position: 'absolute', right: 20, }}>
                                <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
                            </TouchableOpacity>
                                : null} */}
                        </View>
                        <FlatList
                            data={denied}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                            showsHorizontalScrollIndicator={false}

                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Returned Rentals ({returned.length})</Text>
                            {/* {returned.length ? <TouchableOpacity style={{ position: 'absolute', right: 20, }}>
                                <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
                            </TouchableOpacity>
                                : null} */}
                        </View>
                        <FlatList
                            data={returned}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                            showsHorizontalScrollIndicator={false}

                        />

                    </View>

                </ScrollView>



                {/* <View style={{ width: "85%", alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <TouchableOpacity
                            onPress={() => {
                                setSentRequest(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: !sentRequest ? '#FFFFFF' : '#888888' }}>Out on Rent ({rented.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSentRequest(true)
                            }}
                        >
                            <Text style={{ fontFamily: 'LBo', fontSize: 18, color: sentRequest ? '#FFFFFF' : '#888888', marginRight: 30 }}>Sent Requests ({pending.length})</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={!sentRequest ? rented : pending}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ paddingRight: 10, paddingBottom: 100 }}
                        style={{ marginLeft: -15, marginTop: 10 }}
                        renderItem={!sentRequest ? renderItems : renderSR}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginTop: 15 }}
                        numColumns={2}
                    />

                </View> */}


            </ImageBackground>
            {/* <TouchableOpacity style={{ position: 'absolute', bottom: 100, right: 10, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', width: 59, height: 59, borderRadius: 59 / 2, paddingBottom: 5 }}>
                <PlusIcon />
            </TouchableOpacity> */}
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

export default OrderHistory
