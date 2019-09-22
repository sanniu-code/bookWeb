<template>
  <div class="wrapper">
    该指导老师对应学生的课题信息
    <!-- 
      学生姓名
      学号
      专业
      班级
      课题名称
      任务状态
    -->
    <el-table :data="tableData" stripe border style="width: 100%"
    >
      
      <el-table-column align="center" prop="stuName" label="姓名" width="140"></el-table-column>
      <el-table-column align="center" prop="stuID" label="学号" width="140"></el-table-column>
      <el-table-column align="center" prop="type" label="专业" width="140"></el-table-column>
      <el-table-column align="center" prop="group" label="班级" width="140"></el-table-column>
      <el-table-column align="center" prop="taskStatus" label="任务状态" width="140"></el-table-column>
      <el-table-column align="center" prop="title" label="课题名称" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSubjects,getSubject,selectSubject } from "@/api/student.js";
export default {
  methods: {
  },
  data() {
    return {
      tableData: [{
            stuName: '曹存源',
            stuID: '20161103103',
            type: '计算机科学与技术',
            group: '1601班',
            taskStatus: '开题报告',
            title: '哈哈哈哈哈哈哈哈哈'
          },{
            stuName: '曹存源',
            stuID: '20161103103',
            type: '计算机科学与技术',
            group: '1601班',
            taskStatus: '开题报告',
            title: '哈哈哈哈哈哈哈哈哈'
          },{
            stuName: '曹存源',
            stuID: '20161103103',
            type: '计算机科学与技术',
            group: '1601班',
            taskStatus: '开题报告',
            title: '哈哈哈哈哈哈哈哈哈'
          },{
            stuName: '曹存源',
            stuID: '20161103103',
            type: '计算机科学与技术',
            group: '1601班',
            taskStatus: '开题报告',
            title: '哈哈哈哈哈哈哈哈哈'
          }]
    };

  },
  
};
</script>


<style lang="less" scoped>

</style>