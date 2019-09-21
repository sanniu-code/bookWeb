import TYPE from '../variable'
export default {
    namespaced:true,
    state:{
        subjectInfo:""
    },
    getters:{},
    mutations:{
        [TYPE.SELECT_SUBJECT](state,info){
            state.subjectInfo = info;
        }
    },
    actions:{}
}