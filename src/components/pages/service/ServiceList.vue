<template>
    <div>
      <h3 style="margin-top: 0">农业咨询</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>农业咨询</el-breadcrumb-item>
        <el-breadcrumb-item>咨询历史</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="25">
          <el-form ref="queryForm" label-width="80px" :inline="true">
            <el-form-item label="专家姓名" prop="movieName">
              <el-input></el-input>
            </el-form-item>
  
            <!-- 搜索框 -->
            <el-form-item>
              <el-button type="primary" @click="getList">搜索</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
  
        <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
          <el-table-column label="专家姓名" prop="name" />  
          <el-table-column label="咨询时间" prop="date" />
          <el-table-column label="咨询内容" prop="text" />
          <el-table-column label="回答时间" prop="time" />
          <el-table-column label="回答内容" prop="context" />
          <el-table-column label="操作">
            <template slot-scope="scope">

        
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination></el-pagination>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: "小王",
            date: "2024-03-15",
            text: "1",
            time: "2024-03-15",
            context: "2",
            
          },
          {
              name: "大王",
            date: "2024-04-15",
            text: "1",
            time: "2024-04-15",
            context: "2",
          },
          {
            name: "小李",
            date: "2024-05-15",
            text: "1",
            time: "2024-05-15",
            context: "2",
          },
          {
            name: "大李",
            date: "2024-05-16",
            text: "1",
            time: "",
            context: "",
          },
        ],
      };
    },
  };
  </script>
  
  <style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 17px;
}
</style>
