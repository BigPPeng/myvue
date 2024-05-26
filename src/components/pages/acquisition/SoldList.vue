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
          <el-table-column label="ID" prop="id" />
          <el-table-column label="农产品名称" prop="name" />  
          <el-table-column label="售出时间" prop="date" />
          <el-table-column label="售出数量" prop="number" />
          <el-table-column label="售出单价(元/斤)" prop="price" />
          <el-table-column label="收购商" prop="acquirer" />

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="Delete(scope.row)">删除</el-button>
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
 
    methods: {
    //搜索获取列表信息
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
    //删除
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
    //取消
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
  
