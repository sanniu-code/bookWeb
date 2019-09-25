<template>
  <div class="wrapper">
    <!-- 审核学生论文查重率 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>学生论文查重率</span>
      </div>
      <div class="flex">
       <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.url.substring(item.url.lastIndexOf("\\")+1) }}</div>
          <div>
            <el-button type="primary" size="mini" @click="downStudentFile(item)">下载</el-button>
            <el-button type="success" size="mini" v-if="item.status == 0" @click="examineStudentFile(item.id,1)">通过</el-button>
            <el-button type="danger" size="mini" v-if="item.status == 0" @click="examineStudentFile(item.id,2)">驳回</el-button>
            <el-button type="danger" size="mini" v-if="item.status == 1">已通过</el-button>
            <el-button type="danger" size="mini" v-if="item.status == 2">已驳回</el-button>
          </div>
        </div>
        <div v-if="fileList.length <= 0" class="no">啥也没有！</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getStudentFileInfo,
  examineStudentFile,
  downStudentFile
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
        type:4
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
    //审核
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
    },
    //下载学生文件
    downStudentFile(d){
      downStudentFile(d).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = d.url.substring(d.url.lastIndexOf("\\")+1);
        const linkNode = document.createElement("a");
        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = "none";
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click(); //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
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
  .flex >div.list{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }

  .no {
    color: #dfe1e5;
    margin: 0 auto;
    text-align: center;
    font-size: 15px;
  }
}
</style>