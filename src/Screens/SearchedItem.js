import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'

import { apiRequest, doPost } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";
import { urls } from "./../utils/Api_urls";
import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon } from '../Components/SvgIcons'



var dropDownAlertRef;
const SearchedItem = (props) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false)
    const [searchItem, setSearchItem] = useState(props.route.params.searchItem?props.route.params.searchItem:'')
    const [searchPosts, setSearchPosts] = useState(props.route.params?.searchedData)



    function doSearch() {
        var x = dropDownAlertRef;
        console.log(user.token)
        const dbData = {
            token: user.token,
            search: searchItem
        }
        setLoading(true)
        let url = urls.API + 'search_posts';

        apiRequest(dbData, 'search_posts', false)
            .then(data => {
                setLoading(false)
                console.log(data)
                if (data.action == 'success') {

                    if (data.posts.length) {
                        setSearchPosts(data.posts)
                    }
                    else {
                        x.alertWithType("custom", "No matches found", "");

                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    useEffect(() => {

        retrieveItem("login_data")
            .then((d) => {
                setUser(d)
            })

    }, [])


    const renderItems = useCallback(({ item, index }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    // console.log(item)
                    props.navigation.navigate('PostDetailPage', { params: item, gameRenter: true })
                }}
                style={{ marginLeft: 15 }}>
                <ImageBackground
                    source={{ uri: item.images[0] }}
                    style={{ width: 128, height: 161 }}
                    imageStyle={{ borderRadius: 14 }}
                >
                    <Image
                        style={{ position: 'absolute', bottom: 0, width: "100%", resizeMode: "cover", height: 160, borderRadius: 15, overflow: "hidden" }}
                        source={require("../assets/Mask1.png")}
                    />
                    <View style={{ position: 'absolute', bottom: 15, width: "80%", alignSelf: 'center', paddingLeft: 8 }}>

                        <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                            <Text style={{ color: "#FFFFFF", fontSize: "LR", fontSize: 8, alignSelf: 'center' }}>{item.game_title}</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: "LBo", fontSize: 13, marginBottom: 15 }}>{item.title} </Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: -3, alignItems: 'center' }}>
                            <RattingStarIcon />
                            <RattingStarIcon />
                            <RattingStarIcon />
                            <RattingStarIcon />
                            <View style={{ width: 19, height: 19, borderRadius: 9.5, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                <TruckIcon />
                            </View>
                            <View style={{ width: 19, height: 19, borderRadius: 9.5, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', marginLeft: 5, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'LBo', fontSize: 6, color: '#FFFFFF' }}>{item.away}</Text>
                            </View>
                        </View>

                    </View>
                </ImageBackground>
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
                <View style={{ position: 'absolute', bottom: 0, height: "85%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
                {/* <View style={{ position: 'absolute', bottom: 0, height: "82%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View> : null} */}
                <View style={{ width: "80%", alignSelf: 'center' }}>
                    <Header />

                    <TouchableOpacity
                        style={styles.searchBar}
                    >

                        <TextInput
                            // placeholder="Search Games You Love"
                            value ={searchItem}
                            style={{ fontFamily: 'LR', fontSize: 14, color: '#FFFFFF', marginLeft: 10, width: "100%", height: "100%" }}
                            placeholderTextColor="#fff"
                            onChangeText={setSearchItem}
                            onSubmitEditing={() => {
                                doSearch()
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                doSearch()
                            }}
                            style={styles.inActiveFilterIcon}>
                            <SearchIcon />
                            {/* {filterModal ? <AFilterIcon /> : <FilterIcon />} */}
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <FlatList
                        data={searchPosts}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ paddingRight: 10, paddingBottom: 100 }}
                        style={{ marginLeft: -15, marginTop: 10 }}
                        renderItem={renderItems}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginTop: 15 }}
                        numColumns={2}
                    />
                </View>

            </ImageBackground>
        </View>

    )
}

export default SearchedItem
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
