<template>
  <div>
    <h3 style="margin-top: 0">发布雇用信息</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>雇用农工</el-breadcrumb-item>
      <el-breadcrumb-item>发布雇用信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="25">
        <el-col :span="5">
          <el-button type="primary" @click="dialogVisible = true"
            >发布雇用信息</el-button
          >
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        typle="margin-top: 90px;"
      >
        <el-table-column label="标题" prop="name" />
        <el-table-column label="发布时间" prop="date" />
        <el-table-column label="内容" prop="text" />
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
  data() {
    return {
      tableData: [
        {
          name: "【南地招工】招",
          date: "2024-2-8",
          text: "招工落花生：80元/天，2024-03-15到2024-04-15，招10人。",
        },
        {
          name: "【南地招工】招",
          date: "2024-2-8",
          text: "招工落花生：80元/天，2024-03-15到2024-04-15，招10人。",
        },
        {
          name: "【南地招工】招",
          date: "2024-2-8",
          text: "招工落花生：80元/天，2024-03-15到2024-04-15，招10人。",
        },
        {
          name: "【南地招工】招",
          date: "2024-2-8",
          text: "招工落花生：80元/天，2024-03-15到2024-04-15，招10人。",
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
