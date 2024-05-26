<template>
  <div>
    <h3 style="margin-top: 0">商品信息</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品采购</el-breadcrumb-item>
      <el-breadcrumb-item>商品信息</el-breadcrumb-item>
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
            <el-button type="primary" @click="add()" style="position: absolute; right: -900px;" >添加商品</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
        <el-table-column label="id" prop="id" />  
        <el-table-column label="商品名称" prop="productName" />
        <el-table-column label="租售类型" prop="rentSaleType" v-if="false"/>
        <el-table-column label="状态" prop="productStatus" />
        <el-table-column label="商品类型" prop="productType" v-if="false"/>
        <el-table-column label="价格" prop="price" />
        <el-table-column label="库存数量" prop="quantity" />
        <el-table-column label="卖家ID" prop="sellerUserId" v-if="false"/>
        <el-table-column label="开始售卖时间" prop="startTime" />
        <el-table-column label="结束售卖时间" prop="endTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-shopping-cart-2" size="mini" @click="edit(scope.row)">下单</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!-- 对话框 -->
       <el-dialog
        title="发布租用信息"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogVisible = false"
      >
        <el-form :model="registerForm" ref="registerForm" label-width="120px">
          <el-form-item label="标题">
            <el-input placeholder="请输入标题" v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')"
              >发布</el-button
            >
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
        username: "",
        password: "",
        identity: "", // 初始值可以是'farmer'、'supplier'或'buyer'中的任何一个，或者为空字符串
        phone: "",
        address: "",
      },
    };
  },

  methods: {
    //搜索获取列表信息
    async getList() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/product/getAllSaleProduct", {id:userObj.id});
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
    },
    
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("提交成功"); // 这里应该是一个异步请求来提交表单数据到服务器
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }

};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
</style>
