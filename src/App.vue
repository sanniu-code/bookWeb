<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Login from '@/page/login.vue'

import Index from '@/page/index.vue'
import storage from '@/utils/storage'
export default {
  name: 'app',
  components: {
    Login,
    Index
  },
  created(){
    if(this.$store.state.userInfo == null){
      this.$router.replace({ name:"login" })
      return;
    }
    if(this.$store.state.userInfo.type == 3) {
      if(this.$store.state.leader.taskInfo == null){
        this.$router.replace({ name:"task" })
      }else {
       
        this.$router.replace({ path:"/index" })
      }
    }else {
       this.$router.replace({ path:"/index" })
    }
    //获取
    
  },
  watch:{
    $route(to,from){
      
      //console.log(to);
    }
  }
}
</script>

<style>

</style>
