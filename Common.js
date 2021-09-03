import { BehaviorSubject } from 'rxjs';

const loggedInObservable = new BehaviorSubject(0);
const loggedInVendorObservable = new BehaviorSubject(0);
const selectionObservable = new BehaviorSubject(0);



const changeLoggedIn = {
    changeNow: function(t){
        loggedInObservable.next(t)
    }
}



const changeLoggedInVendor = {
    changeNow: function(t){
        loggedInVendorObservable.next(t)
    }
}


const changeSelection = {
    changeNow: function(t){
        selectionObservable.next(t)
    }
}


export {
    loggedInObservable,
    changeLoggedIn,
    selectionObservable,
    changeSelection,
    loggedInVendorObservable,
    changeLoggedInVendor
}