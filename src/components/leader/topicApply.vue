<template>
  <div class="wrapper">
    <el-table :data="tableData" stripe border style="width: 100%"
    >
      <el-table-column align="center" prop="title" label="课题名称" width="200"></el-table-column>
      <el-table-column align="center" prop="type" label="课题类型" width="80"></el-table-column>
      <el-table-column align="center" prop="id" label="课题ID" width="80"></el-table-column>
      <el-table-column align="center" prop="teacher.name" label="指导老师" width="80"></el-table-column>
      <el-table-column align="center" prop="teacher.professionRank" label="职称" width="80"></el-table-column>
      <el-table-column align="center" prop="teacher.degree" label="学位" width="80"></el-table-column>
      <el-table-column align="center" prop="detail" label="课题简介" ></el-table-column>
      <el-table-column align="center" prop="operate" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="check(scope)">查看</el-button>
          <!-- <el-button type="success" size="mini" v-if="scope.row.selectStuUserName != null">已选</el-button>
          <el-button type="info" size="mini" v-else>未选</el-button> -->
          <el-button type="primary" size="mini" @click="download(scope.row.teacherFile)">下载</el-button>
          <el-button type="success" size="mini" @click="pass(scope.row.id,1)">通过</el-button>
          <el-button type="danger" size="mini" @click="pass(scope.row.id,2)">驳回</el-button>
          
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
      title="课题详情"
      :visible.sync="dialogFormVisible"
      width="40%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
    >
      <el-form :model="form">
        <el-form-item label="课题名称 :" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="课题类型 :" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off" readonly></el-input>
        </el-form-item>

        <el-form-item label="指导老师 :" :label-width="formLabelWidth">
          <el-input v-model="form.teacher.name" auto-complete="off" readonly></el-input>
        </el-form-item>

        <el-form-item label="课题详情 :" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.detail"
            auto-complete="off"
            rows="8"
            resize="none"
            readonly
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getAllNoExamineFile,examineTeacherFile } from "@/api/leader.js";
import { downTeacherFile } from '@/api/teacher.js'
export default {
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.page.pageNum = val;
      this.getAllNoExamineFile(this.page);
    },
    //查看
    check(scope) {
      console.log(scope);
      this.dialogFormVisible = true;
      const index = scope.$index;
      this.form = this.tableData[index];
    },
    //下载
    download(file){
      downTeacherFile({
        id:file.id
      }).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = file.name;
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
    //审核
    pass(id,status){
      examineTeacherFile({
        id,
        status
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            'type':"fail",
            'message':"网络异常"
          })
          return
        }
        this.$message({
          'type':"success",
          'message':"修改成功"
        })
        this.init();
        
      })
    },
    //获取我所选择的课题信息
    getAllNoExamineFile(data){
      getAllNoExamineFile({
        pageNum:data.pageNum,
        pageSize:data.pageSize
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            showClose: true,
            message: '网络异常',
            type: 'error'
          });
          return;         
        }
        this.tableData = res.data.returnData.list;
        
        

      })
    },
    //初始化
    async init(){
      await this.getAllNoExamineFile(this.page);
      
    }
  },
  data() {
    return {
      //弹框的配置
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      //表格的数据
      tableData: [],
      //弹框的数据
      form: {
        title: "",
        name: "",
        professionRank: "",
        degree: "",
        detail: "",
        teacher:{
          name:""
        }
      },
      formLabelWidth: "120px",
      page: {
        pageNum: 1, //当前页
        pageSize: 7, //每页的数据数量
        total: 0 //总页数
      },
      //保存的已经选择的课题的信息
      subjectId:0
    };

  },
  created() {
    this.init();
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
.wrapper {
  /deep/ .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/deep/ .el-textarea__inner::-webkit-scrollbar {
  width: 0;
  overflow: hidden;
}

</style>