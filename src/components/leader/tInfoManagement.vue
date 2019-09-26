<template>
  <div class="wrapper">
    <!-- 指导老师信息导入 -->
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
      <el-table-column align="center" prop="id" label="工号" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="120">
        <template slot-scope="scope">{{ scope.row.sex == 1?"男":"女" }}</template>
      </el-table-column>
      <el-table-column align="center" prop="professionRank" label="职称" width="120"></el-table-column>
      <el-table-column align="center" prop="degree" label="学位" width="120"></el-table-column>
      <el-table-column align="center" prop="operate" label="操作">
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
      title="教师信息"
      :visible.sync="dialogFormVisible"
      width="30%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
      
    >
      <el-form :model="form">
        <el-form-item label="工号" :label-width="formLabelWidth">
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
        <el-form-item label="职称" :label-width="formLabelWidth">
          <el-select v-model="form.professionRank" placeholder="请选择职称">
            <el-option label="教员" value="1"></el-option>
            <el-option label="讲师" value="2"></el-option>
            <el-option label="副教授" value="2"></el-option>
            <el-option label="教授" value="2"></el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item label="学位" :label-width="formLabelWidth">
          <el-select v-model="form.degree" placeholder="请选择性别">
            <el-option label="本科" value="1"></el-option>
            <el-option label="研究生" value="2"></el-option>
            <el-option label="博士" value="2"></el-option>
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
          id: "01001",
          name: "王小虎",
          professionRank: "教授",
          degree: "研究生",
          sex: 2
        }
      ],
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      form: {
        id:"",
        name: "",
        sex: "",
        degree:"",
        professionRank:""
      },
      btnNumber:0
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
        if(res.data.code != 1){
          this.$message({
            showClose: true,
            message: '网络异常',
            type: 'error'
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
            selectStuUserName:(item.student && item.student.username)
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
  },
  
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
  margin-top: 20px;
}
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
.el-input,.el-select{
  width: 240px;
}
</style>