<template>
  <div class="wrapper">
    <el-table :data="tableData" stripe border style="width: 100%"
    >
      <el-table-column align="center" prop="title" label="课题名称" width="280"></el-table-column>
      <el-table-column align="center" prop="type" label="课题类型" width="80"></el-table-column>
      <el-table-column align="center" prop="id" label="课题ID" width="80"></el-table-column>
      <el-table-column align="center" prop="teacher.name" label="指导老师" width="80"></el-table-column>
      <el-table-column align="center" prop="teacher.professionRank" label="职称" width="80"></el-table-column>
      <el-table-column align="center" prop="teacher.degree" label="学位" width="80"></el-table-column>
      <el-table-column align="center" prop="detail" label="课题简介" width="250"></el-table-column>
      <el-table-column align="center" prop="operate" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="check(scope)">查看</el-button>
          <el-button type="success" size="mini" v-if="scope.row.student != null">已选</el-button>
          <el-button type="info" size="mini" v-else>未选</el-button>
          
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
import { getSubjects } from "@/api/student.js";
export default {
  methods: {
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getSubjects(this.page);
    },
    check(scope) {
      console.log(scope);
      this.dialogFormVisible = true;
      const index = scope.$index;
      this.form = this.tableData[index];
    },
    getSubjects(data){
      getSubjects({
        pageNum:data.pageNum,
        pageSize:data.pageSize
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
          return;
        }
        this.tableData = res.data.returnData.list;

      })
    },
    //初始化
    async init(){
      await this.getSubjects(this.page);
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
        teacher:{}
      },
      formLabelWidth: "120px",
      page: {
        pageNum: 1, //当前页
        pageSize: 7, //每页的数据数量
        total: 0 //总页数
      },
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
.el-button--info:hover {
  border-color: #909399;
  background-color: #909399;
  color: #FFF;
  cursor: auto;
}

.el-button--success {
  border-color: #67C23A;
  background-color: #67C23A;
  color: #FFF;
  cursor: auto;
}
</style>
