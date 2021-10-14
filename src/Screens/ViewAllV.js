import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon, ArrowBack, PlusIcon } from '../Components/SvgIcons'
import Modal from 'react-native-modal';
import Picker from '../Components/Picker';
import { StatusBar } from 'expo-status-bar';


const ViewAllV = (props) => {


    const item = props.route.params.data.post ? props.route.params.data.post : props.route.params.data;
    const title = props.route.params.title;
    const userData = props.route.params.userData&&props.route.params.userData




    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const renderItems = useCallback(({ item, index }) => {
        
        return (
            <TouchableOpacity

                onPress={() => {
                    props.navigation.navigate(props.route.params.nextScreen, {
                        params: item,
                        request: props.route.params.request
                    })
                }}
                style={{ marginLeft: 15, width: 156, height: 183 }}>


                <ImageBackground
                    source={{ uri: item.post ? item.post.images[0] : item.images[0] }}
                    style={{ width: 156, height: 183, overflow: 'hidden' }}
                >

                    <Image
                        style={{ position: 'absolute', bottom: 0, overflow: 'hidden', width: 156, }}
                        source={require("../assets/Mask2.png")}
                    />



                    <View style={{ position: 'absolute', bottom: 25, alignSelf: 'center' }}>
                        <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 8, alignSelf: 'center' }}>{item.title ? item.title : item.post.title}</Text>
                        <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 13 }}>{item.game_title?item.game_title : item.post?.game_title?item.post.game_title:null}</Text>

                    </View>
                </ImageBackground>
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: 87, height: 18, borderRadius: 6, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 8, color: "white" }}>{item.days} Days Left</Text>

                </View>
            </TouchableOpacity>

        )
    })




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
                                source={{uri:userData?.profile_pic}}
                            />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>{userData?.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                    <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>



                <View style={{ width: "85%", alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 30 }}>{title} ({item.length}) </Text>
                    </View>

                    <FlatList
                        data={item}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ paddingRight: 10 }}
                        style={{ marginLeft: -15 }}
                        renderItem={renderItems}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginTop: 15 }}
                        numColumns={2}

                    />
                </View>


            </ImageBackground>
            <TouchableOpacity style={{ position: 'absolute', bottom: 100, right: 10, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', width: 59, height: 59, borderRadius: 59 / 2, paddingBottom: 5 }}>
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

export default ViewAllV
