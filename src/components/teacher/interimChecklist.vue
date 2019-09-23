<template>
  <div class="wrapper">
    <!-- 上传工作中期检查表 -->
    <el-button type="primary" size="small" @click="dialog">上传工作中期检查表</el-button>
   
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工作中期检查表</span>
      </div>
      <div class="flex">
        <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.name }}</div>
          <div>
            <el-button type="primary" size="mini">下载</el-button>
          </div>
        </div>
        <div class="no" v-if="fileList.length <= 0">暂无消息</div>
      </div>
    </el-card>
    <el-dialog
      title="上传工作中期检查表"
      :visible.sync="dialogFormVisible"
      width="40%"
      :append-to-body="appendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnClickModal"
    >
      <el-form :model="form">
        <el-form-item label="学生姓名 :" :label-width="formLabelWidth">
          <el-select v-model="form.stuName" placeholder="这是谁的检查表呢" :disabled="readonly">
            <el-option label="张三" value="A"></el-option>
            <el-option label="李四" value="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择文件 :" :label-width="formLabelWidth">
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
            :disabled="btndisabled"
          >
            <el-button slot="trigger" size="small" type="primary" :disabled="btndisabled">上传工作中期检查表</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      configuration: {
        autoUpload: false,
        multiple: false,
        limit: 1,
        data: {
          type: 1
        }, //上传的额外的参数
        name: "file", //上传的文件的名字
        withCredentials: true,
        action: ".xls",
        file: {}
      },
      fileList: [
        {
          name: "111"
        },
        {
          name: "111"
        }
      ],
      //弹框的配置
      closeOnClickModal: false,
      dialogFormVisible: false,
      appendToBody: true,
      readonly: true,
      //弹框的数据
      form: {
        stuName: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    dialog() {
      this.dialogFormVisible = true;
      this.readonly = false;
    }
  }
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  .flex > div.list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }

  .no {
    color: #dfe1e5;
    text-align: center;
    font-size: 15px;
  }
}
/deep/ .el-select {
  display: block;
}
</style>