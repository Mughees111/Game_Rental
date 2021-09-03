import React, { useState,useCallback } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, FlatList, Modal, Dimensions } from 'react-native'
import { PickerArrowDown } from './SvgIcons';

const Picker = (props) => {

    const {width, height} = Dimensions.get('window');
    const [pickerActive, setPickerActive] = useState(false)
    const [position, setPosition] = useState()
    const [yOffset, setYOffset] = useState(height)
    const [xOffset, setXOffset] = useState()
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const pickerBorderRadius = props.pickerStyle.borderRadius ? props.pickerStyle.borderRadius : 0
    const [title, setTitle] = useState(props.title)
    

    const RenderPicker = () => (
        
        <Modal
            visible={pickerActive}
            transparent={true}
            animationType="slide"
            onRequestClose={()=>{
                setPickerActive(false)
            }}
        >
            
            <View style={[{ marginTop:  yOffset-5 ,height : height-yOffset < 250 ? height : null,  marginLeft: xOffset, width: props.pickerStyle.width, backgroundColor: props.pickerStyle.backgroundColor,borderTopRightRadius:pickerBorderRadius, borderTopLeftRadius:pickerBorderRadius}]}>
                <TouchableOpacity
                    onPress={() => {
                        setPickerActive(false)
                    }}
                    style={[props.pickerStyle, styles.picker, 
                        // { elevation:1,shadowOffset:{width: 0.1,height:0.1},shadowRadius:0.5,shadowOpacity:0.7 }
                    ]}
                >
                    <Text style={[props.titleStyle]}>{props.title}</Text>
                    <View style={{ marginRight: 10 }}>
                        {!pickerActive ? <PickerArrowDown /> : <PickerArrowDown />}
                    </View>
                </TouchableOpacity>
                {/* <View style={{width: "100%",height:0.5,backgroundColor: "grey",elevation:4}}></View> */}
                <FlatList
                    data={props.pickerData}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{marginTop:10}}
                    renderItem={({item})=>(
                        <TouchableOpacity 
                            onPress={ ()=>{
                                // props.title = item.value
                                setTitle(item.value)
                                props.onPress ? props.onPress(item.key) : null
                                setPickerActive(false)
                                
                            }}
                            style={styles.pickerList}>
                            <Text style={props.textStyle}>{item.value}</Text>
                        </TouchableOpacity>

                    )}
                />

            </View>
        </Modal>
    )
    


    return (
        <View>
            <TouchableOpacity
                ref={view => setPosition(view)}
                onPress={props.onClick, () => {
                    position.measure((fx, fy, width, height, px, py) => {
                        setYOffset(py)
                        setXOffset(px)
                    })
                    setPickerActive(!pickerActive)

                }}
                style={[styles.picker,props.pickerStyle]}
            >
                <Text style={[props.titleStyle]}>{title}</Text>
                <View style={{ marginRight: 10 }}>
                    {!pickerActive ? <PickerArrowDown /> : <PickerArrowDown />}
                </View>
            </TouchableOpacity>
            <RenderPicker />
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0
    },
    pickerList: {
        width: "100%",
        paddingLeft:10,
        borderBottomWidth:0.5,
        borderColor:'grey',
        paddingVertical:10,

    }
})

// fontSize: 15, fontFamily: 'RMe', lineHeight: 18
export default Picker
