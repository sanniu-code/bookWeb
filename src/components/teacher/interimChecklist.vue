<template>
  <div class="wrapper">
    <!-- 上传工作中期检查表 -->
    <el-button type="primary" size="small" @click="dialog">上传工作中期检查表</el-button>
   
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工作中期检查表</span>
      </div>
      <div class="flex">
        <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.name }}</div>
          <div>
            <el-button type="primary" size="mini" @click="down(item)">下载</el-button>
          </div>
        </div>
        <div class="no" v-if="fileList.length <= 0">暂无消息</div>
      </div>
    </el-card>
    <el-dialog
      title="上传工作中期检查表"
      :visible.sync="dialogFormVisible"
      width="40%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
      :before-close="beforeClose"
    >
      <el-form :model="form">
        <el-form-item label="学生姓名 :" :label-width="formLabelWidth">
          <el-select v-model="form.username" placeholder="请选择学生" >
            <el-option :label="item.name" :value="item.username" v-for="item in studentList" :key="item.username"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择文件 :" :label-width="formLabelWidth">
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
            :on-change="fileChange"
            :show-file-list="configuration.showFileList"
          >
            <el-button slot="trigger" size="small" type="primary" >上传工作中期检查表</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quit">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getStudentList , uploadFile,getTeacherUploadFile,downTeacherFile} from '@/api/teacher'
export default {
  data() {
    return {
      configuration: {
        autoUpload: false,
        multiple: false,
        limit: 1,
        name: "file", //上传的文件的名字
        withCredentials: true,
        action: "",
      },
      //展示学生文件信息
      fileList: [],
      //弹框的配置
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      //弹框的数据
      form: {
        username: "",
        file:""
      },
      formLabelWidth: "120px",
      studentList:[]
    };
  },
  methods: {
    init(){
      this.getTeacherUploadFile();
    },
    
    dialog() {
      this.dialogFormVisible = true;
      this.readonly = false;
    },
    getStudentList(){
      getStudentList().then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:"fail",
            message:"网络异常"
          })
          return
        }
        this.studentList = res.data.returnData;
      })
    },
    fileChange(file){
      const formData = new FormData();
      formData.append("file",file.raw);
      this.form.file = formData;
    },
    //点击确定上传文件信息
    submitInfo(){
      uploadFile({
        type:4,
        username:this.form.username,
        file:this.form.file
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:"fail",
            message:"上传失败"
          })
          
        }else {
          this.$message({
            type:"success",
            message:"上传成功"
          })
        }
        //清空
        this.form = {};
        this.dialogFormVisible = false;
        this.init();
        
      })
    },
    quit(){
      this.form = {};
      this.dialogFormVisible = false;
    },
    beforeClose(){
      this.form = {};
      this.dialogFormVisible = false;
    },
    getTeacherUploadFile(){
      getTeacherUploadFile({
        type:4
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
          return
        }

        this.fileList = res.data.returnData;
      })
    },
    down(d){
      downTeacherFile({
        id:d.id
      }).then(res => {
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
      });
    }
  },
  watch:{
    dialogFormVisible(status){
      if(!status) return;
      this.getStudentList();
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
/deep/ .el-select {
  display: block;
}
</style>