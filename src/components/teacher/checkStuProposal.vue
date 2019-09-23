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
            <el-button type="primary" size="mini">下载</el-button>
            <el-button type="success" size="mini">通过</el-button>
            <el-button type="danger" size="mini">驳回</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  uploadStudentFile,
  downloadStudentFile,
  getStudentFileInfo
} from "@/api/student.js";
export default {
  data() {
    return {
      fileList: [
        {
          name: "111111"
        },
        {
          name: "222"
        }
      ]
    };
  },
  methods: {
    //获取上传文件的信息
    // change(file){
    //   this.configuration.file = file;
    //   this.$confirm('确定上传开题报告?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     center: true
    //   }).then(() => {
    //     this.getMyReportFile();
    //   }).catch(() => {
    //     this.configuration.file = "";
    //     console.log("-----------");
    //   });
    // },
    // // 上传文件
    // submitUpload() {
    //   const that = this
    //   const formData = new FormData();
    //   formData.append("file",this.configuration.file.raw);
    //   uploadStudentFile({
    //     formData,
    //     type:1
    //   }).then(res=>{
    //     if(res.data.code != 1){
    //       this.$message({
    //         type:'error',
    //         message:"上传失败，请重新上传"
    //       })
    //       return;
    //     }
    //     this.$message({
    //       type:"success",
    //       message:"上传成功"
    //     })
    //   })
    //   //this.$refs.upload.submit();
    // },
    // //获取我上传的文件信息
    // getMyReportFile(){
    //   //获取当前学号
    //   const year = this.$store.state.userInfo.username.substring(0,4);
    //   getStudentFileInfo({
    //     fileName:`附件1 吕梁学院${year}届毕业论文（设计）开题报告.doc`
    //   }).then(res=>{
    //     if(res.data.code != 1){
    //       this.$message({
    //         type:"error",
    //         message:"网络异常，加载失败"
    //       })
    //       return;
    //     }
    //     //加载成功
    //     this.myReportFile = res.data.returnData;
    //    // this.getMyReportFile();
    //   })
    // },
    // down(){
    //   downloadStudentFile({
    //     fileName:this.myReportFile.name
    //   }).then(res=>{
    //     const blob = new Blob([res.data]);
    //     const fileName = this.myReportFile.name;
    //     const linkNode = document.createElement('a');
    //     linkNode.download = fileName; //a标签的download属性规定下载文件的名称
    //     linkNode.style.display = 'none';
    //     linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
    //     document.body.appendChild(linkNode);
    //     linkNode.click();  //模拟在按钮上的一次鼠标单击
    //     URL.revokeObjectURL(linkNode.href); // 释放URL 对象
    //     document.body.removeChild(linkNode);
    //     // if(res.data.code != 1){
    //     //   this.$message({
    //     //     type:"error",
    //     //     message:"网络异常，下载失败"
    //     //   })
    //     // }
    //   })
    // }
  }
  // created(){
  //   this.getMyReportFile();
  // },
  // watch:{

  // }
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