import React, { useState, useEffect } from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';
import { DrawerIcon, NotificationIcon, FavoriteIcon, OrderRevireIcon, SubscriptionIcon, SettingsIcon } from '../Components/SvgIcons'
import { doConsole, retrieveItem, storeItem, validateEmail } from "../utils/functions";

import { changeLoggedIn, changeLoggedInVendor, changeSelection, selectionObservable } from "../../Common";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')

export const Drawer = () => {

    const [drawer, setDrawer] = useState(false)
    const [user, setUser] = useState()
    const navigation = useNavigation();
    const [newBooking, setNewBooking] = useState(false)
    const route = useRoute();


    useEffect(() => {

        retrieveItem("login_data_vendor")
            .then((d) => {
                setUser(d)
                // forceUpdate();
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
                                    style={{ paddingBottom: 10 }}
                                    onPress={() => {
                                        setDrawer(false)
                                        navigation.navigate('SellerNavigator', {
                                            screen: 'ProfileDetailsV'
                                        })
                                    }}
                                >
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
                                    if (route.name == 'NotificationsV') {
                                        setDrawer(false)
                                    }
                                    else {
                                        navigation.navigate('NotificationsV')
                                        setDrawer(false)

                                    }
                                }}
                                style={[styles.screensView,
                                { marginTop: 40 },]}>
                                <NotificationIcon />
                                <Text style={[styles.screenName, { marginLeft: 18 }]}>Notifications</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                if (route.name == 'RentalHistory') {
                                    setDrawer(false)
                                }
                                else {
                                    setDrawer(false)
                                    navigation.navigate('RentalHistory')
                                }
                            }}
                            style={[styles.screensView,
                            route.name == 'MyBookings' ? { backgroundColor: '#CFF7A7' } : {}
                            ]}>
                            <OrderRevireIcon />
                            <Text style={[styles.screenName, { marginLeft: 18 }]}>Rental History</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            onPress={() => {
                                if (route.name == 'Subscription') {
                                    setDrawer(false)
                                }
                                else {
                                    navigation.navigate('SellerNavigator', {
                                        screen: 'Subscription'
                                    })
                                    setDrawer(false)
                                }
                            }}
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
                            route.name == 'ContactUs' ? { backgroundColor: '#CFF7A7' } : {}
                            ]}>
                            <FavoriteIcon />
                            <Text style={styles.screenName}>Favorite</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => {
                                if (route.name == 'SettingsV') {
                                    setDrawer(false)
                                }
                                else {
                                    navigation.navigate('SettingsV')
                                    setDrawer(false)
                                }
                            }}
                            style={[styles.screensView,
                            route.name == 'SettingsV' ? { backgroundColor: '#CFF7A7' } : {}
                            ]}>
                            <SettingsIcon />
                            <Text style={[styles.screenName, { marginLeft: 21 }]}>Setting</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                storeItem("login_data_vendor", "").then(() => {
                                    changeLoggedInVendor.changeNow(2)
                                    // navigation.navigate('OnBoardingNavigator2')
                                    setDrawer(false)

                                })
                            }}
                            style={{ width: 244, height: 54, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#A047C8', position: 'absolute', bottom: 40, flexDirection: 'row', alignItems: 'center', borderRadius: 9 }}>
                            <Text style={styles.screenName}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
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
