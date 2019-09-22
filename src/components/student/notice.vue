<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通知公告</span>
            </div>
            <div class="flex">
                <div v-for="item in fileList" :key="item.id" class="list">
                    <div >{{ item.name }}</div>
                    <div>
                        <el-button type="primary" size="mini" @click="down(item.name)">下载</el-button>
                        <el-button type="success" size="mini" v-if="item.status == 1">已通过</el-button>
                        <el-button type="info" size="mini" v-else-if="item.status == 0">待审核</el-button>
                        <el-button type="danger" size="mini" v-else>被驳回</el-button>
                    </div>
                </div>
                <div  class="no" v-if="fileList.length <= 0">  暂无消息  </div>
            </div>
        
        </el-card>
    </div>
</template>


<script>
import { getFailExamineFile } from '@/api/student'  
export default {
    name:"notice",
    data(){
        return {
            fileList:[]
        }
    },
    methods:{
        getFailExamineFile(){
            getFailExamineFile().then(res=>{
                if(res.data.code != 1){
                    this.$message({
                        type:"error",
                        message:"网络异常，请重新登录"
                    })
                    return;
                }

                this.fileList = res.data.returnData;
            })
        }
    },
    created(){
        this.getFailExamineFile();
    }
}
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  .flex>div.list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin:10px 0;
  }

  .no {
    color: #DFE1E5;
    text-align: center;
    font-size: 15px;
  }
}
</style>
