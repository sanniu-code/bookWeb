import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router/router'

import store from '@/store/index'

// router的拦截
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getMenu } from '@/api/user'

Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
  
}).$mount('#app')



router.beforeEach((to,from,next)=>{
  if(to.name == 'login'){
    if(from.name == 'task'){
      next({ name:"task" })
      return;
    }
    //没登录
    if(store.state.userInfo == null){  
      store.commit("LOGIN_OUT")  
      next();
    }else {   
      //有登陆的
      getMenu().then(res=>{
        if(res.data.code != 1){
          store.commit("LOGIN_OUT")
          next({ name:"login" })
        }else {
          //保存数据
          store.commit("USER_MENU",res.data.returnData)
          next({ name:"relativeData" });
        }
      }).catch(_=>{
        store.commit("LOGIN_OUT")
          next({ name:"login" })
        })
    }
    return;
  }
  if(to.name == 'task'){
    
    //判断有没有登录
    if(store.state.userInfo == null){
      next({ name:'login' })
      return
    }
    //判断是不是管理员
    if(store.state.userInfo.type != 3){
      next({ name:"relativeData" })
      return
    }
    //判断有没有那个有效任务
    if(store.state.leader.taskInfo != null){
      next({  name:"relativeData"  })
      return;
    }
    next();
    //通过
    return;
    
  }
  
  if(to.matched.some(recode=>recode.meta.requireAuth)){

    if(from.name == "task" && store.state.leader.taskInfo == null){
      next({ name:"task" })
      return;
    }
    //说明这个路由需要登录
    if(store.state.userInfo != null){  
    
      getMenu().then(res=>{
        if(res.data.code != 1){
          store.commit("LOGIN_OUT")
          next({ name:"login" })
        }else {     
          //保存数据     
          store.commit("USER_MENU",res.data.returnData)
          //next({ name:"relativeData" });
          next();
        }
      }).catch(_=>{
        store.commit("LOGIN_OUT")
        next({ name:"login" })
      })
      
      
      
    
    }else {
      store.commit("LOGIN_OUT")
      next({ name:"login" })
    }
  }
})
router.afterEach(()=>{
  NProgress.done();
})