<template>
  <div>
    <h3 style="margin-top: 0">订单列表</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品采购</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="25">
        <el-form ref="queryForm" label-width="80px" :inline="true">
          <el-form-item label="商品名称" prop="movieName">
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
        <el-table-column label="id" prop="id" />  
        <el-table-column label="商品ID" prop="productId" v-if="false"/>
        <el-table-column label="数量" prop="quantity" />
        <el-table-column label="价格" prop="price" />
        <el-table-column label="卖家ID" prop="sellerUserId" v-if="false"/>
        <el-table-column label="买家ID" prop="buyerUserId" v-if="false"/>
        <el-table-column label="购买时间" prop="purchaseTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scope.row)"
            >修改</el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteOrder(scope.row)"
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
  created() {
    this.getList();
  },
  data() {
    return {
      tableData: [],
    };
  },

  methods: {
    //搜索获取列表信息
    async getList() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/product/getBuyOrderByUserId", {id:userObj.id});
      console.log(aa)
      this.tableData = aa.data;
    },
    //删除
    async deleteOrder(row) {
      console.log(row)
      const id = row.id;
      const confirmResult = await this.$confirm('是否确认删除序号为"' + id + '"的订单?', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 成功删除为confirm 取消为 cancel
      if (confirmResult != 'confirm') {
        this.$refs.multipleTable.clearSelection();
        return this.$message.info("已取消删除");
      }
      const { data: bb } = await this.$http.post("/api/product/deleteSaleProduct", { id: row.id });  //改deleteSaleProduct，现在的接口是所有商品的列表删除接口，现在需要供应商订单删除接口
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
