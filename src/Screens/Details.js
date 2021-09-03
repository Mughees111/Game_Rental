import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'

import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon, ArrowBack, PlusIcon } from '../Components/SvgIcons'


import { StatusBar } from 'expo-status-bar';


const Details = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#A047C8' }}>
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
                                source={require("../assets/ChatsProfile.png")}
                            />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>Joe Adam</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                    <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 30 }}>
                        <TouchableOpacity 
                             onPress={() => {
                                props.navigation.navigate('BuyerGr')
                            }}
                            style={{ width: "32%", height: 30, borderRadius: 5, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'LR', color: '#FFFFFF' }}>Buyer</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('SellerGr')
                            }}
                            style={{ width: "32%", height: 30, borderRadius: 5, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'LR', color: '#FFFFFF' }}>Seller</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ width: "32%", height: 30, borderRadius: 5, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'LR', color: '#FFFFFF' }}>Details</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.navigate('ProfileDetails')
                        }}
                    >
                        <Text style={[styles.text, { marginTop: 50 }]}>Profile Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.navigate('ChangePassword')
                        }}
                    >
                        <Text style={[styles.text]}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.text]}>Interest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.text]}>What system do you own?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.text]}>Gamertags</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF', fontFamily: 'LR', fontSize: 18, marginTop: 30, marginLeft: 20
    }
})

export default Details
