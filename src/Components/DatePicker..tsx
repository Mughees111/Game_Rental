

import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



export const DatePicker = (props: Props) => {



    interface Props {
        onValueChange: (i) => void
    }



    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        if (selectedDate.getMonth() < 10) {
            const month = "0" + selectedDate.getMonth();
            if (selectedDate.getDate() < 10) {
                const dat = "0" + selectedDate.getDate();
                let date = selectedDate.getFullYear() + "-" + month + "-" + dat;
                props.onValueChange(date);
            }
            else {
                let date = selectedDate.getFullYear() + "-" + month + "-" + selectedDate.getDate()
                props.onValueChange(date);
            }



        }
        else {
            if (selectedDate.getDate() < 10) {
                const dat = "0" + selectedDate.getDate()
                let date = selectedDate.getFullYear() + "-" + selectedDate.getMonth() + "-" + dat
                props.onValueChange(date);
            }
            else {
                let date = selectedDate.getFullYear() + "-" + selectedDate.getMonth() + "-" + selectedDate.getDate()
                props.onValueChange(date);


            }

        }

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                maximumDate={new Date()}

                // is24Hour={true}
                display="spinner"
                onChange={onChange}
            />

        </View>
    );
};