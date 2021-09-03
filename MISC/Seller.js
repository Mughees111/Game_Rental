// import React, { useCallback, useState } from 'react'
// import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, ScrollView } from 'react-native'
// import Header from '../Components/Header'
// import {  ArrowBack,PlusIcon } from '../Components/SvgIcons'
// import { StatusBar } from 'expo-status-bar';


// const Seller = (props) => {






//     const keyExtractor = useCallback((item, index) => index.toString(), []);
//     const topRatedData = [
//         {
//             name: " Asad Sultan",
//             gameName: "Game Name",
//             image: require("../assets/img1.png")
//         },
//         {
//             name: " Asad Sultan",
//             gameName: "Game Name",
//             image: require("../assets/img2.png")
//         },
//         {
//             name: " Asad Sultan",
//             gameName: "Game Name",
//             image: require("../assets/img3.png")
//         },

//     ]

//     const recommendedData = [
//         {
//             name: " Asad Sultan",
//             gameName: "Game Name",
//             image: require("../assets/img4.png")
//         },
//         {
//             name: " Asad Sultan",
//             gameName: "Game Name",
//             image: require("../assets/img5.png")
//         },
//         {
//             name: " Asad Sultan",
//             gameName: "Game Name",
//             image: require("../assets/img6.png")
//         },

//     ]
   
//     const renderItems = useCallback(({ item, index }) => {
//         return (
//             <TouchableOpacity
//                 onPress={() => {
//                     // props.navigation.navigate('Chat12')
//                     props.navigation.navigate('SellerGr')
//                 }}
//                 style={{ marginLeft: 15 , width: 128, height: 166 }}>
                    
                    
//                 <ImageBackground
//                     source={item.image}
//                     style={{ width: 128, height: 161,overflow:'hidden' }}
//                 >
                    
//                     <Image
//                         style={{ position: 'absolute', bottom: 0 ,overflow:'hidden'}}
//                         source={require("../assets/Mask1.png")}
//                     />
                    
                        

//                     <View style={{position: 'absolute',bottom:10,alignSelf:'center'}}>
//                         <Text style={{color:"#FFFFFF",fontSize:"LR",fontSize:8,alignSelf:'center'}}>Asad Sultan</Text>
//                         <Text style={{color:"#FFFFFF",fontSize:"LBo",fontSize:13}}>Game Name</Text>
//                         <Text>Asad Sultan</Text>

//                     </View>
//                 </ImageBackground>
//                 <View style={{ position: 'absolute',bottom:0,alignSelf:'center', width: 87,height:18,borderRadius:6,backgroundColor:'#A047C8',justifyContent:'center',alignItems:'center'}}>
//                     <Text style={{fontFamily:'LBo',fontSize:8,color:"white"}}>4 Days Left</Text>
//                 </View>
//             </TouchableOpacity>

//         )
//     })

    


//     return (
//         <View style={{ flex: 1, backgroundColor: '#A047C8' }}>

//             <ImageBackground
//                 source={require("../assets/HomeBGImage.png")}
//                 style={{ width: "100%", height: 265, flex: 1 }}
//             >

//                 <View style={{ position: 'absolute', bottom: 0, height: "90%", width: "100%", backgroundColor: '#161527', borderRadius: 43 }}></View>
//                 <View style={{ width: "90%", alignSelf: 'center' }}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
//                         <StatusBar
//                             hidden={true}
//                         />
//                         <TouchableOpacity
//                             onPress={() => {
//                                 props.navigation.goBack();
//                             }}
//                             style={{ alignSelf: 'center' }}>
//                             <ArrowBack />
//                         </TouchableOpacity>
//                         <View style={{ flexDirection: 'row' }}>
//                             <Image
//                                 style={{ width: 44.16, height: 43.37, borderRadius: 22 }}
//                                 source={require("../assets/ChatsProfile.png")}
//                             />
//                             <View style={{ marginLeft: 5 }}>
//                                 <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>Joe Adam</Text>
//                                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
//                                     <View style={{ width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: 3.5 }}></View>
//                                     <Text style={{ marginLeft: 3, color: '#FFFFFF', fontSize: 5 }}>Online</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </View>

               
//                 <View style={{width:'90%',alignSelf:'center',justifyContent:'space-between',flexDirection:'row',marginTop:30}}> 
//                         <TouchableOpacity 
//                             onPress={()=>{
//                                 props.navigation.navigate('BuyerGr')
//                             }}
//                             style={{ width: "32%", height: 30, borderRadius: 5, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 14, fontFamily: 'LR', color: '#FFFFFF' }}>Buyer</Text>
//                         </TouchableOpacity>
                    
                    
//                         <TouchableOpacity style={{ width: "32%", height: 30, borderRadius: 5, backgroundColor: '#A047C8', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 14, fontFamily: 'LR', color: '#FFFFFF' }}>Seller</Text>
//                         </TouchableOpacity>
                    
                    
//                         <TouchableOpacity 
//                             onPress={()=>{
//                                 props.navigation.navigate('Details')
//                             }}
//                             style={{ width: "32%", height: 30, borderRadius: 5, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 14, fontFamily: 'LR', color: '#FFFFFF' }}>Details</Text>
//                         </TouchableOpacity>
//                 </View>

//                 <View style={{width:"90%",alignSelf:'center',borderRadius:18,borderWidth:1,borderColor:'#A047C8',height:87,backgroundColor:'#000000',paddingHorizontal:30,paddingTop:10,marginTop:20}}>
//                     <Text style={{fontFamily:'LR',fontSize:12,color:'#FFFFFF',alignSelf:'center'}}>You have Rented 12 Games this week & Earned</Text>
//                     <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',width:'85%',alignSelf:'center',alignItems:'center',borderRadius:5}}>
//                         <Text style={{ fontSize:27,fontFamily:'LR',color:'#FFFFFF'}}>$654</Text>
//                         <TouchableOpacity style={{ justifyContent:'center',alignItems:'center',width: 116,height:24,backgroundColor: '#A047C8',borderRadius:5,}}>
//                             <Text style={{color:'#FFFFFF',fontSize:12,fontFamily:'LR'}}>View Details</Text>
//                         </TouchableOpacity>



//                     </View>

//                 </View>


                
                
//               <ScrollView
//                 contentContainerStyle={{paddingBottom:100}}
//               >
//                 <View style={{ paddingLeft: 20 }}>
                    
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Given on Rent (8)</Text>
//                         <TouchableOpacity style={{ position: 'absolute', right: 20, }}>
//                             <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <FlatList
//                         data={topRatedData}
//                         keyExtractor={keyExtractor}
//                         contentContainerStyle={{ paddingRight: 10 }}
//                         style={{ marginTop: 10, marginLeft: -15 }}
//                         horizontal={true}
//                         renderItem={renderItems}
//                         showsHorizontalScrollIndicator={false}

//                     />

//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Requested(10)</Text>
//                         <TouchableOpacity style={{ position: 'absolute', right: 20, }}>
//                             <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <FlatList
//                         data={recommendedData}
//                         keyExtractor={keyExtractor}
//                         contentContainerStyle={{ paddingRight: 10 }}
//                         style={{ marginTop: 10, marginLeft: -15 }}
//                         horizontal={true}
//                         renderItem={renderItems}
//                         showsHorizontalScrollIndicator={false}

//                     />

//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Text style={{ fontFamily: 'LBo', fontSize: 18, color: '#FFFFFF', marginTop: 10 }}>Sent For Approval(10)</Text>
//                         <TouchableOpacity style={{ position: 'absolute', right: 20, }}>
//                             <Text style={{ fontFamily: 'LR', fontSize: 11, color: '#FFFFFF', textDecorationLine: "underline", }}>View All</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <FlatList
//                         data={topRatedData}
//                         keyExtractor={keyExtractor}
//                         contentContainerStyle={{ paddingRight: 10 }}
//                         style={{ marginTop: 10, marginLeft: -15 }}
//                         horizontal={true}
//                         renderItem={renderItems}
//                         showsHorizontalScrollIndicator={false}

//                     />

//                 </View>
                
//                 </ScrollView>


//             </ImageBackground>
//             <TouchableOpacity style={{position: 'absolute',bottom:100,right:10, backgroundColor:'#A047C8',justifyContent:'center',alignItems:'center',width:59,height:59,borderRadius:59/2,paddingBottom:5}}>
//                 <PlusIcon/> 
//             </TouchableOpacity>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     searchBar: {
//         width: "100%",
//         height: 44,
//         flexDirection: 'row',
//         paddingLeft: 15,
//         paddingRight: 10,
//         marginTop: 10,
//         backgroundColor: 'rgba(0,0,0,0.3)',
//         borderRadius: 8,
//         alignItems: 'center',

//     },
//     inActiveFilterIcon: {
//         position: 'absolute',
//         right: 0,
//         paddingRight: 10,
//         height: "100%",
//         justifyContent: 'center'
//     },
//     activeFilterIcon: {
//         position: 'absolute',
//         right: 0,
//         height: 35,
//         width: 35,
//         backgroundColor: '#FFFFFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 35 / 2
//     },
//     filterItems: {
//         width: 105,
//         height: 30,
//         backgroundColor: '#340057',
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: 10,
//         marginTop: 13
//     },
//     filterItemsLabel: {
//         fontFamily: 'LR',
//         fontSize: 12,
//         color: '#FFFFFF',
//         lineHeight: 15,
//     },
//     rangeTextInput: {
//         width: 138,
//         height: 35,
//         backgroundColor: '#000000',
//         borderRadius: 8,
//         color: "#FFFFFF",
//         fontFamily: 'LR',
//         paddingLeft: 20
//     }
// })

// export default Seller
