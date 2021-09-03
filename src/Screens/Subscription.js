import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform, Image, ImageBackground,TouchableOpacity, Dimensions } from 'react-native'
import { CAccountMail, CAccountPassword, CAccountPerson, CAccountPhone, TCContainer, TCTick,ArrowBack } from '../Components/SvgIcons'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';



const Subscription = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#A047C8' }}>


            <ImageBackground
                source={require("../assets/HomeBGImage.png")}
                style={{ width: "100%", height: 265, flex: 1 }}
            >

                <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
                <View style={{ width: "85%", alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
                        <StatusBar
                            hidden={true}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.goBack();
                            }}
                            style={{ alignSelf: 'center' }}>
                            <ArrowBack />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ width: 44.16, height: 43.37, borderRadius: 22 }}
                                source={require("../assets/ChatsProfile.png")}
                            />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>Joe Adam</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
                                    <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <Text style={[styles.text, { marginTop: 50 }]}>Subscriptions</Text>
                    <View style={{backgroundColor:'#9A44C0',width: "100%",borderRadius:9,marginTop:10,paddingTop:10,paddingBottom:20, paddingHorizontal:20}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={[styles.text,{fontSize:16}]}>4 Weeks</Text>
                            <Text style={[styles.text,{fontSize:16}]}>Plan 1</Text>
                        </View>
                        <Text style={[styles.text,{fontSize:24,alignSelf:'center',marginTop:10}]}>35 Games / $35</Text>
                        <Text style={{fontFamily:'LR',fontSize:10,marginTop:10,marginHorizontal:5,  color:'#FFFFFF',lineHeight:10,textAlign:'center'}}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</Text>
                    </View>


                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF', fontFamily: 'PMe', fontSize: 18, 
    }
})
export default Subscription
