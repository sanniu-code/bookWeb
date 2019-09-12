<template>
    <div class="wrapper">
        <el-menu  class="el-menu-vertical-demo"  :collapse="isCollapse"
            @select="select"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">选题阶段</span>
                </template>
                <el-menu-item index="test">选择题目</el-menu-item>
                <el-menu-item index="test1">我的题目</el-menu-item>

            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">开题阶段</span>
                </template>
                <el-menu-item index="test2">查看课题申请表</el-menu-item>
                <el-menu-item index="test3">我的开题要求</el-menu-item>
                <el-menu-item index="2-3">上传开题报告</el-menu-item>

            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">中期工作</span>
                </template>
                <el-menu-item index="3-1">上传知道记录</el-menu-item>
                <el-menu-item index="3-2">上传中期报告</el-menu-item>
                <el-menu-item index="3-3">上传工作中期检查表</el-menu-item>

            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">后期工作</span>
                </template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项1</el-menu-item>
                <el-menu-item index="4-3">选项1</el-menu-item>
                <el-menu-item index="4-4">选项1</el-menu-item>

            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">中期工作</span>
                </template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项1</el-menu-item>
                <el-menu-item index="5-3">选项1</el-menu-item>
                <el-menu-item index="5-4">选项1</el-menu-item>

            </el-submenu>
            <el-menu-item index="6">
                <i class="el-icon-setting"></i>
                <span slot="title">相关资料</span>
            </el-menu-item>

            <el-menu-item index="7">
                <i class="el-icon-setting"></i>
                <span slot="title">个人资料</span>
            </el-menu-item>
            
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
      return {
        isCollapse: false,
        
      };
    },
    methods: {
        select(index,indexPath){

            if(this.$route.name == index ) return;
            this.$router.push({ name:index })
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
