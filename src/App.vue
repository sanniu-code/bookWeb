<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Login from '@/page/login.vue'

import Index from '@/page/index.vue'

export default {
  name: 'app',
  components: {
    Login,
    Index
  }
}
</script>

<style>

</style>
