import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { changeSelection } from '../../Common'
import { Phone, EmailIcon, GoogleIcon, FaceBookIcon } from '../Components/SvgIcons'


const Selection = (props) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#111111', }}>
            <StatusBar
                hidden={true}
            />
            <Image
                source={require("../assets/onBoarding1.png")}
                style={{
                    marginTop: -25,
                    marginLeft: -20
                }}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                <Text style={{ fontFamily: 'LR', fontSize: 16, color: '#707070', lineHeight: 20, paddingLeft: 35, paddingRight: 40, alignSelf: 'center' }}>
                    {/* Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an
                    of Lorem Ipsum. */}
            </Text>
                <Text style={{ fontFamily: 'PSBo', fontSize: 33, color: '#FFFFFF', marginLeft: 35, marginTop: 35, lineHeight: 40 }}>Are you a Gamer or are you Gameless?</Text>
                <TouchableOpacity
                    onPress={() => {
                        changeSelection.changeNow(1)
                    }}
                    style={{ flexDirection: 'row', width: "85%", alignSelf: "center", height: 47, marginTop: 25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRadius: 29 }}>
                    <Text style={{ color: '#8D8D8D', fontFamily: 'LR', fontSize: 15, marginLeft: 10 }}>I want to rent my games</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        changeSelection.changeNow(2)
                    }}
                    style={{ flexDirection: 'row', width: "85%", alignSelf: "center", height: 47, marginTop: 15, backgroundColor: '#1757C6', justifyContent: 'center', alignItems: 'center', borderRadius: 29 }}>
                    <Text style={{ color: '#FFFFFF', fontFamily: 'LR', fontSize: 16, marginLeft: 10 }}>I want to rent games</Text>
                </TouchableOpacity>


            </ScrollView>
        </View>
    )
}

export default Selection
