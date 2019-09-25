<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通知公告</span>
      </div>
      <div class="flex">
        <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.name }}</div>
          <div>
            <el-button type="primary" size="mini" @click="down(item.name)">下载</el-button>
            <el-button type="success" size="mini" @click="examineStudentFile({ id:item.id,status:1 })">通过</el-button>
            <el-button type="danger" size="mini" @click="examineStudentFile({ id:item.id,status:2 })">驳回</el-button>
          </div>
        </div>
        <div class="no" v-if="fileList.length <= 0">暂无消息</div>
      </div>
    </el-card>
  </div>
</template>


<script>
import { getNotExamineFiles,examineStudentFile } from "@/api/teacher";
export default {
  // name: "notice",
  data() {
    return {
      fileList: [
      ]
    };
  },
  methods: {
    getNotExamineFiles() {
      getNotExamineFiles().then(res => {
        if (res.data.code != 1) {
          this.$message({
            type: "error",
            message: "网络异常，请重新登录"
          });
          return;
        }

        this.fileList = res.data.returnData;
      });
    },
    examineStudentFile(data){
      examineStudentFile({
        id:data.id,
        status:data.status
      }).then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
        }else {
          this.$message({
            type:'success',
            message:"操作成功"
          })
        }
        this.init();
      })
    },
    init(){
      this.getNotExamineFiles();
    }
  },
  
  created() {
    this.init();
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
</style>
