<template>
    <div>
      <h3 style="margin-top: 0">收购列表</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>收购列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="25">
          <el-form ref="queryForm" :model="queryForm" label-width="80px" :inline="true">
            <el-form-item label="名称" prop="productName">
              <el-input v-model="queryForm.productName" ></el-input>
            </el-form-item>
  
            <!-- 搜索框 -->
            <el-form-item>
              <el-button type="primary" @click="getList()">搜索</el-button>
              <el-button type="primary" @click="reset()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
  
        <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
          <el-table-column label="ID" prop="id" />
          <el-table-column label="商品名称" prop="productName" />
          <el-table-column label="数量" prop="quantity" />
          <el-table-column label="买家" prop="buyerUserId" />
          <el-table-column label="购买时间" prop="purchaseTime" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改 -->
              <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)">修改</el-button> -->
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)">删除</el-button>
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
    created() {
      this.getList();
    },
    data() {
      return {
        queryForm:{
          userType:null
        },
        tableData: [],
      };
    },
    methods: {
      async getList() {
        let types = []; 
        if (this.queryForm.userType === null) {
          types = []; 
        } else {
          types = [this.queryForm.userType]
        }
        const { data: aa } = await this.$http.post("/api/user/getAllUserByType", {list: types});
        console.log(aa)
        this.tableData = aa.data;
      },
      async deleteUser(row) {
        console.log(row)
        const userName = row.username;
        const confirmResult = await this.$confirm('是否确认删除名称为"' + userName + '"的用户?', "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // 成功删除为confirm 取消为 cancel
        if (confirmResult != 'confirm') {
          this.$refs.multipleTable.clearSelection();
          return this.$message.info("已取消删除");
        }
        const { data: bb } = await this.$http.post("/api/user/deleteUser", { id: row.id });
        this.$message.success(bb);
        this.getList();
      },
      reset() {
        this.queryForm.userType = null,
        this.getList();
      }
    }
  
  };
  </script>
  
  <style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 17px;
  }
  </style>