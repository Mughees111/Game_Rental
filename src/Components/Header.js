import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { UserDrawer } from '../Screens/UserDrawer';

const Header = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: Platform.OS == 'ios' ? 30 : 25, }}>
            <StatusBar
                hidden={true}
            />
            <TouchableOpacity>
                <UserDrawer />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF' }}>LOGO</Text>
        </View>
    )
}

export default Header
