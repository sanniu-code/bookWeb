<template>
  <div class="wrapper">
      <el-button slot="trigger" size="small" type="primary" @click="clickStatus(1)">添加信息</el-button>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="professionId" label="专业代号"></el-table-column>
      <el-table-column align="center" prop="professionName" label="专业名称"></el-table-column>
      <el-table-column align="center" prop="operate" label="操作">
        <template>
          <el-button type="primary" size="mini" @click="clickStatus(2)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增专业"
      :visible.sync="dialogFormVisible"
      width="30%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
    >
      <el-form :model="form">
          <el-form-item label="专业代号" :label-width="formLabelWidth">
          <el-input v-model="form.professionId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业名称" :label-width="formLabelWidth">
          <el-input v-model="form.professionName" autocomplete="off"></el-input>
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
        {
          professionId: "03",
          professionName: "计算机科学与技术"
        }
      ],
      form: {
        professionId: "",
        professionName: ""
      },
      btnNumber:0
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