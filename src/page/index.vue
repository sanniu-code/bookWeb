<template>
    <div>
        <Header />
        <Sider />
        <div>
            <div class="breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item >活动详情</el-breadcrumb-item>
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


