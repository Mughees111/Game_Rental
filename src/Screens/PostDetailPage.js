
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground,SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { RattingStarIcon, HeartWhiteIcon, XBoxIcon, KMLocationIcon, PickupIcon, PDPChatIcon, DeliveryLargeIcon, ArrowBack } from '../Components/SvgIcons'


import { apiRequest } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";
import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import PrivacyPicker from '../Components/PrivacyPicker'



var dropDownAlertRef;
const PostDetailPage = (props) => {



    const item = props.route.params.params.post ? props.route.params.params.post : props.route.params.params ?? { item: {} }
    console.log(item)

    const { width, height } = Dimensions.get('window')
    const [user, setUser] = useState('')
    const [filterModal, setFilterModal] = useState(false)
    const [searchBarPosition, setSearchBarPosition] = useState()
    const [yOffset, setYOffset] = useState(height);
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState('')

    const [fav, setFav] = useState(item.favorite == "0" ? false : true)

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const condtitionData = [
        { photo: require("../assets/PDPimg2.png") },
        { photo: require("../assets/PDPimg3.png") },
        { photo: require("../assets/PDPimg2.png") }
    ]


    useFocusEffect(React.useCallback(() => {
        retrieveItem("login_data")
            .then((d) => {
                setUser(d)
            })
    }, []))

    function getDays() {
        var tor = [];
        for (let i = 1; i < 15; i++) tor.push({
            title: i
        });
        return tor;
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
                <View style={{ position: 'absolute', bottom: 0, height: "80%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
                {/* <ScrollView contentContainerStyle={{height:height}} ></ScrollView> */}
                <SafeAreaView style={{ width: "92%", alignSelf: 'center' }}>
                    <TouchableOpacity
                        style={{ marginTop: 5, padding: 10 }}
                        onPress={() => props.navigation.goBack()}
                    >
                        <ArrowBack />
                    </TouchableOpacity>
                    {/* <Header /> */}
                </SafeAreaView>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                    <View style={{ width: "80%", alignSelf: 'center' }}>
                        <ImageBackground
                            style={{ width: 332, height: 172, marginTop: 20, alignSelf: 'center' }}
                            imageStyle={{ borderRadius: 12 }}
                            source={{ uri: item.images ? item.images[0] : item.post?.images[0] }}
                        >
                            <Image
                                style={{ position: 'absolute', width: "100%", bottom: -1, borderRadius: 12, }}
                                source={require("../assets/Mask3.png")}
                            />
                            {item?.user?.name &&
                                <View style={{ position: 'absolute', right: 10, top: 10, alignItems: 'center' }}>

                                    <View style={{ flexDirection: 'row', }}>


                                        <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                            <RattingStarIcon />
                                            <RattingStarIcon />
                                            <RattingStarIcon />
                                            <RattingStarIcon />
                                        </View>

                                        <Image
                                            style={{ marginLeft: 5, width: 35, height: 35, borderRadius: 17.5, }}
                                            source={{ uri: item?.user?.profile_pic }}
                                        />

                                    </View>
                                    <Text style={{ fontFamily: 'LR', color: '#FFFFFF', fontSize: 11, marginTop: 5 }}>{item?.user?.name && item.user.name}</Text>

                                </View>
                            }
                            <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row', paddingLeft: 10, width: "100%", alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, fontFamily: 'PBo', color: '#FFFFFF' }}>{item.title}</Text>
                                {
                                    user?.token &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            const favObj = {
                                                token: user.token,
                                                post_id: item.id
                                            }
                                            setFav(!fav)
                                            apiRequest(favObj, 'favorite_post', false)
                                        }}
                                        style={{ position: 'absolute', right: 20 }}>
                                        <HeartWhiteIcon color={fav ? "red" : "white"} />
                                    </TouchableOpacity>

                                }

                            </View>

                        </ImageBackground>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={{ fontFamily: 'PBo', fontSize: 15, color: '#FFFFFF' }}>Condition</Text>
                            <Text style={{ fontFamily: 'PBo', fontSize: 15, color: '#FFFFFF', position: 'absolute', right: 0, }}>{item.condition ? item.condition : item.post.condition}/10</Text>
                        </View>

                        <FlatList

                            data={item.images}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 50 }}
                            style={{ marginLeft: -10, marginTop: 15, width: width }}
                            horizontal={true}
                            renderItem={({ item }) => (
                                <Image
                                    style={{ marginLeft: 10, width: 128, height: 85, borderRadius: 12 }}
                                    source={{ uri: item }}
                                />
                            )}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                            <View style={{ alignItems: 'center' }}>
                                <XBoxIcon />

                                <Text style={{ marginTop: 5, fontFamily: 'LR', fontSize: 12, color: '#FFFFFF', lineHeight: 15 }}>{item?.systems_title ? item.systems_title : item?.post?.systems_title}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <KMLocationIcon />
                                <Text style={{ marginTop: 5, fontFamily: 'LR', fontSize: 12, color: '#FFFFFF', lineHeight: 15 }}>{item?.away ? item.away : item?.post?.away}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                {item.is_pickup == 1 ? <PickupIcon /> : <DeliveryLargeIcon />}
                                <Text style={{ marginTop: 5, fontFamily: 'LR', fontSize: 12, color: '#FFFFFF', lineHeight: 15 }}>{item?.is_pickup ? item.is_pickup == 1 ? "Pickup" : "Delivery" : item?.post?.is_pickup == 1 ? "Pickup" : "Delivery"}</Text>
                            </View>
                        </View>
                        <View style={{ width: 250, height: 29, borderRadius: 28, backgroundColor: '#000000', marginTop: 10, justifyContent: 'center', left: -50 }}>
                            <Text style={{ fontFamily: 'PBo', fontSize: 15, color: '#A047C8', marginLeft: 30 }}>Game:
                                <Text style={{ fontSize: 15, color: '#FFFFFF', }}>     {item?.game_title ? item.game_title : item?.post?.game_title ? item.post.game_title : null}</Text>
                            </Text>
                        </View>
                        <View style={{ width: 250, height: 29, borderRadius: 28, backgroundColor: '#000000', marginTop: 10, justifyContent: 'center', left: -50 }}>
                            <Text style={{ fontFamily: 'PBo', fontSize: 15, color: '#A047C8', marginLeft: 30 }}>Category:
                                <Text style={{ fontSize: 15, color: '#FFFFFF', }}>  {item?.interest_title ? item.interest_title : item?.post?.interest_title ? item.post.interest_title : null}</Text>
                            </Text>
                        </View>
                        {item?.status_text &&
                            <View style={{ width: 250, height: 29, borderRadius: 28, backgroundColor: '#000000', marginTop: 10, justifyContent: 'center', left: -50 }}>
                                <Text style={{ fontFamily: 'PBo', fontSize: 15, color: '#A047C8', marginLeft: 30 }}>Status:
                                    <Text style={{ fontSize: 15, color: '#FFFFFF', }}>  {item.status_text}</Text>
                                </Text>
                            </View>
                        }



                        {/* <Text style={{ color: '#FFFFFF', marginTop: 5, fontFamily: 'LR' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</Text> */}
                        {item?.address_text &&
                            <View style={{ width: width, paddingVertical: 10, borderRadius: 28, backgroundColor: '#000000', marginTop: 10, justifyContent: 'center', left: -52 }}>
                                <Text style={{ fontFamily: 'PBo', fontSize: 15, color: '#A047C8', marginLeft: 30 }}>Address:
                                    <Text style={{ fontSize: 15, color: '#FFFFFF', }}>  {item?.address_text ? item.address_text : null}</Text>
                                </Text>
                            </View>
                            // <View>
                            //     <Text style={{ fontSize: 16, fontFamily: 'PRe', color: '#FFFFFF', marginTop: 10, marginLeft: "-8%" }}>Address</Text>
                            //     <Text style={{ fontSize: 16, fontFamily: 'PRe', color: '#FFFFFF', marginTop: 10, marginLeft: "-8%" }}>{item?.address_text ? item.address_text :"null"}</Text>
                            // </View>
                        }
                        {/* {item?.post?.address_text &&
                            <View>
                                <Text style={{ fontSize: 16, fontFamily: 'PRe', color: '#FFFFFF', marginTop: 10, marginLeft: "-8%" }}>Address</Text>
                                <Text style={{ fontSize: 16, fontFamily: 'PRe', color: '#FFFFFF', marginTop: 10, marginLeft: "-8%" }}>{item?.address_text ? item.address_text : item?.post?.address_text ? item.post.address_text : "null"}</Text>
                            </View>
                        } */}
                        {props.route.params.gameRenter &&
                            <View>
                                <Text style={{ fontSize: 16, fontFamily: 'PRe', color: '#FFFFFF', marginTop: 10, marginLeft: "-8%" }}>Rent Durtion</Text>
                                <View style={{ marginLeft: '-8%', height: 48, backgroundColor: '#000000', color: '#D5D5D5', borderRadius: 8, marginTop: 10, fontFamily: 'PLi', paddingRight: 5, justifyContent: 'center', }}>
                                    <PrivacyPicker
                                        selected={{ title: days.length ? days : 'Select' }}
                                        data={getDays()}
                                        onValueChange={(index, title) => {
                                            console.log(title.title)
                                            setDays(title.title)
                                        }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('ChatStackNavigator', {
                                                screen: 'ChatDetails',
                                                params: {
                                                    user_id: item.user.id,
                                                    convo_id: item.convo.convo_id,
                                                    name: item.user.name,
                                                    picUrl: item.user.profile_pic
                                                }

                                            })
                                            // console.log(item.user_id)
                                            // console.log(item)
                                        }}
                                        style={{ width: "20%", height: 53, borderRadius: 9, borderColor: '#FFFFFF', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <PDPChatIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "80%", height: 55, marginLeft: -10, backgroundColor: '#A047C8', borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            var x = dropDownAlertRef;
                                            if (days) {

                                                setLoading(true)
                                                const bookObj = {
                                                    token: user.token,
                                                    post_id: item.id,
                                                    days
                                                }
                                                apiRequest(bookObj, 'book_game', false)
                                                    .then(data => {
                                                        console.log(data)
                                                        if (data) {
                                                            setLoading(false)
                                                            if (data.action == 'success') {
                                                                x.alertWithType("success", "Success", "Requested");
                                                                setTimeout(() => {
                                                                    props.navigation.goBack();
                                                                }, 1000);
                                                            }
                                                            else {
                                                                x.alertWithType("error", "Error", data.error);
                                                            }
                                                        }
                                                        else {
                                                            x.alertWithType("error", "Error", "Internet Error");
                                                        }
                                                    })
                                            }
                                            else {
                                                x.alertWithType("error", "Error", "Please Select rent duration");
                                            }

                                        }}
                                    >
                                        <Text style={{ color: '#FFFFFF', fontFamily: 'PMe', fontSize: 18 }}>Book Game</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        }



                    </View>
                </ScrollView>
            </ImageBackground>


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

export default PostDetailPage

