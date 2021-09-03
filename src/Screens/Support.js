import React, { useCallback, useState } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import { ArrowBack, SettingsLargeIcon } from '../Components/SvgIcons'
import { StatusBar } from 'expo-status-bar';

const Support = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#A047C8' }}>

            <ImageBackground
                source={require("../assets/HomeBGImage.png")}
                style={{ width: "100%", height: 265, flex: 1 }}
            >
            

                    <View style={{flexL:1, position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}>
                    <ScrollView style={{height:"100%",flex:1}}>
                    <Text style={{width:316,alignSelf:'center',fontFamily:'LR',fontSize:12,color:'#FFFFFF',marginTop:30,lineHeight:15}}>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.{"\n"}Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.{"\n"}
Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.{"\n"}
Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.{"\n"}
Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.{"\n"}
Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.{"\n"}
Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.

</Text>
</ScrollView>

                </View>
                
                <View style={{ width: "90%", alignSelf: 'center' }}>
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
                        
                            <Text style={{ marginLeft: 10, fontFamily: 'PSBo', fontSize: 16, color: '#FFFFFF', }}>Support</Text>
                        
                    </View>
                </View>
            
            </ImageBackground>
           
        </View>
        
    )
}

export default Support


{/* <View style={{ flex: 1, backgroundColor: '#A047C8' }}>
        <ImageBackground
            source={require("../assets/HomeBGImage.png")}
            style={{ width: "100%", height: 265, flex: 1 }}
        >

            <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
            <View style={{ width: "90%", alignSelf: 'center' }}>
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
                        <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                            <SettingsLargeIcon/>
                            <Text style={{marginLeft:10,fontFamily:'PSBo',fontSize:16,color:'#FFFFFF',}}>Settings</Text>
                        </View>
                    </View>
                </View>
                </ImageBackground>
                </View> */}