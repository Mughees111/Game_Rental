import React from 'react'
import { View,Text } from 'react-native'

export const SendMsg = (props) => {
    return (
        <View style={[props.style,{width:257,padding:20,paddingHorizontal:15, backgroundColor:'#A047C8',borderRadius:8,borderTopEndRadius:0,alignSelf:"flex-end"}]}>
            <Text style={{fontSize:14,color:'#FFFFFF',fontFamily:"PRe"}}>{props.msg}</Text>
        </View>
    )
}


export const RecieveMsg = (props) => {
    return (
        <View style={[props.style,{width:257,padding:20,paddingHorizontal:15,backgroundColor:'#FFFFFF',borderRadius:8,borderTopStartRadius:0,alignSelf:"flex-start"}]}>
            <Text style={{fontSize:14,color:'#A047C8',fontFamily:"PRe"}}>{props.msg}</Text>
        </View>
    )
}