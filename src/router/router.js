import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:"/",
            directive:{ name:"index" }
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
            name:"index",
            meta:{
                requireAuth:true
            }
        }
    ]
})