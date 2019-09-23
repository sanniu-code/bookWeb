<template>
  <div class="wrapper">
    <!-- 
	  查看学生开题报告
	  一个指导老师对应多个学生
	  查看   通过   驳回 三个按钮
    -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>学生开题报告</span>
      </div>
      <div class="flex">
        <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.name }}</div>
          <div>
            <el-button type="primary" size="mini" >下载</el-button>
            <el-button type="success" size="mini" v-if="item.status == 0" @click="examineStudentFile(item.id,1)">通过</el-button>
            <el-button type="danger" size="mini" v-if="item.status == 0" @click="examineStudentFile(item.id,2)">驳回</el-button>
            <el-button type="danger" size="mini" v-if="item.status == 1">已通过</el-button>
            <el-button type="danger" size="mini" v-if="item.status == 2">已驳回</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getStudentFileInfo,
  examineStudentFile
} from "@/api/teacher.js";
export default {
  data() {
    return {
      fileList: [
        
      ]
    };
  },
  methods: {
    getStudentFileInfo(){
      getStudentFileInfo({
        type:1
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
          return;
        }
        this.fileList = res.data.returnData;

      })
    },
    init(){
      this.getStudentFileInfo();
    },
    examineStudentFile(id,status){
      examineStudentFile({
        id,
        status
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:"fail",
            message:'网络异常'
          })
          return;
        }
        this.init();
      })
    }
  },
  created(){
    this.init();
  }
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  .flex > div.list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }

  .no {
    color: #dfe1e5;
    text-align: center;
    font-size: 15px;
  }
}
</style>