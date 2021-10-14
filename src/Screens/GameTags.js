import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


const GameTags = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <StatusBar
                hidden={true}
            />
            <LinearGradient
                colors={['#0D0D0D', '#17162B']}
                style={{ flex: 1 }}
            >

                <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF', marginTop: Platform.OS == 'ios' ? 30 : 27, alignSelf: 'flex-end', width: "30%", }} ></Text>
                <View style={{ marginTop: 50, width: 200, height: 39, borderWidth: 1, borderLeftWidth: 0, marginLeft: -5, borderColor: '#FFFFFF', borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'PMe', color: '#FFFFFF' }}>Gamertags</Text>
                </View>

                <View style={{ width: "80%", alignSelf: 'center', position: 'absolute', top: 299 }}>
                    <Text style={{ color: '#FFFFFF', fontFamily: 'PRe' }}>Gamer Tag</Text>
                    <View style={{ backgroundColor: '#000000', height: 48, justifyContent: 'center', borderRadius: 9, marginTop: 10, paddingLeft: 20 }}>
                        <Text style={{ color: '#929292' }}>Super Nintendo</Text>
                    </View>

                </View>
                <TouchableOpacity 
                    onPress={()=>{
                        props.navigation.navigate('BottomTabNavigator')
                    }}
                    style={{position: 'absolute',bottom:20,width: "80%",alignSelf:'center', height: 54, marginTop: 15, backgroundColor: '#A047C8', borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'PMe', color: '#FFFFFF' }}>Next</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default GameTags
