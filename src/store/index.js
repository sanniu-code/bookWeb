import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

import student from './modules/student'
import teacher from './modules/teacher'

import createPersiste from 'vue-savedata'

import TYPE from './variable'

export default new Vuex.Store({
    state:{
        userInfo:null
    },
    getters:{},
    mutations:{
        [TYPE.USER_INFO](state,info){
            state.userInfo = info;
        },
        [TYPE.LOGIN_OUT](state){
            state.userInfo = {}
        }
    },
    actions:{},
    modules:{
        student,
        teacher
    },
    plugins:[createPersiste()]
})