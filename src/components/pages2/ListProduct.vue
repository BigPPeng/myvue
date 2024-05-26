<template>
  <div>
    <h3 style="margin-top: 0">上架商品</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>上架商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="25">

        <el-col :span="5">
          <el-button type="primary" @click="gotoPublish()">上架商品信息</el-button>
        </el-col>

      </el-row>

      <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
        <el-table-column label="id" prop="id" />
        <el-table-column label="商品名称" prop="productName" />
        <el-table-column label="租售类型" prop="rentSaleType" v-if="false" />
        <el-table-column label="状态" prop="productStatus"  v-if="false" />
        <el-table-column label="商品类型" prop="productType" v-if="false" />
        <el-table-column label="价格" prop="price" />
        <el-table-column label="库存数量" prop="quantity" />
        <el-table-column label="卖家ID" prop="sellerUserId"   v-if="false" />
        <el-table-column label="开始售卖时间" prop="startTime" />
        <el-table-column label="结束售卖时间" prop="endTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)">修改</el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteProduct(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <el-dialog title="上架商品信息" :visible.sync="dialogVisible" width="50%" @close="dialogVisible = false">
        <el-form :model="publishForm" ref="registerForm" label-width="120px">
          <el-form-item label="id" v-show="false">
            <el-input placeholder="id" v-model="publishForm.id"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input placeholder="请输入商品名称" v-model="publishForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="租售类型"  v-show="false">
            <el-input placeholder="请输入租售类型" v-model="publishForm.rentSaleType"></el-input>
          </el-form-item>
          <el-form-item label="状态"  v-show="false">
            <el-input placeholder="状态" v-model="publishForm.productStatus"></el-input>
          </el-form-item>
          <el-form-item label="商品类型"  v-show="false">
            <el-input placeholder="商品类型" v-model="publishForm.productType"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input placeholder="请输入商品价格" v-model="publishForm.price"></el-input>
          </el-form-item>
          <el-form-item label="上架数量">
            <el-input placeholder="请输入上架数量" v-model="publishForm.quantity"></el-input>
          </el-form-item>
          <el-form-item label="卖家ID"  v-show="false">
            <el-input placeholder="卖家ID" v-model="publishForm.sellerUserId"></el-input>
          </el-form-item>
          <el-form-item label="开始售卖时间">
            <el-input placeholder="开始售卖时间" v-model="publishForm.startTime"></el-input>
          </el-form-item>
          <el-form-item label="结束售卖时间">
            <el-input placeholder="结束售卖时间" v-model="publishForm.endTime"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">上架</el-button>
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
      tableData: [],
      dialogVisible: false,
      registerForm: {
        id: "",
        productName: "",
        rentSaleType: "", 
        productStatus: "",
        productType: "",
        price: "",
        quantity: "",
        sellerUserId: "",
        startTime: "",
        endTime: "",
      },
    };
  },
  methods: {
    gotoPublish(){
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      this.publishForm.publisherId = userObj.id;
      this.dialogVisible =true;
    },
       //搜索获取列表信息
       async getList() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/product/getAllSaleProduct", {id:userObj.id});
      console.log(aa)
      this.tableData = aa.data;
    },
    //删除
    async deleteProduct(row) {
      console.log(row)
      const id = row.id;
      const confirmResult = await this.$confirm('是否确认删除序号为"' + id + '"的商品?', "提示", {
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

    async submitForm() {
      const { data: aa } = await this.$http.post("/api/argiNews/publishNews", this.publishForm);
      // status ==0 表示成功，成功后要关闭弹窗，并且清空弹窗中的内容，刷新列表
      if (aa.status === 0) {
        this.publishForm.publisherId = "";
        this.publishForm.title = "";
        this.publishForm.keywords = "";
        this.publishForm.source = "";
        this.publishForm.content = "";
        this.dialogVisible =false;
        this.$message.success("发布成功");
        this.getList();
      } else{
        this.$message.success("发布失败"+aa.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
</style>