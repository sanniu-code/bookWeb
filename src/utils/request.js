import axios from 'axios'
import vue from 'vue'
vue.prototype.$axios = axios

const service =  axios.create({
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})

//携带cookie
service.defaults.withCredentials = true

//请求拦截
service.interceptors.request.use(config=>{
    //设置token
    //console.log(config);
    config.headers['token'] = '111';
    return config;
},error=>{
    return error;
})

//响应拦截
service.interceptors.response.use(response=>{
    return response;
},error=>{
    return error;
})

export default service;