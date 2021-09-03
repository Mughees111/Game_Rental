// importing local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import SimpleAlert from './SimpleAlert';


// local storage function that retreives the data
async function retrieveItem(key) {
    try {
    const retrievedItem =  await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
    } catch (error) {
    console.log(error.message);
    }
    return
}


function  getStatusHelper(s){
    if(s==1) return "Pending";
    if(s==2) return "Cancelled by User";
    if(s==3) return "Accepted";
    if(s==4) return "Completed";
    if(s==5) return "Cancelled By Worker";
}


// store data in lcoalstorage
async function storeItem(key, item) {
    try {
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
}


//validing email
function validateEmail(text){
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {

        return false;
    }
    else {
        return true;
    }
}


// simple console log, so I can turn it off later
function doConsole(d){
    console.log(d)
}


// simple alert
function doAlertPlease(a,b,c)
{

    // let shown = true

    // return (
    //     <>
    //     {shown && <SimpleAlert
    //         Confirm={()=>{ shown = false}}
    //         title={b ?? "Alert"}
    //         text={c ?? "Error"}
    //         btn2="Okay"
    //     />}
    //     </>
    // )

    alert(c)
    

    
}


function timeZoneTry(timeNow){
    var tzo = -timeNow.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return dif + pad(tzo / 60) +':' + pad(tzo % 60);
}

// common Navigations

module.exports.storeItem = storeItem;
module.exports.retrieveItem = retrieveItem;
module.exports.doConsole = doConsole;
module.exports.validateEmail = validateEmail;
module.exports.doAlertPlease = doAlertPlease;
module.exports.timeZoneTry = timeZoneTry;
module.exports.getStatusHelper = getStatusHelper;


