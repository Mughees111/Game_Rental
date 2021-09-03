import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';


import OnBoardfing from './src/Screens/OnBoardfing';
import CreateAccount from './src/Screens/CreateAccount';
import Address1 from './src/Screens/Address1';
import SignIn from './src/Screens/SignIn';
import OTP from './src/Screens/OTP';
import Interests from './src/Screens/Interests';
import TitleYouOwn from './src/Screens/TitleYouOwn';
import SystemOwns from './src/Screens/SystemOwns';
import GameTags from './src/Screens/GameTags';
import { AccountIcon, ChatBtmIcon, CreateNewPostIcon, HomeIcon } from './src/Components/SvgIcons';
import Home from './src/Screens/Home';
import PostDetailPage from './src/Screens/PostDetailPage';
import Chats from './src/Screens/Chats';
import ChatDetails from './src/Screens/ChatDetails';
import NewPost from './src/Screens/NewPost';
import Seller from './src/Screens/Seller';
import SellerGr from './src/Screens/SellerGR';
import Chat12 from './src/Screens/Chat12';
import BuyerGr from './src/Screens/BuyerGr';
import Details from './src/Screens/Details';
import ProfileDetails from './src/Screens/ProfileDetails';
import ChangePassword from './src/Screens/ChangePassword';
import Subscription from './src/Screens/Subscription';


import { doConsole, retrieveItem, storeItem } from "./src/utils/functions";
import { urls } from "./src/utils/Api_urls";
import { changeLoggedIn, loggedInObservable, loggedInVendorObservable, selectionObservable } from "./Common";
import { useState, useEffect } from 'react';
import Selection from './src/Screens/Selection';
import CreateAccountV from './src/Screens/CreateAccountV';
import SignInV from './src/Screens/SignInV';
import VendorHome from './src/Screens/VendorHome';
import Buyer from './src/Screens/Buyer';
import PostDetails from './src/Screens/PostDetails';
import SignIn1 from './SignIn1';
import PostDetailsV from './src/Screens/PostDetailsV';
import UserNoti from './src/Screens/UserNoti';
import ViewAllV from './src/Screens/ViewAllV';
import Settings from './src/Screens/Settings';
import Support from './src/Screens/Support';
import PrivacyPolicy from './src/Screens/PrivacyPolicy';
import TandCond from './src/Screens/TandCond';
import UserProfile from './src/Screens/UserProfile';
import UserChat from './src/Screens/UserChat';
import SettingsV from './src/Screens/SettingsV';
import ProfileDetailsV from './src/Screens/ProfileDetailsV';
import NotificationsV from './src/Screens/NotificationsV';



export default function App() {

  const [users, setUsers] = useState(0)
  const [as, setAS] = useState('')

  const [loggedIn, setLoggedIn] = useState(0)

  const [isVendor, setIsVendor] = useState(0)
  const [loggedInVendor, setLoggedInVendor] = useState(0)


  const [loaded] = useFonts({
    LBl: require("./assets/fonts/Lato/Lato-Black.ttf"),
    LBI: require("./assets/fonts/Lato/Lato-BlackItalic.ttf"),
    LBo: require("./assets/fonts/Lato/Lato-Bold.ttf"),
    LI: require("./assets/fonts/Lato/Lato-Italic.ttf"),
    LL: require("./assets/fonts/Lato/Lato-Light.ttf"),
    LLi: require("./assets/fonts/Lato/Lato-LightItalic.ttf"),
    LR: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    // require("./assets/fonts/Lato/Lato-Regular.ttf"),
    LT: require("./assets/fonts/Lato/Lato-Thin.ttf"),
    LTI: require("./assets/fonts/Lato/Lato-ThinItalic.ttf"),
    // Poppins
    PBo: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PRe: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PMe: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PSBo: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PLi: require('./assets/fonts/Poppins/Poppins-Light.ttf'),


    // Sugeo-Ui
    SBo: require('./assets/fonts/segoe-ui/Segoe-Bold.ttf'),
    SRe: require('./assets/fonts/segoe-ui/Segoe-UI.ttf'),


  })


  useEffect(() => {

    console.log("ever came here")
    checkLoggedIn()
    checkLoggedInVendor()
    loggedInObservable.subscribe((v) => {
      console.log("Yessss won the warrrrr");
      console.log(v)
      console.log(v)
      setLoggedIn(v)
    })
    loggedInVendorObservable.subscribe((v) => {
      setLoggedInVendor(v)
    })
    selectionObservable.subscribe((v) => {
      setIsVendor(v)
    });

  }, []);

  const checkLoggedIn = () => {
    retrieveItem("login_data").then((data) => {
      if (data) {
        console.log(data)
        checkWithServer(data)
      }
      else {
        setLoggedIn(2)
      }
    })
  }
  const checkLoggedInVendor = () => {
    retrieveItem("login_data_vendor").then((data) => {
      if (data) {
        checkWithServerVendor(data)
      }
      else {
        doConsole("token doesn't exist");
        setLoggedInVendor(2)

      }
    })
  }

  const checkWithServer = (data) => {
    if (data) var token = data.token;
    else var token = "khali";
      var body_data = { token: token };
      doConsole(" I request @ " + urls.API + "check_login");
      doConsole(body_data);
      fetch(urls.API + 'check_login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body_data),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          doConsole(" I receive ");
          doConsole(responseJson);
          if (responseJson.action == "success") {
            storeItem("login_data", responseJson.data).then(() => {
              setLoggedIn(1)
            });
          }
          else {
            setLoggedIn(2)
          }

        }).catch((error) => {
          setLoggedIn(2)
        });
    
  }

  const checkWithServerVendor = (data) => {
    if (data)
      var token = data.token;
    else
      var token = "khali";
    var body_data = { token: token };
    doConsole(" I request @ " + urls.API_VENDOR + "check_login");
    doConsole(body_data);
    fetch(urls.API_VENDOR + 'check_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body_data),
    }).then((response) => response.json())
      .then((responseJson) => {
        doConsole(" I receive ");
        doConsole(responseJson);
        if (responseJson.action == "success") {
          storeItem("login_data", responseJson.data).then(() => {
            setLoggedInVendor(1)
          });
        }
        else {
          setLoggedInVendor(2)
        }
      }).catch((error) => {
        setLoggedInVendor(2)
      });
  }


  if (loggedIn == 0 || loggedInVendor == 0 || !loaded) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7f7f7'
      }}>
        <Image source={require("./assets/splash.png")} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  }

  const BottomTabs = createMaterialBottomTabNavigator();
  const Stack = createStackNavigator();

  function HomeStackNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PostDetailPage" component={PostDetailPage} />
      </Stack.Navigator>
    )
  }

  function HomeStackNavigatorVendor() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="VendorHome" component={VendorHome} />
        <Stack.Screen name="PostDetailPage" component={PostDetailPage} />
        <Stack.Screen name="NewPost" component={NewPost} />
        <Stack.Screen name="ViewAllV" component={ViewAllV} />
      </Stack.Navigator>
    )
  }


  function UserChatNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserChat" component={UserChat} />
        <Stack.Screen name="ChatDetails" component={ChatDetails} />
      </Stack.Navigator>
    )
  }

  function ChatStackNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="ChatDetails" component={ChatDetails} />
      </Stack.Navigator>
    )
  }
  function OnBoardingNavigator() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="OnBoardfing" component={OnBoardfing} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Address1" component={Address1} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Interests" component={Interests} />
        <Stack.Screen name="TitleYouOwn" component={TitleYouOwn} />
        <Stack.Screen name="SystemOwns" component={SystemOwns} />
        {/* <Stack.Screen name="GameTags" component={GameTags} /> */}
      </Stack.Navigator>
    )
  }

  function OnBoardingNavigatorV() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >

        <Stack.Screen name="SignInV" component={SignInV} />

        <Stack.Screen name="CreateAccountV" component={CreateAccountV} />
      </Stack.Navigator>
    )
  }

  function SellerNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Seller" component={Seller} />
        <Stack.Screen name="SellerGr" component={SellerGr} />
        <Stack.Screen name="ViewAllV" component={ViewAllV} />
        <Stack.Screen name="Chat12" component={Chat12} />
        <Stack.Screen name="BuyerGr" component={BuyerGr} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="ProfileDetailsV" component={ProfileDetailsV} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="PostDetailsV" component={PostDetailsV} />

      </Stack.Navigator>
    )
  }


  function UserAccountNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetails} />

      </Stack.Navigator>
    )
  }

  function BuyerStackNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Buyer" component={Buyer} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
      </Stack.Navigator>
    )
  }

  function BottomTabNavigator() {
    return (
      <BottomTabs.Navigator
        inactiveColor="#575656"
        activeColor="#FFFFFF"
        barStyle={{
          backgroundColor: '#000000',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          position: 'absolute',
          overflow: 'hidden',
        }}
        shifting={false}
        labeled={false}

      >
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <HomeIcon color={color} />
              </View>
                : <HomeIcon color={color} />
            )
          }}
          name="Home" component={HomeStackNavigator} />
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <ChatBtmIcon color={color} />
              </View>
                : <ChatBtmIcon color={color} />
            )
          }}
          name="ChatStackNavigator" component={UserChatNavigator} />
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <CreateNewPostIcon color={color} />
              </View>
                : <CreateNewPostIcon color={color} />
            )
          }}
          name="BuyerStackNavigator" component={BuyerStackNavigator} />
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <AccountIcon color={color} />
              </View>
                : <AccountIcon color={color} />

            )
          }}
          name="UserAccountNavigator" component={UserAccountNavigator} />
      </BottomTabs.Navigator>
    )
  }

  function BottomTabNavigatorV() {
    return (
      <BottomTabs.Navigator
        inactiveColor="#575656"
        activeColor="#FFFFFF"
        barStyle={{
          backgroundColor: '#000000',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          position: 'absolute',
          overflow: 'hidden',
        }}
        shifting={false}
        labeled={false}

      >
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <HomeIcon color={color} />
              </View>
                : <HomeIcon color={color} />
            )
          }}
          name="HomeVendor" component={HomeStackNavigatorVendor} />
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <ChatBtmIcon color={color} />
              </View>
                : <ChatBtmIcon color={color} />
            )
          }}
          name="ChatStackNavigator" component={ChatStackNavigator} />
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <CreateNewPostIcon color={color} />
              </View>
                : <CreateNewPostIcon color={color} />
            )
          }}
          name="NewPost" component={NewPost} />
        <BottomTabs.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBox}>
                <AccountIcon color={color} />
              </View>
                : <AccountIcon color={color} />

            )
          }}
          name="SellerNavigator" component={SellerNavigator} />
      </BottomTabs.Navigator>
    )
  }



  if (!loaded) {
    return null
  }

  return (
    <NavigationContainer>


      {/* <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="SignIn1" component={SignIn1} />
        {/* {
          loggedIn==2 &&
          <Stack.Screen name="OnBoardingNavigator" component={OnBoardingNavigator} />
        }
        {
          loggedIn==1 &&
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        } 


        

      </Stack.Navigator> */}



      {isVendor == 0 && // undefined
        <Stack.Navigator initialRouteName="Selection">
          <Stack.Screen options={{ headerShown: false }} name="Selection" component={Selection} />
        </Stack.Navigator>
      }
      { 
        isVendor == 1 && // yes vendor
        <Stack.Navigator initialRouteName="OnBoardingNavigatorV">

          {
            loggedInVendor == 1 &&
            <Stack.Screen options={{ headerShown: false }} name="BottomTabNavigatorV" component={BottomTabNavigatorV} />
          }
          {
            loggedInVendor == 2 &&
            <Stack.Screen options={{ headerShown: false }} name="OnBoardingNavigatorV" component={OnBoardingNavigatorV} />
          }
          <Stack.Screen options={{ headerShown: false }} name="NotificationsV" component={NotificationsV} />
          <Stack.Screen options={{ headerShown: false }} name="SettingsV" component={SettingsV} />
          <Stack.Screen options={{ headerShown: false }} name="Support" component={Support} />
          <Stack.Screen options={{ headerShown: false }} name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen options={{ headerShown: false }} name="TandCond" component={TandCond} />
        </Stack.Navigator>
      }
      {
        isVendor == 2 && // no vendor
        <Stack.Navigator initialRouteName="Auth">

          {
            loggedIn == 1 &&
            <Stack.Screen options={{ headerShown: false }} name="BottomTabNavigator" component={BottomTabNavigator} />
          }
          {
            loggedIn == 2 &&
            <Stack.Screen options={{ headerShown: false }} name="OnBoardingNavigator" component={OnBoardingNavigator} />

          }
          <Stack.Screen options={{ headerShown: false }} name="UserNoti" component={UserNoti} />
          <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
          <Stack.Screen options={{ headerShown: false }} name="Support" component={Support} />
          <Stack.Screen options={{ headerShown: false }} name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen options={{ headerShown: false }} name="TandCond" component={TandCond} />

        </Stack.Navigator>
      }

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabBox: {
    marginTop: -5,
    backgroundColor: '#A047C8',
    width: 33.63,
    height: 33.63,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
});
