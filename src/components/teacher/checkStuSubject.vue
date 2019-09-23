<template>
  <div class="wrapper">
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
      
      <el-table-column align="center" prop="name" label="姓名" width="140"></el-table-column>
      <el-table-column align="center" prop="username" label="学号" width="140"></el-table-column>
      <el-table-column align="center" prop="profession" label="专业" width="140"></el-table-column>
      <el-table-column align="center" prop="className" label="班级" width="140"></el-table-column>
      <el-table-column align="center" prop="status" label="任务状态" width="140"></el-table-column>
      <el-table-column align="center" prop="title" label="课题名称" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentList } from "@/api/teacher.js";
export default {
  methods: {
  },
  data() {
    return {
      tableData: []
    };

  },
  methods:{
    init(){
      this.getStudentList();
    },
    getStudentList(){
      getStudentList().then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:'fail',
            message:"网络异常"
          })
          return;
        }
        this.tableData = res.data.returnData;

      })
    }
    
  },
  created(){
    this.init();
  }
  
};
</script>


<style lang="less" scoped>

</style>