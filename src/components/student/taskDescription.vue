<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的课题任务书</span>
      </div>
      <div class="flex">
        <div  class="list"  v-if="file">
          <div>{{ file.name }}</div>
          <div>
            <el-button type="primary" size="mini" @click="down">下载</el-button>
          </div>
        </div>
        <div class="no" v-if="!file">啥也没有！</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getTeacherUploadFile,downTeacherUploadFile } from "@/api/student";
export default {
  data() {
    return {
      file:{}
    };
  },
  methods: {
    down() {
      downTeacherUploadFile({
        type:2
      }).then(res => {
        console.log(res.data);
        const blob = new Blob([res.data]);
        const fileName = this.file.url.substring(this.file.url.lastIndexOf("\\")+1);
        const linkNode = document.createElement("a");
        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = "none";
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click(); //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
      });
    },
    getTeacherUploadFile(){
      getTeacherUploadFile({
        type:2
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
          return 
        }
        this.file = res.data.returnData;
      })
    }
  },
  created() {
    this.getTeacherUploadFile();
  }
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  .flex>div.list {
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