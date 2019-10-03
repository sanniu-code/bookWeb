<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :multiple="configuration.multiple"
      :limit="configuration.limit"
      :action="configuration.action"
      :with-credentials="configuration.withCredentials"
      :auto-upload="configuration.autoUpload"
      :on-change="change"
      :show-file-list="configuration.showFileList"
      
      
    >
      <el-button slot="trigger" size="small" type="primary" v-if="$store.state.userInfo && $store.state.userInfo.type == 3">上传常用文件</el-button>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button> -->
    </el-upload>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>相关资料</span>
      </div>
      <div class="flex">
        <div v-for="item in fileList" :key="item.id" class="list">
          <div>{{ item.name }}</div>
          <div>
            <el-button type="primary" size="mini" @click="down(item)">下载</el-button>
          </div>
        </div>
        <div class="no" v-if="fileList.length <= 0">啥也没有</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getUserFileList ,downloadApplyTable } from "@/api/user";
import { uploadCommonFile } from '@/api/leader'
export default {
  name: "relativeData",
  data() {
    return {
      configuration: {
        autoUpload: false,
        multiple: false,
        limit: 1,
        withCredentials: true,
        action: "",
        showFileList: false
      },
      fileList: []
    };
  },
  methods: {
    change(file,fileList) {
      console.log(file);
      console.log(fileList);
      const formData = new FormData();
      console.log(file.raw);
      formData.append("file",file.raw);
      this.$confirm("确定上传开题报告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
          uploadCommonFile({
            formData,
          }).then(res => {
            if (res.data.code != 1) {
              this.$message({
                type: "error",
                message: "上传失败，请重新上传"
              });
              return;
            }

            this.$message({
              type: "success",
              message: "上传成功"
            });
            //重新加载
            this.getUserFileList();
          });
      }).catch(() => {
      });
    },

    getUserFileList() {
      getUserFileList().then(res => {
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
    down(d) {
      downloadApplyTable({
        id:d.id
      }).then(res => {
        const blob = new Blob([res.data]);
        const fileName = d.url.substring(d.url.lastIndexOf("\\")+1);
        const linkNode = document.createElement("a");
        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = "none";
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click(); //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
        // if(res.data.code != 1){
        //   this.$message({
        //     type:"error",
        //     message:"网络异常，下载失败"
        //   })
        // }
      });
    }
  },
  created() {
    this.getUserFileList();
  }
};
</script>

<style lang="less" scoped>
.upload-demo {
  margin-bottom: 20px;
}
.box-card {
  
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
