import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { ArrowBack, PlusIcon } from '../Components/SvgIcons'
import Modal from 'react-native-modal';
import Picker from '../Components/Picker';
import { StatusBar } from 'expo-status-bar';
import { apiRequest } from '../utils/apiCalls';



import { doConsole, retrieveItem, storeItem } from "../utils/functions";
import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import { useFocusEffect } from '@react-navigation/native';



var dropDownAlertRef;

const PostDetails = (props) => {

    const item = props.route.params.item;
    console.log(props.route.params.item)

    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState()


    useFocusEffect(React.useCallback(() => {
        retrieveItem("login_data")
            .then((d) => {
                setUser(d)
            })
    }, []))


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
                            {/* <Image
                                style={{ width: 44.16, height: 43.37, borderRadius: 22 }}
                                // source={{uri:item.post.images[0]}}
                                source={require("../assets/ChatsProfile.png")}
                            /> */}
                            <View style={{ marginLeft: 5 }}>
                                {/* <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>Joe Adam</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                    <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                </View> */}
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF' }}>Out on Rent</Text>

                    <Text style={[styles.headingText, { marginTop: 30 }]}>Order ID</Text>
                    <Text style={styles.text}>53545</Text>

                    <Text style={[styles.headingText, { marginTop: 30 }]}>Seller Name</Text>
                    <Text style={styles.text}>{item.seller.name}</Text>

                    <Text style={[styles.headingText, { marginTop: 30 }]}>Rental Length</Text>
                    <Text style={styles.text}>{item.days} days</Text>

                    <Text style={[styles.headingText, { marginTop: 30 }]}>Zip Code</Text>
                    <Text style={styles.text}>445345</Text>

                    {/* <Text style={[styles.headingText, { marginTop: 30 }]}>Sellers Address</Text>
                    <Text style={styles.text}>Street 43, House 443, Basic Colony Florida</Text> */}

                    <Text style={[styles.headingText, { marginTop: 30 }]}>Buyers Photo</Text>
                    <Image
                        style={{ width: 70, height: 70, borderRadius: 35, marginTop: 10 }}
                        source={{ uri: item.seller.profile_pic_url }}
                    // source={require("../assets/ChatsProfile.png")}
                    />
                    {
                        props.route.params.mAR ?

                            <TouchableOpacity
                                onPress={() => {
                                    setLoading(true)
                                    var x = dropDownAlertRef;
                                    const mARObj = {
                                        token: user.token,
                                        booking_id: item.id
                                    }
                                    apiRequest(mARObj, "mark_as_returned", false)
                                        .then(data => {
                                            if (data) {
                                                setLoading(false)
                                                console.log(data)
                                                if (data.action == "success") {
                                                    x.alertWithType("success", "Success", "Marked as Return");
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
                                                setLoading(false)
                                            }
                                        })
                                }}

                                style={{ width: "100%", height: 54, backgroundColor: '#A047C8', borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <Text style={{ fontFamily: 'PMe', color: '#FFFFFF', fontSize: 18 }}>Mark As Returned</Text>
                            </TouchableOpacity>
                            : null}

                    <View style={{ position: 'absolute', right: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('Chat12')
                            }}
                            style={{ marginLeft: 15, width: 166, height: 209 }}>


                            <ImageBackground
                                source={{ uri: item.post.images[0] }}
                                style={{ width: 166, height: 209, overflow: 'hidden', }}
                                imageStyle={{ borderRadius: 15 }}
                            >

                                <Image
                                    style={{ position: 'absolute', bottom: 0, overflow: 'hidden' }}
                                    source={require("../assets/Mask4.png")}
                                />
                                <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 10, alignSelf: 'center' }}>{item.post.title}</Text>
                                    <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 16, marginTop: 5 }}>{item.post.game_title}</Text>
                                    <Text>Asad Sultan</Text>

                                </View>
                            </ImageBackground>
                            <View style={{ position: 'absolute', bottom: -10, alignSelf: 'center', width: 113, height: 23, borderRadius: 5, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'LBo', fontSize: 9, color: "white" }}>{item.post.away}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 14,
        color: "#A047C8",
        fontFamily: "LBo"
    },
    text: {
        fontSize: 14,
        fontFamily: 'LBo',
        color: '#FFFFFF',
        marginTop: 5
    }
})

export default PostDetails
