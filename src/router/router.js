import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)



const router =  new VueRouter({
    mode:'history',
    routes:[
        {
            path:"/",
            redirect:{ name:"index" }
        },
        {
            path:"/login",
            component:()=>import("@/page/login.vue"),
            name:"login",
            meta:{
                requireAuth:false
            }
        },
        {
            path:"/index",
            component:()=>import("@/page/index.vue"),
            children:[
                {
                    path:'',
                    redirect:{ name:"notice" }
                },                
                {
                    path:"relativeData",
                    component:()=>import("@/components/common/relativeData.vue"),
                    name:"relativeData",
                },

                /*     学生的 路由 */
                {
                    path:"notice",
                    component:()=>import("@/components/student/notice.vue"),
                    name:"notice",
                    meta:{
                        requireAuth:true,
                    }
                },
                {
                    path:"choseSubject",
                    component:()=>import("@/components/student/choseSubject.vue"),
                    name:"choseSubject",
                },
                {
                    path:"mySubject",
                    component:()=>import("@/components/student/mySubject.vue"),
                    name:"mySubject",
                },
                {
                    path:"checkApplicationForm",
                    component:()=>import("@/components/student/checkApplicationForm.vue"),
                    name:"checkApplicationForm",
                },
                {
                    path:"uploadProposal",
                    component:()=>import("@/components/student/uploadProposal.vue"),
                    name:"uploadProposal",
                },
                {
                    path:"taskDescription",
                    component:()=>import("@/components/student/taskDescription.vue"),
                    name:"taskDescription",
                },
                {
                    path:"uploadGuideForm",
                    component:()=>import("@/components/student/uploadGuideForm.vue"),
                    name:"uploadGuideForm",
                },
                {
                    path:"interimReport",
                    component:()=>import("@/components/student/interimReport.vue"),
                    name:"interimReport",
                },
                {
                    path:"interimChecklist",
                    component:()=>import("@/components/student/interimChecklist.vue"),
                    name:"interimChecklist",
                },
                {
                    path:"defenseNotes",
                    component:()=>import("@/components/student/defenseNotes.vue"),
                    name:"defenseNotes",
                },
                {
                    path:"groupScoreSheet",
                    component:()=>import("@/components/student/groupScoreSheet.vue"),
                    name:"groupScoreSheet",
                },
                {
                    path:"ScoreSheet",
                    component:()=>import("@/components/student/ScoreSheet.vue"),
                    name:"ScoreSheet",
                },
                {
                    path:"formatReviewReport",
                    component:()=>import("@/components/student/formatReviewReport.vue"),
                    name:"formatReviewReport",
                },
                {
                    path:"paperReviewRate",
                    component:()=>import("@/components/student/paperReviewRate.vue"),
                    name:"paperReviewRate",
                },
                {
                    path:"paper",
                    component:()=>import("@/components/student/paper.vue"),
                    name:"paper",
                },
                /*   教师的路由 */
                {
                    path:"tSubject",
                    component:()=>import("@/components/teacher/tSubject.vue"),
                    name:"tSubject",
                },
                {
                    path:"checkStuSubject",
                    component:()=>import("@/components/teacher/checkStuSubject.vue"),
                    name:"checkStuSubject",
                },
                {
                    path:"checkStuProposal",
                    component:()=>import("@/components/teacher/checkStuProposal.vue"),
                    name:"checkStuProposal",
                }
                
            ]
        }
    ]
})


export default router;