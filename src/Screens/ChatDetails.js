import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, Platform } from 'react-native'
import Header from '../Components/Header'
import {SendMsg,RecieveMsg} from '../Components/Msg'
import { RattingStarIcon, HeartWhiteIcon, XBoxIcon, KMLocationIcon, PickupIcon, PDPChatIcon, SearchIcon, DrawerIcon, ChatLargeIcon, ArrowBack, ShareIcon, ArrowRight } from '../Components/SvgIcons'

const ChatDetails = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#A047C8' }}>

            <ImageBackground
                source={require("../assets/HomeBGImage.png")}
                style={{ width: "100%", height: 265, flex: 1 }}
            >
                <View style={{ width: "80%", alignSelf: 'center' }}>
                    {/* Header */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
                        <StatusBar
                            hidden={true}
                        />
                        <TouchableOpacity 
                            onPress={()=>{
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
                </View>


            </ImageBackground>
            

            <View style={{ flex: 1, position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43,paddingRight:20,paddingTop:30,paddingLeft:20 }}>
            <SendMsg
                msg="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
            />
            <RecieveMsg
                style={{marginTop:15}}
                msg="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
            <Text style={{alignSelf:'center',color:'#A047C8',fontFamily:'PBo',marginTop:20}}>Monday, 10:40 am</Text>
            <SendMsg
                style={{marginTop:15}}
                msg="Sed ut perspiciatis unde omnis."
            />
            </View>
            <View style={{ position: 'absolute', bottom: Platform.OS == 'ios' ? 100 : 80, right: -10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity>
                    <ShareIcon />
                </TouchableOpacity>
                <TextInput
                    placeholder="Say something…"
                    placeholderTextColor="#A047C8"
                    style={{ width: "75%", height: 41.2, backgroundColor: '#FFFFFF', borderRadius: 5, marginLeft: 15, color: '#A047C8', fontSize: 11, paddingLeft: 10, fontFamily: 'PRe' }}
                />
                <TouchableOpacity style={{ width: 50.61, height: 50.61, borderRadius: 25.30, backgroundColor: '#A047C8', justifyContent: "center", alignItems: 'center', marginLeft: -10 }}>
                    <ArrowRight />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ChatDetails
