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
    >
      <el-button slot="trigger" size="small" type="primary">从文件导入</el-button>

      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
    </el-upload>
    <el-table :data="tableData" stripe border style="width: 100%" class="box-table">
      <el-table-column align="center" prop="username" label="工号" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="120">
        <template slot-scope="scope">{{ scope.row.sex == 1?"男":"女" }}</template>
      </el-table-column>
      <el-table-column align="center" prop="professionRank" label="职称" width="120"></el-table-column>
      <el-table-column align="center" prop="degree" label="学位" width="120"></el-table-column>
      <el-table-column align="center" prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="clickStatus(2,scope.row)">修改</el-button>
          <!-- <el-button type="warning" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page.pageNum"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        :total="page.total"
        small
      ></el-pagination>
    </div>
    <el-dialog
      title="教师信息"
      :visible.sync="dialogFormVisible"
      width="30%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
      :before-close="beforeClose"
      
    >
      <el-form :model="form">
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
            <el-option label="教员" value="教员"></el-option>
            <el-option label="讲师" value="讲师"></el-option>
            <el-option label="副教授" value="副教授"></el-option>
            <el-option label="教授" value="教授"></el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item label="学位" :label-width="formLabelWidth">
          <el-select v-model="form.degree" placeholder="请选择性别">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quit">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getTeacherList,updateTeacher,addTeacher,getDataByTeacherExcel } from '@/api/leader'
export default {
  data() {
    return {
      formLabelWidth: "80px",
      configuration: {
        autoUpload: false,
        multiple: false,
        limit: 1,
        withCredentials: true,
        action: "",
        showFileList: false
      },
      btndisabled: false,
      page: {
        total: 0 ,//总条数
        pageSize:2,
        pageNum:1
      },
      tableData: [
        {
          username: "01001",
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
        username:"",
        name: "",
        sex: 0,
        degree:"",
        professionRank:""
      },
      btnNumber:0,
      file:{}
    };
  },
  methods: {
    //文件上传时间
    change(file){
      const formData = new FormData();
      formData.append("file", file.raw);
      this.file = formData;
      this.$confirm('是否继续操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          //调用接口
          getDataByTeacherExcel({
            file:formData
          }).then(res=>{
            if(res.data.code != 1){
              this.$message({
                type: 'info',
                message: '读取文件失败'
              });
              return;
            }
            this.$message({
              type: 'success',
              message: '读取文件成功'
            });
            this.init();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleCurrentChange(num){
        this.page.currentPage = num;
        this.getTeacherList();
    },
    getTeacherList(){
      getTeacherList({
        pageSize:this.page.pageSize,
        pageNum:this.page.pageNum
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
          return
        }
        this.page.total = res.data.returnData.total;

        this.tableData = res.data.returnData.list;

      })
    },
    init(){
      this.getTeacherList();
    },
    clickStatus(num,data){
      //显示弹框
      this.dialogFormVisible = true;
      //保存状态值
      this.btnNumber = num;
      if(data != null){
        this.form = data;
      }
    },
    beforeClose(done){
      this.form = {};
      done();
    },
    //确定
    submit(){
      if(this.btnNumber == 1){
        //新增
        addTeacher(this.form).then(res=>{
          if(rs.data.code != 1){
            this.$message({
              type:"fail",
              message:"新增失败"
            })
            return;
          }
          this.$message({
            type:"success",
            message:"新增成功"
          })
        })
      }else {
        //修改
        updateTeacher(this.form).then(res=>{
          if(res.data.code != 1){
            this.$message({
              type:"fail",
              message:"修改失败"
            })
            return;
          }
          this.$message({
            type:"success",
            message:"修改成功"
          })
        })
      }
      this.form ={}
      this.dialogFormVisible = false;
      this.init();
    },
    quit(){
      this.form ={}
      this.dialogFormVisible = false;
    }




    
  },
  created() {
    this.getTeacherList();
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