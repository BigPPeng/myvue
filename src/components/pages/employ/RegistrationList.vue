<template>
    <div>
      <h3 style="margin-top: 0">报名列表</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>雇用农工</el-breadcrumb-item>
        <el-breadcrumb-item>报名列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>

  
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          typle="margin-top: 90px;"
        >
          <el-table-column label="招工信息" prop="text" />
          <el-table-column label="申请时间" prop="time" />
          <el-table-column label="操作">
            <template slot-scope="scope">
          
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
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
            text: "招工落花生：80元/天，2024-03-15到2024-04-15，招10人。",
            time: "2024-03-18",
          }
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