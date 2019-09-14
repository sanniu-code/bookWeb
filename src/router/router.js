import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

export default new VueRouter({
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
                    redirect:{ name:"choseSubject" }
                },
                {
                    path:"choseSubject",
                    component:()=>import("@/components/choseSubject.vue"),
                    name:"choseSubject",
                },
                {
                    path:"mySubject",
                    component:()=>import("@/components/mySubject.vue"),
                    name:"mySubject",
                }

            ]
        }
    ]
})