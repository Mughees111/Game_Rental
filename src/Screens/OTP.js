import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { CAccountMail, CAccountPassword } from '../Components/SvgIcons';


const OTP = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <StatusBar
                hidden={true}
            />
            <LinearGradient
                // Background Linear Gradient
                colors={['#0D0D0D', '#17162B']}
                style={{ flex: 1 }}
            >
                <View style={{ marginLeft: 10, width: "80%", alignSelf: 'center', flex: 1 }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 24, color: '#FFFFFF', marginTop: Platform.OS == 'ios' ? 30 : 27, alignSelf: 'flex-end' }}>LOGO</Text>
                    <Text style={{fontFamily:'PSBo',fontSize:24,color:'#FFFFFF',marginTop:190,lineHeight:28}}>Enter OTP</Text>
                    <Text style={{fontSize:12,fontFamily:'PRe',color:'#BFBFBF',lineHeight:18}}>sent on *********4343</Text>
                    
                    <View style={[styles.textInputContainer]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholderTextColor="#BFBFBF"
                            placeholder="453454"
                        />
                    </View>

                    
                    
                    
                    <TouchableOpacity 
                        onPress={()=>{
                            props.navigation.navigate('Interests')
                        }}
                        style={{borderWidth:1,borderColor:'#FFFFFF',width:314,height:54,borderRadius:9,marginTop:40,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontFamily:'PMe',fontSize:18,color:'#FFFFFF'}}>Next</Text>
                    </TouchableOpacity>


                </View>
                
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        // width: 315,
        height: 48,
        backgroundColor: '#000000',
        borderRadius: 8,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    textInput: {
        width: '100%',
        height: "100%",
        color: '#BFBFBF',
        fontFamily: 'PRe',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 2,
        alignItems: 'center'
    }
})


export default OTP
