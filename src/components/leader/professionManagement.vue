<template>
  <div class="wrapper">
    <!-- 学生信息导入 -->
    <el-button slot="trigger" size="small" type="primary" @click="clickStatus(1)">添加专业</el-button>
    
    <el-table :data="tableData" stripe border style="width: 100%" class="box-table">
      <el-table-column align="center" prop="id" label="编号" width="150"></el-table-column>
      <el-table-column align="center" prop="name" label="名称" width="300"></el-table-column>
      
      <el-table-column align="center" prop="operate" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="clickStatus(2,scope.row)">修改</el-button>
          <!-- <el-button type="warning" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="专业信息"
      :visible.sync="dialogFormVisible"
      width="35%"
      top="6vh"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
      :before-close="beforeClose"
      
    >
      <el-form :model="form">
        <el-form-item label="专业名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quit" >取 消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllProfession,addProfession,updateProfession
} from '@/api/leader'
import { Promise } from 'q';
export default {
  data() {
    return {
      formLabelWidth: "80px",
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
        name:""
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
    
    getAllProfession(){
      getAllProfession().then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
          return
        }

        this.tableData = res.data.returnData;

      })
    },
    init(){
      this.getAllProfession();
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
        this.form = data;
        //调用接口
        
      }
      
    },
    beforeClose(done){
      this.form = {};
      this.readonly = false;
      done();
    },
    //确定
    submit(){
      if(this.btnNumber == 1){
        //新增
        addProfession(this.form).then(res=>{
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
          this.init();
        })
      }else {
        //修改
        updateProfession({
          id:this.form.id,
          name:this.form.name
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
          this.init();
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
    
    
  },
  created() {
    this.init();
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