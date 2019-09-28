<template>
    <div>
        <Header />
        <Sider />
        <div>
            <div class="breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path:'/index' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{  }">{{ pathName }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="content">
                <router-view />
            </div>

        </div>
    </div>    
</template>

<script>
import Header from '@/components/common/header'

import Sider from '@/components/common/sider'
export default {
    name:"index",
    components:{
        Header,
        Sider
    },
    data(){
        return {
            pathName:""
        }
    },
    watch:{
        $route(a){
            this.pathName = a.meta.pathName;
            //console.log(a);
        }
    },
    created(){
        this.pathName = this.$route.meta.pathName;
    }
}
</script>

<style lang="less" scoped>

    .breadcrumb {
        position: fixed;
        top: 100px;
        left: 200px;
        right: 0;
        padding: 10px 20px;
        height: 40px;   
        box-sizing: border-box;
    }
    .content {
        position:fixed;
        left: 200px;
        right: 0;
        bottom: 0;
        top: 130px;
        padding: 10px 20px;
        box-sizing: border-box;
        overflow-y: auto;
        
        
    }
</style>


