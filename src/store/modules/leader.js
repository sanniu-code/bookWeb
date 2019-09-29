import TYPE from '../variable'
export default {
    namespaced:true,
    state:{
        taskInfo:""
    },
    getters:{},
    mutations:{
        [TYPE.TASK_INFO](state,info){
            state.taskInfo = info;
        }
    },
    actions:{}
}