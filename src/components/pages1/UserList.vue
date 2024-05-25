<template>
    <div>
      <h3 style="margin-top: 0">用户列表</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="25">
          <el-form ref="queryForm" label-width="80px" :inline="true">
            <el-form-item label="用户名" prop="movieName">
              <el-input></el-input>
            </el-form-item>
  
            <!-- 搜索框 -->
            <el-form-item>
              <el-button type="primary" @click="getList">搜索</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
  
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          typle="margin-top: 90px;"
        >
          <el-table-column label="用户名" prop="username"/>
          <el-table-column label="用户类型" prop="usertype" />
          <el-table-column label="密码" prop="password" />
          <el-table-column label="联系电话" prop="phone" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(scope.row)"
                >修改</el-button
              >
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
            username: "小刘",
            usertype: "供货商",
            password: "pass",
            phone: "1111111111",
          },
          {
            username: "小王",
            usertype: "农户",
            password: "pass",
            phone: "2222222222",
          },
          {
            username: "小张",
            usertype: "收购商",
            password: "pass",
            phone: "33333333333",
          },
          {
            username: "大王",
            usertype: "农业专家",
            password: "pass",
            phone: "4444444444",
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