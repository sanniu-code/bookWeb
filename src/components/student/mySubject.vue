<template>
  <div class="wrapper">
    <el-table :data="tableData" stripe :show-header="showHeader" style="width: 100%"
    >
      <el-table-column prop="name" label align="right" width="200px"></el-table-column>
      <el-table-column prop="content" label></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSubject } from '@/api/student.js'
export default {
  data() {
    return {
      showHeader:false,
      tableData: [
        // {
        //   name: "课题名称 :",
        //   content: "基于Spark的智慧交通综合管控平台的设计与实现"
        // },
        // {
        //   name: "课题类型 :",
        //   content: "设计"
        // },
        // {
        //   name: "课题ID :",
        //   content: "xxx"
        // },
        // {
        //   name: "指导老师 :",
        //   content: "白凤凤"
        // },
        // {
        //   name: "教师职称 :",
        //   content: "副教授"
        // },
        // {
        //   name: "教师学位 :",
        //   content: "硕士"
        // },
        // {
        //   name: "论文（设计）地点 :",
        //   content: "吕梁学院"
        // }
      ]
    };
  },
  methods:{
    getMySubject(){
      getSubject().then(res=>{
        if(res.data.code != 1){
          this.$message({
            type:"error",
            message:"网络异常"
          })
          return;
        }
        if(res.data.returnData == null){ return }
        const { detail,title,type,id,teacher,origin } = res.data.returnData;
        this.tableData = ([
          {
            name: "课题名称 :",
            content: detail
          },
          {
            name: "课题类型 :",
            content: type == 'A'?"设计":"论文"
          },
          {
            name: "课题ID :",
            content: id
          },
          {
            name: "指导老师 :",
            content: teacher.name
          },
          {
            name: "教师职称 :",
            content: teacher.professionRank
          },
          {
            name: "教师学位 :",
            content: teacher.degree
          },
          {
            name: "论文（设计）地点 :",
            content: origin == 'A'?"校内":"校外"
          }
        ])

      })
    }
  },
  created(){
    this.getMySubject();
  }
};
</script>


<style lang="less" scoped>
.wrapper {
  width: 70%;
  margin:50px auto;
}
</style>