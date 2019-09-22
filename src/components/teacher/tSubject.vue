<template>
  <div class="wrapper">
    指导老师课题列表
    <el-table :data="tableData" stripe border style="width: 100%"
    >
      <el-table-column align="center" prop="title" label="课题名称" width="280"></el-table-column>
      <el-table-column align="center" prop="type" label="课题类型" width="80"></el-table-column>
      <el-table-column align="center" prop="id" label="课题ID" width="80"></el-table-column>
      <!-- <el-table-column align="center" prop="name" label="指导老师" width="80"></el-table-column>
      <el-table-column align="center" prop="professionRank" label="职称" width="80"></el-table-column>
      <el-table-column align="center" prop="degree" label="学位" width="80"></el-table-column> -->
      <el-table-column align="center" prop="detail" label="课题简介" width="250"></el-table-column>
    </el-table>
    
  </div>
</template>

<script>

export default {
  methods: {
  },
  data() {
    return {
      tableData: [{
            title: 'aaa',
            type: '设计',
            id: '0231665',
            detail: '哈哈哈哈哈哈哈哈哈'
          }]
    };

  },
  
};
</script>


<style lang="less" scoped>

</style>