import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

import student from './modules/student'
import leader from './modules/leader'
import teacher from './modules/teacher'

import createPersiste from 'vue-savedata'

import TYPE from './variable'
// import storage from '@/utils/storage'

export default new Vuex.Store({
    state:{
        userInfo:null,
        menu:null,

    },
    getters:{},
    mutations:{
        [TYPE.USER_INFO](state,info){
            state.userInfo = info;
            

        },
        [TYPE.LOGIN_OUT](state){
            state.userInfo = null;
            state.menu = null;
            state.leader.taskInfo = null;
        },
        [TYPE.USER_MENU](state,info){
            state.menu = info;
        },

    },
    actions:{},
    modules:{
        student,
        teacher,
        leader
    },
    plugins:[createPersiste()]
})