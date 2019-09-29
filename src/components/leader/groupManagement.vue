<template>
  <div class="wrapper">
    <el-button slot="trigger" size="small" type="primary" @click="clickStatus(1)">添加信息</el-button>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="professionName" label="专业"></el-table-column>
      <el-table-column align="center" prop="groupName" label="班级"></el-table-column>
      <el-table-column align="center" prop="operate" label="操作">
        <template>
          <el-button type="primary" size="mini" @click="clickStatus(2)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增班级"
      :visible.sync="dialogFormVisible"
      width="30%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
    >
      <el-form :model="form">
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-select v-model="form.professionName" placeholder="请选择专业">
            <el-option label="计算机科学与技术" value="1"></el-option>
            <el-option label="软件工程" value="2"></el-option>
            <el-option label="数据科学和大数据" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="form.groupName" autocomplete="off"></el-input>
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
export default {
  data() {
    return {
      formLabelWidth: "120px",
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      tableData: [
        // {
        //   professionName: "计算机科学与技术",
        //   groupName: "1601班"
        // }
      ],
      form: {
        groupName: "",
        professionName: ""
      },
      btnNumber: 0
    };
  },
  methods: {
    clickStatus(type) {
      this.dialogFormVisible = true;
      //通过点击添加信息弹框
      console.log(type);
      this.btnNumber = type;
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 220px;
}
.el-table {
  margin-top: 20px;
}
</style>