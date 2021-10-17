import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView, Alert } from 'react-native'
import Header from '../Components/Header'
import { FilterIcon, SearchIcon, RattingStarIcon, TruckIcon, AFilterIcon } from '../Components/SvgIcons'
import Modal from 'react-native-modal';
import Picker from '../Components/Picker';




import { apiRequest, doPost } from '../utils/apiCalls'
import { doConsole, retrieveItem, storeItem } from "../utils/functions";
import { urls } from "./../utils/Api_urls";
import DropdownAlert from "react-native-dropdownalert";
import Loader from "../utils/Loader";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';




var dropDownAlertRef;


const Home = (props) => {



    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [bookings_m, setBookings_m] = useState([])
    const [bookings_r, setBookings_r] = useState([])
    const [bookings_t, setBookings_t] = useState([])

    const [address, setAddress] = useState("")
    const [langtext, setLangtext] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState({})
    const [notif_token, setNotif_token] = useState('')

    const { width, height } = Dimensions.get('window')
    const [filterModal, setFilterModal] = useState(false)
    const [searchBarPosition, setSearchBarPosition] = useState()
    const [yOffset, setYOffset] = useState(height);
    const [searchView, setSearchView] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const [searchPosts, setSearchPosts] = useState([])

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    useFocusEffect(React.useCallback(() => {
        retrieveItem("login_data").then((data) => {
            setUser(data)

        })
    }, []))

    useEffect(() => {

        retrieveItem("login_data")
            .then((d) => {
                console.log('user')
                console.log(d)
                setUser(d)
            })

    }, [])

    useEffect(() => {
        if (user && user?.token != undefined) {
            getData();
            askNotificationPermission()
        }
    }, [user])

    const askNotificationPermission = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;


        if (finalStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus == 'granted') {
            try {
                let token = await Notifications.getExpoPushTokenAsync();
                console.log('token is')
                console.log(token.data)
                setNotif_token(token.data)
                store_location_on_server(token.data)
            } catch (error) {
                // alert(error);
            }
        }
    }



    const store_location_on_server = async (localToken) => {
        
        console.log(localToken)
        const dbData = { token: user?.token ?? "", notif_key: localToken };
        const { isError, data } = await doPost(dbData, "do_store_notifiation_key");
        console.log(isError);
        console.log(data);
    }




    function doSearch() {

        var x = dropDownAlertRef;
        const dbData = {
            token: user.token,
            search: searchItem
        }
        setLoading(true)
        let url = urls.API + 'search_posts';
        console.log(url)


        apiRequest(dbData, 'search_posts', false)
            .then(data => {
                setLoading(false)
                console.log(data)
                if (data.action == 'success') {

                    if (data.posts.length) {
                        navigation.navigate('SearchedItem', {
                            searchedData: data.posts,
                            searchItem
                        })
                    }
                    else {
                        x.alertWithType("custom", "No matches found", "");

                    }
                    // setSearchPosts(data.posts)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function getData() {
        var x = dropDownAlertRef;

        setLoading(true)
        retrieveItem("login_data")
            .then((d) => {
                // console.log('user')
                // console.log(d)
                // setUser(d)
                const dbData = { token: d.token }
                apiRequest(dbData, 'get_posts', false)
                    .then(data => {
                        console.log(data)
                        if (data) {
                            if (data.action == 'success') {
                                console.log(data)
                                setBookings_m(data.most_popular);
                                setBookings_t(data.top_rated);
                                setBookings_r(data.recommended);
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








    const categoryTags = [
        { name: "Category Tag", selected: false },
        { name: "Category Tag", selected: false },
        { name: "Category Tag", selected: false },
        { name: "Category Tag", selected: false },
        { name: "Category Tag", selected: false },
    ]

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

    const searchedItems = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('PostDetailPage', { params: item, gameRenter: true })
                }}
                style={{ marginTop: 15 }}
            >
                <ImageBackground
                    source={item.image}
                    style={{ width: 154, height: 169 }}
                >
                    <Image
                        style={{ position: 'absolute', bottom: 0, width: 154, }}
                        source={require("../assets/Mask2.png")}
                    />
                    <View style={{ position: 'absolute', bottom: 15, width: "80%", alignSelf: 'center', paddingLeft: 8 }}>

                        <Text style={{ fontFamily: 'LR', fontSize: 8, color: '#FFFFFF', alignSelf: 'center' }}>Asad Sultan</Text>
                        <Text style={{ fontFamily: 'LBo', fontSize: 13, color: '#FFFFFF', alignSelf: 'center' }}>Game Name</Text>

                        <View style={{ flexDirection: 'row', marginLeft: -3, alignItems: 'center', marginTop: 10 }}>
                            <RattingStarIcon />
                            <RattingStarIcon />
                            <RattingStarIcon />
                            <RattingStarIcon />
                            <View style={{ width: 19, height: 19, borderRadius: 9.5, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                <TruckIcon />
                            </View>
                            <View style={{ width: 19, height: 19, borderRadius: 9.5, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center', marginLeft: 5, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'LBo', fontSize: 6, color: '#FFFFFF' }}>2km</Text>
                            </View>
                        </View>

                    </View>
                </ImageBackground>
            </TouchableOpacity>

        )
    })

    const FilterModal = () => (
        <Modal
            isVisible={filterModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropTransitionOutTiming={0}
            backdropOpacity={0.1}
            animationOutTiming={500}
            onBackdropPress={() => {
                setFilterModal(false)
            }}

        // style={{overflow:'hidden'}}
        >
            <View style={{ flex: 1, position: 'absolute', top: yOffset, marginLeft: -20, width: width, height: height, backgroundColor: '#161527', borderRadius: 43 }}>
                <View style={{ width: "85%", alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'LBo', fontSize: 18, color: "#FFFFFF", lineHeight: 22 }}>Category Tags</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: -14 }}>
                        {categoryTags.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        item.selected = true
                                    }}
                                    style={styles.filterItems}>
                                    <Text style={[styles.filterItemsLabel, item.selected ? { backgroundColor: '#A047C8' } : null]}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </View>

                    <Text style={{ fontFamily: 'LBo', fontSize: 18, color: "#FFFFFF", lineHeight: 22, marginTop: 30 }}>Nearby</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: -10 }}>

                        <TouchableOpacity style={[styles.filterItems, { width: 57 }]}>
                            <Text style={styles.filterItemsLabel}>5Mi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterItems, { width: 57 }]}>
                            <Text style={styles.filterItemsLabel}>15Mi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterItems, { width: 57 }]}>
                            <Text style={styles.filterItemsLabel}>20Mi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterItems, { width: 57 }]}>
                            <Text style={styles.filterItemsLabel}>25Mi</Text>
                        </TouchableOpacity>
                    </View>



                    <Text style={{ fontFamily: 'LBo', fontSize: 18, color: "#FFFFFF", lineHeight: 22, marginTop: 15 }}>System</Text>
                    <View style={{ flexDirection: 'row', marginLeft: -10 }}>
                        <TouchableOpacity style={styles.filterItems}>
                            <Text style={styles.filterItemsLabel}>Playstation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterItems}>
                            <Text style={styles.filterItemsLabel}>Xbox</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterItems}>
                            <Text style={styles.filterItemsLabel}>Nintendo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Text style={{ fontFamily: 'LBo', fontSize: 18, color: "#FFFFFF", lineHeight: 22, marginTop: 15 }}>Xbox</Text>
                    <Picker
                        pickerStyle={{ width: 330, height: 48, backgroundColor: '#000000', borderRadius: 8, marginTop: 10, paddingLeft: 20 }}
                        title="Xbox 360"
                        titleStyle={{ color: '#929292', fontFamily: 'PLi', fontSize: 14 }}
                    /> */}
                    <TouchableOpacity
                        onPress={() => {
                            setFilterModal(false)
                            // setSearchView(true)
                        }}
                        style={{ width: 314, height: 54, backgroundColor: '#A047C8', alignSelf: 'center', borderRadius: 9, marginTop: 35, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'PMe', fontSize: 18 }}>Apply</Text>
                    </TouchableOpacity>



                </View>
            </View>

        </Modal>
    )






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

                {searchView ? <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View> : null}
                {!searchView ? <View style={{ position: 'absolute', bottom: 0, height: "82%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View> : null}
                <View style={{ width: "80%", alignSelf: 'center' }}>
                    <Header />
                    {/* Search Bar */}
                    <TouchableOpacity
                        ref={view => setSearchBarPosition(view)}
                        style={styles.searchBar}
                    >

                        <TextInput
                            placeholder="Search Games You Love"
                            style={{ fontFamily: 'LR', fontSize: 14, color: '#FFFFFF', marginLeft: 10, width: "100%", height: "100%" }}
                            placeholderTextColor="#fff"
                            onChangeText={setSearchItem}
                            onSubmitEditing={() => {
                                if (searchItem!='') {
                                    doSearch()
                                }

                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (searchItem!='') {
                                    doSearch()
                                }
                                // setFilterModal(!filterModal)
                                // searchBarPosition.measure((fx, fy, width, heightt, px, py) => {
                                //     // const filterModalHeight = height-py-60
                                //     const filterModalHeight = py + 30
                                //     setYOffset(filterModalHeight)
                                // })
                            }}
                            style={filterModal ? styles.activeFilterIcon : styles.inActiveFilterIcon}>
                            <SearchIcon />
                            {/* {filterModal ? <AFilterIcon /> : <FilterIcon />} */}
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                >

                    {!searchView ? <View style={{ paddingLeft: "10%" }}>
                        <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Top Rated</Text>
                        <FlatList
                            data={bookings_r}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                        />

                        <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Recommended</Text>
                        <FlatList
                            data={bookings_t}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                        />

                        <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Most Popular</Text>
                        <FlatList
                            data={bookings_m}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingRight: 10 }}
                            style={{ marginTop: 10, marginLeft: -15 }}
                            horizontal={true}
                            renderItem={renderItems}
                        />

                    </View> :
                        <View style={{ marginTop: 25 }}>
                            <FlatList
                                data={bookings}
                                key={'#'}
                                keyExtractor={keyExtractor}
                                numColumns={2}
                                keyExtractor={keyExtractor}
                                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                                contentContainerStyle={{ paddingBottom: 300 }}
                                // style={{ marginTop: 10 }}
                                renderItem={searchedItems}
                            />



                        </View>
                    }


                </ScrollView>
            </ImageBackground>
            <FilterModal />

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

export default Home
