<template>
  <div class="wrapper">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="subjectName" label="课题名称" width="350"></el-table-column>
      <el-table-column align="center" prop="adviser" label="指导老师" width="80"></el-table-column>
      <el-table-column align="center" prop="teacherTitle" label="职称" width="120"></el-table-column>
      <el-table-column align="center" prop="degree" label="学位" width="120"></el-table-column>
      <el-table-column align="center" prop="subjectDesc" label="课题简介"></el-table-column>
      <el-table-column align="center" prop="operae" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="check(scope)">查看</el-button>
          <el-button
            type="text"
            @click="select(scope)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="1"
        layout="prev, pager, next"
        :total="30"
      ></el-pagination>
    </div>

    <el-dialog
      title="课题详情"
      :visible.sync="dialogFormVisible"
      width="40%"
      append-to-body="true"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
    >
      <el-form :model="form">
        <el-form-item label="课题名称 :" :label-width="formLabelWidth">
          <el-input v-model="form.subjectName" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="指导老师 :" :label-width="formLabelWidth">
          <el-input v-model="form.adviser" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="职称 :" :label-width="formLabelWidth">
          <el-input v-model="form.teacherTitle" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="学位 :" :label-width="formLabelWidth">
          <el-input v-model="form.degree" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="课题详情 :" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.subjectDesc"
            auto-complete="off"
            rows="6"
            readonly
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    }
  },
  data() {
    return {
      closeOnClickModal: false,
      dialogFormVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          subjectName: "基于微信小程序的吕梁学院餐厅自助点餐系统1",
          adviser: "王三虎",
          teacherTitle: "教授",
          degree: "硕士",
          subjectDesc: "对于当前课题的简单描述，（技术栈、参考资料等）"
        },
        {
          subjectName: "基于微信小程序的吕梁学院餐厅自助点餐系统2",
          adviser: "王三虎",
          teacherTitle: "教授",
          degree: "硕士",
          subjectDesc: "对于当前课题的简单描述，（技术栈、参考资料等）"
        },
        {
          subjectName: "基于微信小程序的吕梁学院餐厅自助点餐系统3",
          adviser: "王三虎",
          teacherTitle: "教授",
          degree: "硕士",
          subjectDesc: "对于当前课题的简单描述，（技术栈、参考资料等）"
        },
        {
          subjectName: "基于微信小程序的吕梁学院餐厅自助点餐系统4",
          adviser: "王三虎",
          teacherTitle: "教授",
          degree: "硕士",
          subjectDesc: "对于当前课题的简单描述，（技术栈、参考资料等）"
        }
      ],
      form: {
        subjectName: "",
        adviser: "",
        teacherTitle: "",
        degree: "",
        subjectDesc: ""
      },
      formLabelWidth: "120px"
    };
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
</style>