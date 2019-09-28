<template>
  <div class="wrapper">
    <el-menu class="el-menu-vertical-demo" :collapse="configuration.isCollapse"  :default-active="configuration.defaultActive"
      :router="configuration.menuRouter"
      :unique-opened="configuration.menuUO"
    >
      
      <el-submenu :index="k.path" v-for="k in $store.state.menu" :key="k.id" v-if="k.menus != null">
        <template slot="title" >
          <i class="el-icon-location"></i>
          <span slot="title">{{ k.name }}</span>
        </template>
        <el-menu-item :index="l.path"
          v-for="l in k.menus"
          :key="l.path"
        >{{ l.name }}</el-menu-item>
      </el-submenu>
      <el-menu-item :index="item.path" v-for="item in $store.state.menu" :key="item.id" v-if="item.menus == null">
          <i class="el-icon-warning" ></i>
          <span slot="title" >{{ item.name }}</span>
      </el-menu-item>
      
      
      
      
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configuration: {
        menuRouter: true,
        menuUO: true,
        defaultActive: "1",
        isCollapse: false
      }
    };
  },
  methods: {
  },
  created() {
    this.configuration.defaultActive = this.$route.name;
  }
};
</script>


<style lang="less" scoped>
.wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 100px;
  overflow: auto;
  border-right: solid 1px #e6e6e6;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: 0px;
}

.wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 0px; /*高宽分别对应横竖滚动条的尺寸*/

  height: 1px;
}
</style>
