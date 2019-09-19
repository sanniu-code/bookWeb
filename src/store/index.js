import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

import student from './modules/student'
import teacher from './modules/teacher'

import createPersiste from 'vue-savedata'

export default new Vuex.Store({
    modules:{
        student,
        teacher
    },
    plugins:[createPersiste()]
})