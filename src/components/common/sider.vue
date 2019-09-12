<template>
    <div class="wrapper">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项1</el-menu-item>
                <el-menu-item index="1-3">选项1</el-menu-item>
                <el-menu-item index="1-4">选项1</el-menu-item>

            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项1</el-menu-item>
                <el-menu-item index="4-3">选项1</el-menu-item>
                <el-menu-item index="4-4">选项1</el-menu-item>

            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
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


    .wrapper::-webkit-scrollbar {/*滚动条整体样式*/

        width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/

        height: 1px;

    }

    
</style>
