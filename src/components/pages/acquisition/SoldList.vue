<template>
    <div>
      <h3 style="margin-top: 0">售出列表</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>农产品收购</el-breadcrumb-item>
        <el-breadcrumb-item>售出列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
   
  
        <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
          <el-table-column label="农产品名称" prop="name" />  
          <el-table-column label="售出时间" prop="date" />
          <el-table-column label="售出数量" prop="number" />
          <el-table-column label="售出单价(元/斤)" prop="price" />
          <el-table-column label="收购商" prop="acquirer" />

          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 咨询 -->
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
            name: "小麦",
            date: "2024-4-15",
            number: "300",
            price: "1.4",
            acquirer: "收购小麦",
          },
          {
            name: "大豆",
            date: "2024-4-15",
            number: "300",
            price: "1.4",
            acquirer: "收购大豆",
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
  
