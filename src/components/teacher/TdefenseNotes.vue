<template>
  <div class="wrapper">
    <!-- 上传答辩记录 -->
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
      <el-button slot="trigger" size="small" type="primary" :disabled="btndisabled">上传答辩记录</el-button>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
    </el-upload>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>答辩记录表</span>
      </div>
      <div class="flex">
        <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.name }}</div>
          <div>
            <el-button type="primary" size="mini" @click="down">下载</el-button>
          </div>
        </div>
        <div v-if="fileList.length <= 0" class="no">啥也没有！</div>
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
      configuration: {
        autoUpload: false,
        multiple: false,
        limit: 1,
        data: {
          type: 1
        }, //上传的额外的参数
        name: "file", //上传的文件的名字
        withCredentials: true,
        action: ".xls",
        file: {},
        showFileList: false
      },
      fileList: [
        {
          name: "学生一的答辩记录表.doc"
        },
        {
          name: "学生二的答辩记录表.doc"
        }
      ],
      btndisabled: false
    };
  },
  methods: {
    //获取上传文件的信息
    change(file) {
      this.configuration.file = file;
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
          this.configuration.file = "";
          console.log("-----------");
        });
    },
    // 上传文件
    submitUpload() {
      const that = this;
      const formData = new FormData();
      formData.append("file", this.configuration.file.raw);
      uploadStudentFile({
        formData,
        type: 1
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
        this.getMyReportFile();
      });
      //this.$refs.upload.submit();
    },
    //获取我上传的文件信息
    getMyReportFile() {
      //获取当前学号
      const year = this.$store.state.userInfo.username.substring(0, 4);
      getStudentFileInfo({
        fileName: `附件1 吕梁学院${year}届毕业论文（设计）开题报告.doc`
      }).then(res => {
        if (res.data.code != 1) {
          this.$message({
            type: "error",
            message: "网络异常，加载失败"
          });
          return;
        }
        //加载成功
        this.myReportFile = res.data.returnData;
        if (this.myReportFile.status == 1) {
          this.btndisabled = true;
        } else {
          this.btndisabled = false;
        }

        // this.getMyReportFile();
      });
    },
    down() {
      downloadStudentFile({
        fileName: this.myReportFile.name
      }).then(res => {
        const blob = new Blob([res.data]);
        const fileName = this.myReportFile.name;
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
    this.getMyReportFile();
  }
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  .flex> div.list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
	margin: 10px 0;
  }

  .no {
    color: #dfe1e5;
    margin: 0 auto;
    font-size: 15px;
  }
}
</style>