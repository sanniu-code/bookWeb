<template>
  <div class="wrapper">
    <el-menu class="el-menu-vertical-demo" :collapse="configuration.isCollapse" @select="select"  :default-active="configuration.defaultActive"
      :router="configuration.menuRouter"
      :unique-opened="configuration.menuUO"
    >
      <el-menu-item index="stuNotice">
        <i class="el-icon-warning"></i>
        <span slot="title">通知公告</span>
      </el-menu-item>

      <el-menu-item index="teaNotice">
        <i class="el-icon-warning"></i>
        <span slot="title">通知公告</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">前期工作</span>
        </template>
		    <!-- 课题列表供学生查看选择 -->
        <el-menu-item index="applySubject">老师--课题申请--文件--审核</el-menu-item>
        <!-- 教师申请的课题列表 -->
        <el-menu-item index="tSubject">老师--上传课题信息--表单</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">选题阶段</span>
        </template>
		    <!-- 课题列表供学生查看选择 -->
        <el-menu-item index="choseSubject">学生--选择题目</el-menu-item>
		    <!-- 学生已经选择的课题详情 -->
        <el-menu-item index="mySubject">学生--我的题目--下载课题申请表</el-menu-item>
		    
		    <!-- 指导老师所对应学生的相关信息 -->
        <el-menu-item index="checkStuSubject">老师--学生课题</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">开题阶段</span>
        </template>
		<!-- 学生可以通过查看老师的课题申请表来获取关于此课题的详细信息 -->
        <!-- <el-menu-item index="checkApplicationForm">查看课题申请表</el-menu-item> -->
		<!-- 学生上传开题报告待指导老师审核 -->
        <el-menu-item index="uploadProposal">学生--上传开题报告</el-menu-item>
		<!-- 指导老师查看学生的开题报告 -->
		<el-menu-item index="checkStuProposal">老师--查看学生开题报告--审核</el-menu-item>
		<!-- 开题报告通过后指导老师上传课题任务书 -->
		<el-menu-item index="uploadTaskDesc">老师--上传课题任务书</el-menu-item>
		<!-- 学生下载课题任务书 -->
        <el-menu-item index="taskDescription">学生--课题任务书</el-menu-item>
		
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">中期工作</span>
        </template>
        <el-menu-item index="uploadGuideForm">老师--上传指导记录</el-menu-item>
        <el-menu-item index="interimReport">学生--上传中期报告</el-menu-item>
        
        <el-menu-item index="TinterimReport">老师--审核学生中期报告</el-menu-item>
        <el-menu-item index="interimChecklist">老师--上传工作中期检查表</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">后期工作</span>
        </template>
        <el-menu-item index="TdefenseNotes">老师--答辩记录上传</el-menu-item>
        <el-menu-item index="TgroupScoreSheet">老师--答辩小组评分表</el-menu-item>
        <el-menu-item index="TscoreSheet">老师--成绩评定表上传</el-menu-item>

        <el-menu-item index="formatReviewReport">学生--格式查重报告</el-menu-item>
        <el-menu-item index="paperReviewRate">学生--论文查重率</el-menu-item>
        <el-menu-item index="paper">学生--论文</el-menu-item>
        <el-menu-item index="scoreSheet">学生--成绩评定表查看</el-menu-item>
        <el-menu-item index="defenseNotes">学生--答辩记录查看</el-menu-item>

        <el-menu-item index="TformatReviewReport">老师--格式查重审核</el-menu-item>
        <el-menu-item index="TpaperReviewRate">老师--论文查重率审核</el-menu-item>
        <el-menu-item index="Tpaper">老师--论文审核</el-menu-item>
        
      </el-submenu>

      <el-menu-item index="relativeData">
        <i class="el-icon-download"></i>
        <span slot="title">相关资料</span>
      </el-menu-item>

      <!-- 管理员菜单 -->

          <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">信息管理</span>
        </template>
		    <!-- 课题列表供学生查看选择 -->
        <el-menu-item index="tInfoManagement">指导老师信息</el-menu-item>
        <!-- 教师申请的课题列表 -->
        <el-menu-item index="sInfoManagement">学生信息</el-menu-item>
      </el-submenu>
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
