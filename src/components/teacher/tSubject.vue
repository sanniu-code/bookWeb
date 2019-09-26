<template>
  <div class="wrapper">
    <el-button type="primary" size="small" @click="changeStatu(1)">录入课题信息</el-button>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="title" label="课题名称" width="250"></el-table-column>
      <el-table-column align="center" prop="type" label="课题类型" width="80"></el-table-column>
      <el-table-column align="center" prop="origin" label="课题来源" width="80"></el-table-column>
      <el-table-column align="center" prop="address" label="完成地点" width="80"></el-table-column>
      <el-table-column align="center" prop="detail" label="课题简介"></el-table-column>
      <el-table-column align="center" prop="operae" label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="info" size="mini" v-if="scope.row.status == 0">待审核</el-button>
          <el-button type="primary" size="mini" @click="changeStatu(2,scope.row)">查看</el-button>
          <el-button type="success" size="mini" @click="changeStatu(3,scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      
      :visible.sync="dialogFormVisible"
      width="40%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
      :before-close="beforeClose"
    >
      <el-form :model="form">
        <el-form-item label="课题名称 :" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课题类型 :" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择课题类型" :disabled="readonly">
            <el-option label="设计" value="A"></el-option>
            <el-option label="论文" value="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课题来源 :" :label-width="formLabelWidth">
          <el-select v-model="form.origin" placeholder="请选择课题来源" :disabled="readonly">
            <el-option label="科研项目" value="A"></el-option>
            <el-option label="教研项目" value="B"></el-option>
            <el-option label="生产实践 " value="C"></el-option>
            <el-option label="社会实践" value="D"></el-option>
            <el-option label="企业 " value="E"></el-option>
            <el-option label="其他 " value="F"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课题完成地点 :" :label-width="formLabelWidth">
          <el-select v-model="form.address" placeholder="请选择完成地点" :disabled="readonly">
            <el-option label="校内" value="A"></el-option>
            <el-option label="校外" value="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课题详情 :" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.detail"
            auto-complete="off"
            rows="3"
            resize="none"
            :readonly="readonly"
          ></el-input>
        </el-form-item>
        <el-form-item label="课题申请表 :" :label-width="formLabelWidth" v-show="!readonly">
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
            
            

          >
            <el-button slot="trigger" size="small" type="primary" >上传课题申请书</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="课题申请表 :" :label-width="formLabelWidth" v-show="readonly">
          <el-button  size="small" type="primary" @click="downTeacherFile">下载课题申请书</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quit" v-show="!readonly">取 消</el-button>
        <el-button type="primary" @click="submitUpload" v-show="!readonly">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadApplyTable,getTeacherSubjects,downTeacherFile } from "@/api/teacher.js";
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
        action: "",
        file: {},
        showFileList: false
      },
      fileList: [],
      btndisabled: false,
      //弹框的配置
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      readonly: true,
      //表格的数据
      tableData: [
       
      ],
      //弹框的数据
      form: {
       

      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    //获取老师所有课题
    getTeacherSubjects(){
      getTeacherSubjects().then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:"fail",
            message:"网络异常"
          })
          return;
        }
        this.tableData = res.data.returnData
      })
    },
    //取消按钮
    quit(){     
      this.dialogFormVisible = false;
      this.form = {};
    },
    //初始化
    init(){
      this.getTeacherSubjects();
    },
    //弹框点击x 关闭反调函数
    beforeClose(done){
      this.form = {};
      done();
    },
    //下载
    downTeacherFile(){
      downTeacherFile({
        id:this.form.id,
        fileName:this.form.title+"申请书"
      }).then(res=>{
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
      })
    },

    //获取上传文件的信息
    change(file) {
      const formData = new FormData();
      formData.append("multipartFile",file.raw);
      this.form.file = formData;
    },
    // 上传文件
    submitUpload() {
      uploadApplyTable({
        multipartFile:this.form.file,
        type: this.form.type,
        title: this.form.title,
        detail: this.form.detail,
        origin:this.form.origin,
        address: this.form.address
      }).then(res => {
        if (res.data.code != 1) {
          this.$message({
            type:"error",
            message:"上传失败"
          })
          
        }else {
          this.$message({
            type:"success",
            message:"添加成功"
          })       
          this.init();
        }
        this.dialogFormVisible = false;
        this.form = {};
        
      });
    },
    
    

    
    changeStatu(type,data) {
      this.dialogFormVisible = true;
      console.log(type);
      if (type == 1) {
        this.readonly = false;
      } else if (type == 2) {
        this.readonly = true;
        this.form = data;
        console.log(data);

      } else {
        this.readonly = false;
        this.form = data;
      }
    }
  },

  created() {
    this.init();
  },
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