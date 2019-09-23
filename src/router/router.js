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
                // {
                //     path:"checkApplicationForm",
                //     component:()=>import("@/components/student/checkApplicationForm.vue"),
                //     name:"checkApplicationForm",
                // },
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
                    path:"interimReport",
                    component:()=>import("@/components/student/interimReport.vue"),
                    name:"interimReport",
                },
                {
                    path:"defenseNotes",
                    component:()=>import("@/components/student/defenseNotes.vue"),
                    name:"defenseNotes",
                },
                
               
                
                {
                    path:"scoreSheet",
                    component:()=>import("@/components/student/scoreSheet.vue"),
                    name:"scoreSheet",
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
                },
                {
                    path:"applySubject",
                    component:()=>import("@/components/teacher/applySubject.vue"),
                    name:"applySubject",
                },
                //上传指导记录表
                {
                    path:"uploadGuideForm",
                    component:()=>import("@/components/teacher/uploadGuideForm.vue"),
                    name:"uploadGuideForm",
                },
                //上传中期检查表
                {
                    path:"interimChecklist",
                    component:()=>import("@/components/teacher/interimChecklist.vue"),
                    name:"interimChecklist",
                },
                //上传答辩记录
                {
                    path:"TdefenseNotes",
                    component:()=>import("@/components/teacher/TdefenseNotes.vue"),
                    name:"TdefenseNotes",
                },
                //小组评分表上传
                {
                    path:"TgroupScoreSheet",
                    component:()=>import("@/components/teacher/TgroupScoreSheet.vue"),
                    name:"TgroupScoreSheet",
                },
                //成绩评定表上传
                {
                    path:"TscoreSheet",
                    component:()=>import("@/components/teacher/TscoreSheet.vue"),
                    name:"TscoreSheet",
                },
                {
                    path:"TformatReviewReport",
                    component:()=>import("@/components/teacher/TformatReviewReport.vue"),
                    name:"TformatReviewReport",
                },
                {
                    path:"TpaperReviewRate",
                    component:()=>import("@/components/teacher/TpaperReviewRate.vue"),
                    name:"TpaperReviewRate",
                },
                {
                    path:"Tpaper",
                    component:()=>import("@/components/teacher/Tpaper.vue"),
                    name:"Tpaper",
                },
                //老师上传课题任务书
                {
                    path:"uploadTaskDesc",
                    component:()=>import("@/components/teacher/uploadTaskDesc.vue"),
                    name:"uploadTaskDesc",
                },

                /*   管理员的路由 */
                // {
                //     path:"",
                //     component:()=>import("@/components/leader/.vue"),
                //     name:"",
                // },
            ]
        }
    ]
})


export default router;