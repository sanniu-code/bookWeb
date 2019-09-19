import STUDENT from './variable'
export default {
    namespaced:true,
    state:{
        studentInfo:"",
        subjectInfo:""
    },
    getters:{},
    mutations:{
        [STUDENT.STUDENT_INFO](state,info){
            state.studentInfo = info;
        },
        [STUDENT.SELECT_SUBJECT](state,info){
            state.subjectInfo = info;
        }
    },
    actions:{}
}