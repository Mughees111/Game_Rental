import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, Text, TouchableOpacity, View, Image } from 'react-native'
import { UserDrawer } from '../Screens/UserDrawer';

const Header = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 30 : 25, }}>
            <StatusBar
                hidden={true}
            />
            <TouchableOpacity>
                <UserDrawer />
            </TouchableOpacity>
            
                {/* <Image
                    style={{ width: 50, height: 50 ,backgroundColor:'white',borderRadius:25,resizeMode:'stretch'}}
                    source={require('../../assets/icon.png')}
                /> */}
            
            <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF' }}> </Text>
        </View>
    )
}

export default Header
