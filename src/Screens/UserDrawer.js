import React, { useEffect, useState } from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';
import { DrawerIcon, NotificationIcon, FavoriteIcon, OrderRevireIcon, SubscriptionIcon, SettingsIcon } from '../Components/SvgIcons'
import { doConsole, retrieveItem, storeItem, validateEmail } from "../utils/functions";

import { changeLoggedIn } from "../../Common";
const { width, height } = Dimensions.get('window')

export const UserDrawer = () => {

    const [drawer, setDrawer] = useState(false)
    const navigation = useNavigation();
    const [user, setUser] = useState()
    const [newBooking, setNewBooking] = useState(false)
    const route = useRoute();


    useEffect(() => {

        retrieveItem("login_data")
            .then((d) => {
                setUser(d)
            })
    }, [])



    return (
        <View>
            <TouchableOpacity
                style={{ paddingHorizontal: 10, paddingVertical: 10 }}
                onPress={() => {
                    setDrawer(true);
                }}
            >
                <DrawerIcon />
            </TouchableOpacity>

            <Modal
                isVisible={drawer}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                backdropTransitionOutTiming={0}
                animationOutTiming={500}
                onBackdropPress={() => {
                    setDrawer(false)
                }}
            >
                <View style={{ width: 322, marginLeft: -20, height: height, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 40 }}>

                    <View style={{ backgroundColor: "rgba(0,0,0,0.5)", height: height - 40, }}>

                        <View style={{ marginLeft: 44, marginTop: 20, flexDirection: 'row' }}>
                            <Image
                                source={{ uri: user?.profile_pic_url }}
                            />
                            <View style={{ marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontFamily: 'PBo', fontSize: 19, color: '#FFFFFF' }}>{user?.name}</Text>
                                <TouchableOpacity

                                    onPress={() => {
                                        setDrawer(false)
                                        navigation.navigate('UserAccountNavigator', {
                                            screen: 'ProfileDetails'
                                        })
                                    }}
                                    style={{ paddingBottom: 20 }}>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 12, color: '#FFFFFF' }}>Edit Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 44, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setDrawer(false)
                                }}
                                style={{ position: 'absolute', right: 25, top: 32 }}>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setDrawer(false)
                                    navigation.navigate('UserNoti')
                                    // setNewBooking(!newBooking)
                                }}
                                style={[styles.screensView,
                                { marginTop: 40 },]}>
                                <NotificationIcon />
                                <Text style={[styles.screenName, { marginLeft: 18 }]}>Notifications</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                if (route.name == 'OrderHistory') {
                                    setDrawer(false)
                                }
                                else {
                                    navigation.navigate('OrderHistory')
                                    setDrawer(false)
                                }
                            }}
                            style={[styles.screensView,
                            route.name == 'MyBookings' ? { backgroundColor: '#CFF7A7' } : {}
                            ]}>
                            <OrderRevireIcon />
                            <Text style={[styles.screenName, { marginLeft: 18 }]}>Rentel History</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            //     onPress={()=>{
                                    
                            // }}
                                style={[styles.screensView]}>
                                <SubscriptionIcon />
                                <Text style={styles.screenName}>Subscription</Text>
                            </TouchableOpacity> */}



                        {/* <TouchableOpacity
                        //     onPress={() => {
                        //         if(route.name == 'ContactUs'){
                        //             setDrawer(false)
                        //         }
                        //         else {
                        //         navigation.navigate('ContactUs')
                        //     }}
                        // }
                        style={[styles.screensView,
                            route.name == 'ContactUs' ?    {backgroundColor:'#CFF7A7'} : {}
                           ]}>
                            <FavoriteIcon/>
                            <Text style={styles.screenName}>Favorite</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => {
                                if (route.name == 'Settings') {
                                    setDrawer(false)
                                }
                                else {
                                    navigation.navigate('Settings')
                                    setDrawer(false)
                                }
                            }}
                            style={[styles.screensView,
                            route.name == 'Settings' ? { backgroundColor: '#CFF7A7' } : {}
                            ]}>
                            <SettingsIcon />
                            <Text style={[styles.screenName, { marginLeft: 21 }]}>Setting</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('OnBoardingNavigator')
                                // setDrawer(false)
                                storeItem("login_data", "").then(() => {
                                    changeLoggedIn.changeNow(2)
                                })

                            }}
                            style={{ width: 244, height: 54, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#A047C8', position: 'absolute', bottom: 40, flexDirection: 'row', alignItems: 'center', borderRadius: 9 }}>
                            <Text style={styles.screenName}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    screensView: {
        marginHorizontal: 15,
        paddingVertical: 12,
        paddingLeft: 10,
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    screenName: {
        color: '#FFFFFF',
        fontSize: 18,
        marginLeft: 20,
        fontFamily: 'PRe',
    }
})
