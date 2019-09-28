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

    >
      <el-button slot="trigger" size="small" type="primary" >从文件导入</el-button>

      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
    </el-upload>
    <el-table :data="tableData" stripe border style="width: 100%" class="box-table">
      <el-table-column align="center" prop="username" label="学号" width="150"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="80">
        <template slot-scope="scope">{{ scope.row.sex == 1?"男":"女" }}</template>
      </el-table-column>
      <el-table-column align="center" prop="classGrade.profession.name" label="专业" width="200"></el-table-column>
      <el-table-column align="center" prop="classGrade.name" label="班级" width="80" />
      <el-table-column align="center" prop="createTime" label="入学年份" width="200">
        <template slot-scope="scope">
          {{scope.row.createTime && new Date(scope.row.createTime).toJSON().substr(0, 19).replace('T', ' ') }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="year" label="学制" width="80"></el-table-column>
      <el-table-column align="center" prop="operate" label="操作" >
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
      :before-close="beforeClose"
    >
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" :readonly="readonly"></el-input>
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
        <el-form-item label="专业" :label-width="formLabelWidth" >
          <el-select v-model="form.professionid" placeholder="请选择专业" @change="selectChange">
            <el-option :label="item.name" :value="item.id" v-for="item in professionList" :key="item.id"></el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="form.classid" placeholder="请选择班级">
            <el-option :label="item.name" :value="item.id" v-for="item in classList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份" :label-width="formLabelWidth">
          <!-- <el-select v-model="form.createTime" placeholder="请选择入学年份" >
            <el-option label="2016年" value="1"></el-option>
            <el-option label="2017年" value="2"></el-option>
            <el-option label="2018年" value="2"></el-option>
            <el-option label="2019年" value="2"></el-option>
          </el-select> -->
          <el-date-picker
            v-model="form.createTime"
            type="date"
            placeholder="请选择入学年份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学制" :label-width="formLabelWidth">
          <el-select v-model="form.year" placeholder="请选择学制">
            <el-option label="四年" value="4"></el-option>
            <el-option label="五年" value="5"></el-option>
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
import { getStudentList,updateStudent,addStudent,getDataByStudentExcel,getAllProfession
        ,getClassByProfession
} from '@/api/leader'
import { Promise } from 'q';
export default {
  data() {
    return {
      formLabelWidth: "80px",
      configuration: {
        autoUpload: false,
        multiple: false,
        limit: 1,
        data: {
          type: 1
        }, //上传的额外的参数
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
        username:"",//学号
        name: "",//姓名
        sex: "",//性别
        professionid:"",//专业id
        classid:"",//classid
        createTime:"",//入学时间
        year:"",//学制
      },
      btnNumber:0,
      file:{},
      professionList:{},
      classList:{},
      readonly:false
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
          getDataByStudentExcel({
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
        this.page.pageNum = num;
        this.getStudentList();
    },
    getStudentList(){
      getStudentList({
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
      this.getStudentList();
    },
    clickStatus(num,data){
      //显示弹框
      this.dialogFormVisible = true;
      //保存状态值
      this.btnNumber = num;
      console.log(data);
      //修改信息
      if(data != null){
        this.readonly = true;
        this.form = {
          username:data.username,
          name:data.name,
          sex:data.sex,
          professionid:data.classGrade.profession.id,
          classid:data.classGrade.id,
          createTime:new Date(data.createTime + 8*3600*1000).toJSON().substr(0, 19).replace('T', ' '),
          year:data.year
        }
        //调用接口
        
      }
      new Promise((resolve,reject)=>{
        getAllProfession().then(res=>{
          if(res.data.code != 1){
            this.$message({
              type:'fail',
              message:"网络异常"
            })
            return;
          }
          this.professionList = res.data.returnData;
          resolve();
        })
      }).then(()=>{
        if(data != null){
          //再次调用
          this.selectChange(this.form.professionid);
        }
      })


      this.readonly = false;


      
    },
    beforeClose(done){
      this.form = {};
      done();
    },
    //确定
    submit(){
      if(this.btnNumber == 1){
        //新增
        addStudent({
          "classGrade": {
            "id": this.form.classid,
            "profession": {             
              "id": this.form.professionid,
            }
          },
          "createTime":new Date(this.form.createTime),
          "name":this.form.name,
          "sex": this.form.sex,
          "username": this.form.username,
          "year": this.form.year
        }).then(res=>{
          if(res.data.code != 1){
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
        updateStudent({
          "classGrade": {
            "id": this.form.classid,
            "profession": {             
              "id": this.form.professionid,
            }
          },
          "createTime":new Date(this.form.createTime),
          "name":this.form.name,
          "sex": this.form.sex,
          "username": this.form.username,
          "year": this.form.year
        }).then(res=>{
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
    },
    selectChange(id){
      getClassByProfession({
        id
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:"fail",
            message:"网络异常"
          })
          return;
        }
        this.classList = res.data.returnData;
      })
    }
  },
  created() {
    this.getStudentList();
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