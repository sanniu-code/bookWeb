<template>
  <div class="wrapper">
    <el-menu class="el-menu-vertical-demo" :collapse="configuration.isCollapse" @select="select"  :default-active="configuration.defaultActive"
      :router="configuration.menuRouter"
      :unique-opened="configuration.menuUO"
    >
      <el-menu-item index="notice">
        <i class="el-icon-setting"></i>
        <span slot="title">通知公告</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">选题阶段</span>
        </template>
		<!-- 课题列表供学生查看选择 -->
        <el-menu-item index="choseSubject">选择题目</el-menu-item>
		<!-- 学生已经选择的课题详情 -->
        <el-menu-item index="mySubject">我的题目</el-menu-item>
		<!-- 教师申请的课题列表 -->
        <el-menu-item index="tSubject">我的课题</el-menu-item>
		<!-- 指导老师所对应学生的相关信息 -->
        <el-menu-item index="checkStuSubject">学生课题</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">开题阶段</span>
        </template>
		<!-- 学生可以通过查看老师的课题申请表来获取关于此课题的详细信息 -->
        <el-menu-item index="checkApplicationForm">查看课题申请表</el-menu-item>
		<!-- 学生上传开题报告待指导老师审核 -->
        <el-menu-item index="uploadProposal">上传开题报告</el-menu-item>
		<!-- 指导老师查看学生的开题报告 -->
		<el-menu-item index="checkStuProposal">查看学生开题报告</el-menu-item>
		<!-- 开题报告通过后指导老师上传课题任务书 -->
		<el-menu-item index="uploadTaskDesc">上传课题任务书</el-menu-item>
		<!-- 学生下载课题任务书 -->
        <el-menu-item index="taskDescription">课题任务书</el-menu-item>
		
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">中期工作</span>
        </template>
        <el-menu-item index="uploadGuideForm">上传指导记录</el-menu-item>
        <el-menu-item index="interimReport">上传中期报告</el-menu-item>
        <el-menu-item index="interimChecklist">上传工作中期检查表</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">后期工作</span>
        </template>
        <el-menu-item index="defenseNotes">答辩记录</el-menu-item>
        <el-menu-item index="groupScoreSheet">答辩小组评分表</el-menu-item>
        <el-menu-item index="ScoreSheet">成绩评定表</el-menu-item>
        <el-menu-item index="formatReviewReport">格式查重报告</el-menu-item>
        <el-menu-item index="paperReviewRate">论文查重率</el-menu-item>
        <el-menu-item index="paper">论文</el-menu-item>
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
      configuration:{
        menuRouter:true,
        menuUO:true,
        defaultActive:"1",
        isCollapse: false
      }
      
      
    };
  },
  methods: {
    select(index, indexPath) {
      // if (this.$route.name == index) return;
      // this.$router.push({ name: index });
    }
  },
  created(){
    this.configuration.defaultActive = this.$route.name;
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
