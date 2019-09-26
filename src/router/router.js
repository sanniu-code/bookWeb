import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)



const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: { path: "/index" }
        },
        {
            path: "/login",
            component: () => import("@/page/login.vue"),
            name: "login",
            meta: {
                requireAuth: false
            }
        },
        {
            path: "/index",
            component: () => import("@/page/index.vue"),
            children: [
                {
                    path: '',
                    redirect: { name: "relativeData" }
                },
                {
                    path: "relativeData",
                    component: () => import("@/components/common/relativeData.vue"),
                    name: "relativeData",
                    meta: {
                        requireAuth: true,
                        pathName: "相关资料"
                    }
                },

                /*     学生的 路由 */
                {
                    path: "stuNotice",
                    component: () => import("@/components/student/stuNotice.vue"),
                    name: "stuNotice",
                    meta: {
                        requireAuth: true,
                        pathName: "通知公告"
                    }
                },
                {
                    path: "choseSubject",
                    component: () => import("@/components/student/choseSubject.vue"),
                    name: "choseSubject",
                    meta: {
                        requireAuth: true,
                        pathName: "选题"
                    }
                },
                {
                    path: "mySubject",
                    component: () => import("@/components/student/mySubject.vue"),
                    name: "mySubject",
                    meta: {
                        requireAuth: true,
                        pathName: "我的课题"
                    }
                },
                // {
                //     path:"checkApplicationForm",
                //     component:()=>import("@/components/student/checkApplicationForm.vue"),
                //     name:"checkApplicationForm",
                // },
                {
                    path: "uploadProposal",
                    component: () => import("@/components/student/uploadProposal.vue"),
                    name: "uploadProposal",
                    meta: {
                        requireAuth: true,
                        pathName: "开题报告"
                    }
                },
                {
                    path: "taskDescription",
                    component: () => import("@/components/student/taskDescription.vue"),
                    name: "taskDescription",
                    meta: {
                        requireAuth: true,
                        pathName: "我的任务书"
                    }
                },

                {
                    path: "interimReport",
                    component: () => import("@/components/student/interimReport.vue"),
                    name: "interimReport",
                    meta: {
                        requireAuth: true,
                        pathName: "中期报告"
                    }
                },
                {
                    path: "defenseNotes",
                    component: () => import("@/components/student/defenseNotes.vue"),
                    name: "defenseNotes",
                    meta: {
                        requireAuth: true,
                        pathName: "答辩记录"
                    }
                },



                {
                    path: "scoreSheet",
                    component: () => import("@/components/student/scoreSheet.vue"),
                    name: "scoreSheet",
                    meta: {
                        requireAuth: true,
                        pathName: "答辩评分表"
                    }
                },
                {
                    path: "formatReviewReport",
                    component: () => import("@/components/student/formatReviewReport.vue"),
                    name: "formatReviewReport",
                    meta: {
                        requireAuth: true,
                        pathName: "论文格式查重"
                    }
                },
                {
                    path: "paperReviewRate",
                    component: () => import("@/components/student/paperReviewRate.vue"),
                    name: "paperReviewRate",
                    meta: {
                        requireAuth: true,
                        pathName: "论文查重率"
                    }
                },
                {
                    path: "paper",
                    component: () => import("@/components/student/paper.vue"),
                    name: "paper",
                    meta: {
                        requireAuth: true,
                        pathName: "论文"
                    }
                },
                /*   教师的路由 */
                {
                    path: "tSubject",
                    component: () => import("@/components/teacher/tSubject.vue"),
                    name: "tSubject",
                    meta: {
                        requireAuth: true,
                        pathName: "我的课题"
                    }
                },
                {
                    path: "checkStuSubject",
                    component: () => import("@/components/teacher/checkStuSubject.vue"),
                    name: "checkStuSubject",
                    meta: {
                        requireAuth: true,
                        pathName: "查看学生课题"
                    }
                },
                {
                    path: "checkStuProposal",
                    component: () => import("@/components/teacher/checkStuProposal.vue"),
                    name: "checkStuProposal",
                    meta: {
                        requireAuth: true,
                        pathName: "查看学生开题报告"
                    }
                },
                {
                    path: "TinterimReport",
                    component: () => import("@/components/teacher/TinterimReport.vue"),
                    name: "TinterimReport",
                    meta: {
                        requireAuth: true,
                        pathName: "中期报告"
                    }
                },

                {
                    path: "applySubject",
                    component: () => import("@/components/teacher/applySubject.vue"),
                    name: "applySubject",
                    meta: {
                        requireAuth: true,
                        pathName: "申请课题"
                    }
                },
                //上传指导记录表
                {
                    path: "uploadGuideForm",
                    component: () => import("@/components/teacher/uploadGuideForm.vue"),
                    name: "uploadGuideForm",
                    meta: {
                        requireAuth: true,
                        pathName: "指导记录表"
                    }
                },
                //上传中期检查表
                {
                    path: "interimChecklist",
                    component: () => import("@/components/teacher/interimChecklist.vue"),
                    name: "interimChecklist",
                    meta: {
                        requireAuth: true,
                        pathName: "中期检查表"
                    }
                },
                //上传答辩记录
                {
                    path: "TdefenseNotes",
                    component: () => import("@/components/teacher/TdefenseNotes.vue"),
                    name: "TdefenseNotes",
                    meta: {
                        requireAuth: true,
                        pathName: "答辩记录表"
                    }
                },
                //小组评分表上传
                {
                    path: "TgroupScoreSheet",
                    component: () => import("@/components/teacher/TgroupScoreSheet.vue"),
                    name: "TgroupScoreSheet",
                    meta: {
                        requireAuth: true,
                        pathName: "小组评分表"
                    }
                },
                //成绩评定表上传
                {
                    path: "TscoreSheet",
                    component: () => import("@/components/teacher/TscoreSheet.vue"),
                    name: "TscoreSheet",
                    meta: {
                        requireAuth: true,
                        pathName: "成绩评定表"
                    }
                },
                {
                    path: "TformatReviewReport",
                    component: () => import("@/components/teacher/TformatReviewReport.vue"),
                    name: "TformatReviewReport",
                    meta: {
                        requireAuth: true,
                        pathName: "论文格式查重"
                    }
                },
                {
                    path: "TpaperReviewRate",
                    component: () => import("@/components/teacher/TpaperReviewRate.vue"),
                    name: "TpaperReviewRate",
                    pathName: "论文查重率"
                },
                {
                    path: "Tpaper",
                    component: () => import("@/components/teacher/Tpaper.vue"),
                    name: "Tpaper",
                    meta: {
                        requireAuth: true,
                        pathName: "论文"
                    }
                },
                //老师上传课题任务书
                {
                    path: "uploadTaskDesc",
                    component: () => import("@/components/teacher/uploadTaskDesc.vue"),
                    name: "uploadTaskDesc",
                    meta: {
                        requireAuth: true,
                        pathName: "课题任务书"
                    }
                },
                {
                    path: "teaNotice",
                    component: () => import("@/components/teacher/teaNotice.vue"),
                    name: "teaNotice",
                    meta: {
                        requireAuth: true,
                        pathName: "通知公告"
                    }
                },

                /*   管理员的路由 */
                {
                    path: "tInfoManagement",
                    component: () => import("@/components/leader/tInfoManagement.vue"),
                    name: "tInfoManagement",
                    meta: {
                        requireAuth: true,
                        pathName: "教师信息"
                    }
                },
                {
                    path: "sInfoManagement",
                    component: () => import("@/components/leader/sInfoManagement.vue"),
                    name: "sInfoManagement",
                    meta: {
                        requireAuth: true,
                        pathName: "学生信息"
                    }
                },
                {
                    path: "groupManagement",
                    component: () => import("@/components/leader/groupManagement.vue"),
                    name: "groupManagement",
                    meta: {
                        requireAuth: true,
                        pathName: "班级管理"
                    }
                },
                {
                    path: "professionManagement",
                    component: () => import("@/components/leader/professionManagement.vue"),
                    name: "professionManagement",
                    meta: {
                        requireAuth: true,
                        pathName: "专业管理"
                    }
                }
            ]
        }
    ]
})


export default router;