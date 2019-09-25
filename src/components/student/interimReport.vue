<template>
  <div class="wrapper">
    <!-- 上传中期报告 -->
    <el-upload
      class="upload-demo"
      ref="upload"
      :multiple="configuration.multiple"
      :limit="configuration.limit"
      :action="configuration.action"
      :with-credentials="configuration.withCredentials"
      :auto-upload="configuration.autoUpload"
      :data="configuration.data"
      :name="configuration.name"
      :on-change="change"
      :show-file-list="configuration.showFileList"
      :disabled="btndisabled"
    >
      <el-button slot="trigger" size="small" type="primary" :disabled="btndisabled">上传中期报告</el-button>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
    </el-upload>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>中期报告</span>
      </div>
      <div class="flex" >
        <div  class="list" v-if="file.url">
          <div>{{ file.url.substring(file.url.lastIndexOf("\\")+1) }}</div>
          <div>
            <el-button type="primary" size="mini" @click="down">下载</el-button>
            <el-button type="primary" size="mini"  v-if="file.status == 0">待审核</el-button>
            <el-button type="primary" size="mini"  v-else-if="file.status == 2">已驳回</el-button>
            <el-button type="primary" size="mini"  v-else>已通过</el-button>
          </div>
        </div>
        <div v-if="!file.url" class="no">啥也没有！</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  uploadStudentFile,
  getStudentFileInfo,
  downloadStudentFile
} from "@/api/student.js";
export default {
  data() {
    return {
      configuration: {
        autoUpload: false,
        multiple: false,
        limit: 1,
        withCredentials: true,
        action: "",
        showFileList: false
      },
      file:{},
      btndisabled: false
    };
  },
  methods: {
    getStudentFileInfo(){
      getStudentFileInfo({
        type:2
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:"fail",
            message:"网络异常"
          })
          return
        }
        this.file = res.data.returnData;
        if (this.file && this.file.status == 1) {
          this.btndisabled = true;
        } else {
          this.btndisabled = false;
        }
      })
    },
    init(){
      this.getStudentFileInfo();
    },


    //获取上传文件的信息
    change(file) {
      this.file = file;
      this.$confirm("确定上传指导记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.submitUpload();
        })
        .catch(() => {
          this.file = "";
        });
    },
    // 上传文件
    submitUpload() {
      const formData = new FormData();
      formData.append("file", this.file.raw);
      uploadStudentFile({
        formData,
        type: 2
      }).then(res => {
        if (res.data.code != 1) {
          this.$message({
            type: "error",
            message: "上传失败，请重新上传"
          });
          return;
        }

        this.$message({
          type: "success",
          message: "上传成功"
        });
        //重新加载
        this.init();
      });

    },
    //获取我上传的文件信息
    
    down() {
      downloadStudentFile({
        type:2
      }).then(res => {
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
        // if(res.data.code != 1){
        //   this.$message({
        //     type:"error",
        //     message:"网络异常，下载失败"
        //   })
        // }
      });
    }
  },
  created() {
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
    margin: 0 auto;
    text-align: center;
    font-size: 15px;
  }
}
</style>