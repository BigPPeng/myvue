<template>
    <div>
      <h3 style="margin-top: 0">发布资讯信息</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布资讯信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="25">
  
      <el-col :span="5">
        <el-button type="primary" @click="gotoPublish()"
            >发布资讯信息</el-button>
      </el-col>
    
    </el-row>
  
        <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
          <el-table-column label="id" prop="id" />
          <el-table-column label="标题" prop="title" />
          <el-table-column label="发布时间" prop="publishTime" />
          <el-table-column label="关键字" prop="publishKeywords" v-if="false"/>
          <el-table-column label="发布者" prop="publisher" v-if="false" />
          <el-table-column label="发布者ID" prop="publisherId" v-if="false" />  
          <el-table-column label="来源" prop="source" />
          <el-table-column label="内容" prop="content" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)">修改</el-button>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteNews(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
         <!-- 对话框 -->
      <el-dialog
        title="发布资讯信息"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogVisible = false"
      >
        <el-form :model="publishForm" ref="registerForm" label-width="120px">
            <el-input placeholder="id" v-model="publishForm.publisherId" v-show="false"></el-input>
          <el-form-item label="标题">
            <el-input placeholder="请输入标题" v-model="publishForm.title"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input placeholder="请输入关键字" v-model="publishForm.keywords" ></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input placeholder="请输入来源" v-model="publishForm.source" ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="publishForm.content"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">发布</el-button><!--不用参数-->
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
        //发布的表单
      dialogVisible: false,
      publishForm: {
        publisherId: "",
        title: "",
        keywords: "", 
        source: "",
        content: "",
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
      async getList() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/argiNews/getNewsByPublisherId", {id:userObj.id});  //getNewsByPublisherId还是getAllNews 
      console.log(aa)
      this.tableData = aa.data;
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
     //删除
     async deleteNews(row) {
      console.log(row)
      const id = row.id;
      const confirmResult = await this.$confirm('是否确认删除序号为"' + id + '"的资讯信息?', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 成功删除为confirm 取消为 cancel
      if (confirmResult != 'confirm') {
        this.$refs.multipleTable.clearSelection();
        return this.$message.info("已取消删除");
      }
      const { data: bb } = await this.$http.post("/api/argiNews/delNews", { id: row.id });  //
      this.$message.success(bb);
      this.getList();
    },
    //取消
    reset() {
      this.queryForm.userType = null,
      this.getList();
    }
  },
  };
  </script>
  
  <style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 17px;
  }
  </style>