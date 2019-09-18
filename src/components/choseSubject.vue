<template>
  <div class="wrapper">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="title" label="课题名称" width="350px"></el-table-column>
      <el-table-column align="center" prop="type" label="课题类型" width="80"></el-table-column>
      <el-table-column align="center" prop="id" label="课题ID" width="80"></el-table-column>
      <el-table-column align="center" prop="name" label="指导老师" width="80"></el-table-column>
      <el-table-column align="center" prop="professionRank" label="职称" width="80"></el-table-column>
      <el-table-column align="center" prop="degree" label="学位" width="80"></el-table-column>
      <el-table-column align="center" prop="detail" label="课题简介" width="320"></el-table-column>
      <el-table-column align="center" prop="operae" label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="check(scope)">查看</el-button>
          <el-button type="primary" plain size="mini" @click="select(scope)">选择</el-button>
          <el-button type="success" size="mini">已选择</el-button>
          <el-button type="info" size="mini">不可选</el-button>
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
          <el-input v-model="form.name" auto-complete="off" readonly></el-input>
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
      console.log(val);
      this.page.currentPage = val;
      this.getPageData();
    },
    check(scope) {
      this.dialogFormVisible = true;
      const index = scope.$index;
      this.form = this.tableData[index];
    },
    select(scope) {
      this.$confirm("您确定要选择本课题吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "选择成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消选择"
          });
        });
    },
    getPageData() {
      let that = this;
      //清空原数组
      this.tableData = [];
      //调用接口
      getSubjects({
        pageSize: that.page.pageSize,
        pageNum: that.page.currentPage
      }).then(res => {
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
            type: item.type
          });
        });

        that.page.total = res.data.returnData.total;
      });
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
        detail: ""
      },
      formLabelWidth: "120px",
      page: {
        currentPage: 1, //当前页
        pageSize: 1, //每页的数据数量
        total: 0 //总页数
      }
    };
  },
  created() {
    this.getPageData();
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