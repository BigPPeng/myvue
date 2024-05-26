<template>
    <div>
      <h3 style="margin-top: 0">发布收购信息</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布收购信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="25">
  
      <el-col :span="5">
        <el-button type="primary" @click="dialogVisible = true"
            >发布收购信息</el-button>
      </el-col>
    
    </el-row>
  
        <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
          <el-table-column label="商品名称" prop="productName" />  
          <el-table-column label="商品价格" prop="price" />
          <el-table-column label="上架数量" prop="quantity" />
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
         <!-- 对话框 -->
      <el-dialog
        title="上架商品信息"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogVisible = false"
      >
        <el-form :model="registerForm" ref="registerForm" label-width="120px">
          <el-form-item label="商品名称">
            <el-input placeholder="请输入商品名称" v-model="registerForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input placeholder="请输入商品价格" v-model="registerForm.price"></el-input>
          </el-form-item>
          <el-form-item label="上架数量">
            <el-input placeholder="上架数量" v-model="registerForm.quantity"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')"
              >上架</el-button
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
    data() {
      return {
        tableData: [
          {
            productName: "农药",
            price: "8",
            quantity: 10,
          },
          {
            productName: "农药",
            price: "8",
            quantity: 10,
          },
        ],
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
  },
  };
  </script>
  
  <style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 17px;
  }
  </style>