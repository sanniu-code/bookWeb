/*
    用于操作localstorage
*/

export default {
    getStorage(key){
        return window.localStorage.getItem(key);
    },
    setStorage(key,value){
        window.localStorage.setItem(key,value);
    },
    removeStorage(key){
        window.localStorage.removeStorage(key);
    }
}
