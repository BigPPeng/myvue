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
        <el-table-column label="商品名称" prop="name" />  
        <el-table-column label="购买时间" prop="date" />
        <el-table-column label="单价" prop="price" />
        <el-table-column label="数量" prop="num" />
        <el-table-column label="发货地址" prop="address" />
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
          name: "除草剂",
          date: "2024-03-15",
          price: "1",
          num: "5",
          address: "小王村",
        },
        {
            name: "玉米种子",
          date: "2024-03-16",
          price: "10",
          num: "3",
          address: "小王村",
        },
        {
            name: "玉米种子",
          date: "2024-03-16",
          price: "10",
          num: "3",
          address: "小王村",
        },
        {
            name: "玉米种子",
          date: "2024-03-16",
          price: "10",
          num: "3",
          address: "小王村",
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
