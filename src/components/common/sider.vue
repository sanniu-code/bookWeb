<template>
  <div class="wrapper">
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" @select="select">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">选题阶段</span>
        </template>
        <el-menu-item index="choseSubject">选择题目</el-menu-item>
        <el-menu-item index="mySubject">我的题目</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">开题阶段</span>
        </template>
        <el-menu-item index="checkApplicationForm">查看课题申请表</el-menu-item>
        <el-menu-item index="uploadProposal">上传开题报告</el-menu-item>
        <el-menu-item index="taskDescription">课题任务书</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">中期工作</span>
        </template>
        <el-menu-item index="uploadGuideForm">上传指导记录</el-menu-item>
        <el-menu-item index="interimReport">上传中期报告</el-menu-item>
        <el-menu-item index="interimChecklist">上传工作中期检查表</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">后期工作</span>
        </template>
        <el-menu-item index="defenseNotes">答辩记录</el-menu-item>
        <el-menu-item index="groupScoreSheet">答辩小组评分表</el-menu-item>
        <el-menu-item index="ScoreSheet">成绩评定表</el-menu-item>
        <el-menu-item index="formatReviewReport">格式查重报告</el-menu-item>
        <el-menu-item index="paperReviewRate">论文查重率</el-menu-item>
      </el-submenu>

      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">相关资料</span>
      </el-menu-item>

      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">个人资料</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    select(index, indexPath) {
      if (this.$route.name == index) return;
      this.$router.push({ name: index });
    }
  }
};
</script>


<style lang="less" scoped>
.wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 100px;
  overflow: auto;
  border-right: solid 1px #e6e6e6;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: 0px;
}

.wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 0px; /*高宽分别对应横竖滚动条的尺寸*/

  height: 1px;
}
</style>
