<template>
  <div class="wrapper">
    <el-button type="primary" size="small" @click="changeStatu(1)">录入课题信息</el-button>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="title" label="课题名称" width="280"></el-table-column>
      <el-table-column align="center" prop="type" label="课题类型" width="80"></el-table-column>
      <el-table-column align="center" prop="origin" label="课题来源" width="80"></el-table-column>
      <el-table-column align="center" prop="address" label="完成地点" width="80"></el-table-column>
      <el-table-column align="center" prop="detail" label="课题简介"></el-table-column>
      <el-table-column align="center" prop="operae" label="操作" width="160">
        <template>
          <el-button type="primary" size="mini" @click="changeStatu(2)">查看</el-button>
          <el-button type="success" size="mini" @click="changeStatu(3)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="课题详情"
      :visible.sync="dialogFormVisible"
      width="40%"
      top="4vh"
      lock-scroll="false"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
    >
      <el-form :model="form">
        <el-form-item label="课题名称 :" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课题类型 :" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择课题类型" :disabled="readonly">
            <el-option label="设计" value="1"></el-option>
            <el-option label="论文" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课题来源 :" :label-width="formLabelWidth">
          <el-select v-model="form.origin" placeholder="请选择课题来源" :disabled="readonly">
            <el-option label="设计" value="1"></el-option>
            <el-option label="论文" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课题完成地点 :" :label-width="formLabelWidth">
          <el-select v-model="form.address" placeholder="请选择完成地点" :disabled="readonly">
            <el-option label="校内" value="1"></el-option>
            <el-option label="校外" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课题详情 :" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.detail"
            auto-complete="off"
            rows="8"
            resize="none"
            :readonly="readonly"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传课题申请表 :" :label-width="formLabelWidth">
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
            <el-button slot="trigger" size="small" type="primary" :disabled="btndisabled">上传课题申请表</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
          name: "1111"
        },
        {
          name: "11112"
        }
      ],
      myReportFile: { name: "我的课题申请表（死数据占位）.doc" },
      btndisabled: false,
      //弹框的配置
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      readonly: true,
      //表格的数据
      tableData: [
        {
          title: "111",
          type: "",
          origin: "",
          address: "",
          detail: "哈哈哈哈哈哈哈哈哈哈或或或"
        }
      ],
      //弹框的数据
      form: {
        title: "111",
        type: "1",
        detail: "哈哈哈哈哈哈哈哈哈哈或或或"
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    //获取上传文件的信息
    change(file) {
      this.configuration.file = file;
      this.$confirm("确定上传开题报告?", "提示", {
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
    },

    created() {
      this.getMyReportFile();
    },
    changeStatu(type) {
      this.dialogFormVisible = true;
      console.log(type);
      if (type == 1) {
        this.readonly = false;
      } else if (type == 2) {
        this.readonly = true;
      } else {
        this.readonly = false;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.el-table--border {
  margin-top: 20px;
  padding-bottom: 0px;
}
/deep/ .el-dialog__body {
  padding-bottom: 0;
}
/deep/ .el-dialog {
  margin-bottom: 0;
}
/deep/ .el-select{
  display: block;
}
</style>