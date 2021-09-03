import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native'

const SignIn1 = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <View style={{ width: "95%", height: 326, alignSelf: 'center', position: 'absolute', top: 0, borderBottomEndRadius: 50, borderBottomStartRadius: 50, backgroundColor: '#992629' }}></View>
            <View style={{ width: "75%", height: 423, alignSelf: 'center', marginTop: 98, backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, shadowOpacity: 0.4, shadowColor: "#7E7A7A", shadowRadius: 4, shadowOffset: { width: 0.1, height: 1 }, elevation: 5, }}>
                <Text style={{ alignSelf: 'center', color: '#707070', fontSize: 30, marginTop: 50,fontFamily:"SBo" }}>Welcome</Text>
                <TextInput
                    placeholder="Email or user name"
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    style={[styles.textInput, { marginTop: 30 }]}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={setPassword}
                    style={styles.textInput}
                />
                <TouchableOpacity style={{width:"85%",height:48,backgroundColor:'#992629',alignItems:'center',justifyContent:'center',marginTop:30,borderRadius:12}}>
                    <Text style={{fontSize:20,color:'#fff',fontFamily:'SBo'}}>Login</Text>

                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: "85%",
        height: 48,
        borderWidth: 1,
        borderRadius: 12,
        borderColor:'#707070',
        paddingLeft:15,
        color: '#707070',
        fontSize: 15,
        marginTop: 15,
        fontFamily:"SBo"

    }
})
export default SignIn1
