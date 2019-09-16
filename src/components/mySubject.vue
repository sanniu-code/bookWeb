<template>
  <div class="wrapper">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
        <el-table-column
          prop="date"
          label="" 
          class="title"
          align="right">
        </el-table-column>
        <el-table-column
          prop="name"
          label=""
          width="400">
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '课题名称 :',
          name: '基于Spark的智慧交通综合管控平台的设计与实现',
        }, {
          date: '课题类型 :',
          name: '设计',
        }, {
          date: '课题ID :',
          name: 'xxx',
        }, {
          date: '指导老师 :',
          name: '白凤凤',
          }, {
          date: '教师职称 :',
          name: '副教授',
        }, {
          date: '教师学位 :',
          name: '硕士',
        }, {
          date: '论文（设计）地点 :',
          name: '吕梁学院',
        }]
      }
    }
  }
</script>


<style lang="less" scoped>
  .wrapper{
    width : 700px;
    margin-left : 100px;
  }
  .el-table_row:first-child {
    align: right;
  }
</style>