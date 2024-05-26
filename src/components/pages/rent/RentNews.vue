<template>
  <div>
    <h3 style="margin-top: 0">发布租用信息</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>农具租用</el-breadcrumb-item>
      <el-breadcrumb-item>发布租用信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="25">

        <el-col :span="5">
          <el-button type="primary" @click="gotoPublish()">发布租用信息</el-button>
        </el-col>

      </el-row>

      <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
        <el-table-column label="id" prop="id" />  
        <el-table-column label="农具名称" prop="productName" />
        <el-table-column label="租售类型" prop="rentSaleType" v-if="false"/>
        <el-table-column label="状态" prop="productStatus" v-if="false"/>
        <el-table-column label="商品类型" prop="productType" v-if="false"/>
        <el-table-column label="租用价格" prop="price" />
        <el-table-column label="出租数量" prop="quantity" />
        <el-table-column label="卖家ID" prop="sellerUserId" v-if="false"/>
        <el-table-column label="开始租用时间" prop="startTime" />
        <el-table-column label="结束租用时间" prop="endTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)">修改</el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <el-dialog title="发布租用信息" :visible.sync="dialogVisible" width="50%" @close="dialogVisible = false">
        <el-form :model="publishRent" ref="registerForm" label-width="120px">
          <el-form-item label="类型"  v-show="false">
            <el-input placeholder="请输入标题" v-model="publishRent.productType"></el-input>
          </el-form-item>
          <el-form-item label="出租价格">
            <el-input placeholder="请输入出租价格" v-model="publishRent.price"></el-input>
          </el-form-item>
          <el-form-item label="出租数量">
            <el-input placeholder="请输入出租数量" v-model="publishRent.quantity"></el-input>
          </el-form-item>
          <el-form-item label="出租人ID"   v-show="false">
            <el-input placeholder="请输入标题" v-model="publishRent.sellerUserId"></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="submitForm()">发布</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      //搜索获取列表信息
      async getList() {
        let user = window.sessionStorage.getItem('user');
        let userObj = JSON.parse(user);
        const { data: aa } = await this.$http.post("/api/product/getAllRentProductByPublishId", { id: userObj.id });
        console.log(aa)
        this.tableData = aa.data;
      },
      tableData: [],
      dialogVisible: false,
      publishRent: {
        productType: "",
        price: "",
        quantity: "",
        sellerUserId: "",
      },
    };
  },
  methods: {
    gotoPublish() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      this.publishRent.sellerUserId = userObj.id;
      this.dialogVisible = true;
    },
    async submitForm() {
      const { data: aa } = await this.$http.post("/api/product/addRentProduct", this.publishRent);
      // status ==0 表示成功，成功后要关闭弹窗，并且清空弹窗中的内容，刷新列表
      if (aa.status === 0) {
        this.publishRent.productType = "";
        this.publishRent.price = "";
        this.publishRent.quantity = "";
        this.publishRent.sellerUserId = "";
        this.dialogVisible = false;
        this.$message.success("发布成功");
        this.getList();
      } else {
        this.$message.fail("发布失败" + aa.message);
      }
    },
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

};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
</style>