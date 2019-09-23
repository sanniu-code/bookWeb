<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的课题任务书</span>
      </div>
      <div class="flex">
        <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.name }}</div>
          <div>
            <el-button type="primary" size="mini" @click="down(item.name)">下载</el-button>
          </div>
        </div>
        <div class="no" v-if="fileList.length <= 0">啥也没有！</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { downOwnMissionBook, getOwnMissionBook } from "@/api/student";
export default {
  data() {
    return {
      fileList: [
          {
              name : '111'
          },
          {
              name : '111'
          }
      ],
    };
  },
  methods: {
    down() {
      const username = this.$store.state.userInfo.username;
      downOwnMissionBook({
        fileName: `吕梁学院${username.substring(
          0,
          4
        )}届毕业论文（设计）课题任务书 ————${username}.doc`
      }).then(res => {
        console.log(res.data);
        const blob = new Blob([res.data]);
        const fileName = this.info.name;
        const linkNode = document.createElement("a");
        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = "none";
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click(); //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
      });
    },
    getOwnMissionBook() {
      getOwnMissionBook().then(res => {
        if (res.data.code != 1) {
          this.$message({
            type: "error",
            message: "网络错误"
          });
          return;
        }
        this.info = res.data.returnData;
      });
    }
  },
  created() {
    this.getOwnMissionBook();
  }
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  .flex>div.list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }
  .no {
    color: #dfe1e5;
    margin: 0 auto;
    font-size: 15px;
  }
}
</style>