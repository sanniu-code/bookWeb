<template>
  <div class="wrapper">
    <el-button type="primary" size="small" @click="changeStatu(1)">录入课题信息</el-button>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="title" label="课题名称" width="280"></el-table-column>
      <el-table-column align="center" prop="type" label="课题类型" width="80"></el-table-column>

      <!-- <el-table-column align="center" prop="name" label="指导老师" width="80"></el-table-column> -->

      <el-table-column align="center" prop="detail" label="课题简介"></el-table-column>
      <el-table-column align="center" prop="operae" label="操作" width="160">
        <template>
          <el-button type="primary" size="mini" @click="changeStatu(2)">查看</el-button>
          <el-button type="success" size="mini" @click="changeStatu(3)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          <el-input v-model="form.title" auto-complete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课题类型 :" :label-width="formLabelWidth" >
          <el-select v-model="form.region" placeholder="请选择课题类型" :disabled="readonly">
            <el-option label="设计" value="1"></el-option>
            <el-option label="论文" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课题详情 :" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.detail"
            auto-complete="off"
            rows="8"
            resize="none"
            :readonly="readonly"  
          ></el-input>
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
      //弹框的配置
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      readonly:true,
      //表格的数据
      tableData: [
        {
          title: "111",
          type: "设计",
          detail: "哈哈哈哈哈哈哈哈哈哈或或或"
        }
      ],
      //弹框的数据
      form: {
        title: "111",
        type: "1",
        detail: "哈哈哈哈哈哈哈哈哈哈或或或"
      },
      formLabelWidth: "120px"
    };
  },
  methods:{
    changeStatu(type){
      this.dialogFormVisible = true;
      console.log(type);
      if(type == 1){
        this.readonly = false;
      }else if(type == 2){
        this.readonly = true;
      }else {
        this.readonly = false;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.el-table--border {
  margin-top: 20px;
}
</style>