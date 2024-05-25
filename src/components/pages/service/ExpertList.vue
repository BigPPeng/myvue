<template>
    <div>
      <h3 style="margin-top: 0">农业咨询</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>农业咨询</el-breadcrumb-item>
        <el-breadcrumb-item>农业专家</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="25">
  


</el-row>
  
        <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
          <el-table-column label="专家姓名" prop="name" />  
          <el-table-column label="专家简介" prop="data" />

          <el-table-column label="操作">
            <template >
              <!-- 咨询 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="dialogVisible = true"
              >咨询</el-button>
            </template>
          </el-table-column>
        </el-table>
  <!-- 对话框 -->
  <el-dialog
        title="咨询"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogVisible = false"
      >
        <el-form :model="registerForm" ref="registerForm" label-width="120px">
          <el-form-item label="咨询标题">
            <el-input placeholder="请输入咨询标题" v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="咨询内容">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入咨询内容"
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
    data() {
      return {
        tableData: [
          {
            name: "小王",
            data: "擅长小麦生长方面",
          },
          {
              name: "大王",
            data: "擅长病虫害防治",
          },
          {
              name: "小李",
            data: "擅长土壤、地质方面问题",
          },
          {
            name: "大李",
            data: "擅长玉米生长方面",
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
  