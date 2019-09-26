<template>
  <div class="wrapper">
    <!-- 学生信息导入 -->
    <el-button slot="trigger" size="small" type="primary" @click="clickStatus(1)">添加信息</el-button>
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
      <el-button slot="trigger" size="small" type="primary" :disabled="btndisabled">从文件导入</el-button>

      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
    </el-upload>
    <el-table :data="tableData" stripe border style="width: 100%" class="box-table">
      <el-table-column align="center" prop="id" label="学号" width="200px"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="200px"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="100px">
        <template slot-scope="scope">{{ scope.row.sex == 1?"男":"女" }}</template>
      </el-table-column>
      <el-table-column align="center" prop="profession" label="专业" width="200px"></el-table-column>
      <el-table-column align="center" prop="group" label="班级" width="200px"></el-table-column>
      <el-table-column align="center" prop="year" label="入学年份" width="120px"></el-table-column>
      <el-table-column align="center" prop="period" label="学制" width="120px"></el-table-column>
      <el-table-column align="center" prop="operate" label="操作" >
        <template>
          <el-button type="primary" size="mini" @click="clickStatus(2)">修改</el-button>
          <!-- <el-button type="warning" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        :total="page.total"
      ></el-pagination>
    </div>
    <el-dialog
      title="学生信息"
      :visible.sync="dialogFormVisible"
      width="35%"
      top="6vh"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
    >
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-select v-model="form.profession" placeholder="请选择专业">
            <el-option label="计算机科学与技术" value="1"></el-option>
            <el-option label="软件工程" value="2"></el-option>
            <el-option label="大数据" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="form.group" placeholder="请选择班级">
            <el-option label="1601班" value="1"></el-option>
            <el-option label="1602班" value="2"></el-option>
            <el-option label="1603班" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份" :label-width="formLabelWidth">
          <el-select v-model="form.year" placeholder="请选择入学年份">
            <el-option label="2016年" value="1"></el-option>
            <el-option label="2017年" value="2"></el-option>
            <el-option label="2018年" value="2"></el-option>
            <el-option label="2019年" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学制" :label-width="formLabelWidth">
          <el-select v-model="form.period" placeholder="请选择学制">
            <el-option label="四年" value="1"></el-option>
            <el-option label="五年" value="2"></el-option>
          </el-select>
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
      formLabelWidth: "120px",
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
      myReportFile: {},
      btndisabled: false,
      page: {
        currentPage: 1, //当前页
        pageSize: 7, //每页的数据数量
        total: 0 //总页数
      },
      tableData: [
        {
          id: "20161103101",
          name: "蔡苗娜",
          sex: 2,
          profession: "计算机科学与技术",
          group: "1601班",
          year: "2016年",
          period: "4年"
        },
        {
          id: "20161103102",
          name: "曹丙男",
          sex: 1,
          profession: "计算机科学与技术",
          group: "1601班",
          year: "2016年",
          period: "4年"
        },
        {
          id: "20161103103",
          name: "曹存源",
          sex: 1,
          profession: "计算机科学与技术",
          group: "1601班",
          year: "2016年",
          period: "4年"
        },
        {
          id: "20161103105",
          name: "陈雨嘉",
          sex: 1,
          profession: "计算机科学与技术",
          group: "1601班",
          year: "2016年",
          period: "4年"
        },
        {
          id: "20161103106",
          name: "段犇",
          sex: 1,
          profession: "计算机科学与技术",
          group: "1601班",
          year: "2016年",
          period: "4年"
        },
        {
          id: "20161103107",
          name: "郭甜",
          sex: 2,
          profession: "计算机科学与技术",
          group: "1601班",
          year: "2016年",
          period: "4年"
        }
      ],
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      form: {
        id: "",
        name: "",
        sex: "",
        profession: "",
        group: "",
        year: "",
        period: ""
      },
      btnNumber: 0
    };
  },
  methods: {
    //获取数据列表
    getPageData() {
      let that = this;
      //清空原数组
      this.tableData = [];
      //调用接口
      getSubjects({
        pageSize: that.page.pageSize,
        pageNum: that.page.currentPage
      }).then(res => {
        if (res.data.code != 1) {
          this.$message({
            showClose: true,
            message: "网络异常",
            type: "error"
          });
          return;
        }
        //console.log(res);
        //获取数据
        res.data.returnData.list.forEach(item => {
          //向数组中 添加数据
          that.tableData.push({
            title: item.title,
            name: item.teacher.name,
            professionRank: item.teacher.professionRank,
            degree: item.teacher.degree,
            detail: item.detail,
            id: item.id,
            type: item.type,
            selectStuUserName: item.student && item.student.username
          });
        });

        that.page.total = res.data.returnData.total;
      });
    },
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

      getStudentFileInfo({
        type: 1
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
        if (this.myReportFile && this.myReportFile.status == 1) {
          this.btndisabled = true;
        } else {
          this.btndisabled = false;
        }

        // this.getMyReportFile();
      });
    },
    down() {
      downloadStudentFile({
        type: 1
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
    clickStatus(type) {
      this.dialogFormVisible = true;
      //通过点击添加信息弹框
      btnNumber = type;
    }
  },
  created() {
    this.getMyReportFile();
  }
};
</script>
<style lang="less" scoped>
.block {
  .el-pagination {
    float: right;
    margin-top: 10px;
  }
}
.box-table {
  margin: 0 auto;
  margin-top: 20px;
}
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
.el-dialog{
  margin-bottom: 0;
}
.el-input,.el-select{
  width: 320px;
}
</style>