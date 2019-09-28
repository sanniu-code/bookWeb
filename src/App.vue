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
    }
  }
}
</script>

<style>

</style>
