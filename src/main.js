import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router/router'

import store from '@/store/index'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
  
}).$mount('#app')


router.beforeEach((to,from,next)=>{
  NProgress.start();
  //判断当前是否已经登录
  next();
})
router.afterEach(()=>{
  NProgress.done();
})
