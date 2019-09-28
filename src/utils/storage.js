/*
    用于操作localstorage
*/

export default {
    getStorage(key){
        return window.sessionStorage.getItem(key);
    },
    setStorage(key,value){
        window.sessionStorage.setItem(key,value);
    },
    removeStorage(key){
        window.sessionStorage.removeStorage(key);
    }
}
