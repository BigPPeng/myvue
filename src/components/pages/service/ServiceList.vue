<template>
  <div>
    <h3 style="margin-top: 0">农业咨询</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>农业咨询</el-breadcrumb-item>
      <el-breadcrumb-item>咨询历史</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="25">
        <el-form ref="queryForm" label-width="80px" :inline="true">
          <el-form-item label="专家姓名" prop = "responderName">
            <el-input v-model="queryForm.responderName"></el-input>
          </el-form-item>

          <!-- 搜索框 -->
          <el-form-item>
            <el-button type="primary" @click="getListByParam()">搜索</el-button>
            <el-button type="primary" @click="reset()">重置</el-button>
            <el-button type="primary" @click="add()" style="position: absolute; right: -900px;">咨询</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
        <el-table-column label="id" prop="id" />
        <el-table-column label="咨询人id" prop="consultantId" />
        <el-table-column label="咨询人" prop="consultantName" />
        <el-table-column label="咨询时间" prop="consultationTime" />
        <el-table-column label="咨询" prop="consultationContent" />
        <el-table-column label="咨询关键词" prop="consultationKeywords" />
        <el-table-column label="专家姓名" prop="responderName" />
        <el-table-column label="专家id" prop="responderId" />
        <el-table-column label="回复时间" prop="responseTime" />
        <el-table-column label="回答内容" prop="responseContent" />
        <el-table-column label="操作">
          <template slot-scope="scope">

            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <!-- 对话框 -->
        <el-dialog title="咨询" :visible.sync="dialogVisible" width="50%" @close="dialogVisible = false">
        <el-form :model="publishNews" ref="registerForm" label-width="120px">1
          <el-form-item label="咨询ID"  v-show="false">
            <el-input placeholder="咨询ID" v-model="publishNews.consultantId"></el-input>
          </el-form-item>
          <el-form-item label="咨询人姓名">
            <el-input placeholder="咨询人姓名" v-model="publishNews.consultantName"></el-input>
          </el-form-item>
          <el-form-item label="咨询时间">
            <el-input placeholder="咨询时间" v-model="publishNews.consultationTime"></el-input>
          </el-form-item>
          <el-form-item label="关键词"   v-show="false">
            <el-input placeholder="关键词" v-model="publishNews.consultationKeywords"></el-input>
          </el-form-item>
          <el-form-item label="咨询标题"   v-show="false">
            <el-input placeholder="请输入咨询标题" v-model="publishNews.consultationTitle"></el-input>
          </el-form-item>
          <el-form-item>
          <el-form-item label="咨询内容"   v-show="false">
            <el-input placeholder="请输入咨询内容" v-model="publishNews.consultationContent"></el-input>
          </el-form-item>
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
      tableData: [
      ],
      dialogVisible : false,
      queryForm: {
        id:"",
        responderName:""
      },
      publishNews :{
        consultantId:"",
        consultantName:"",
        consultationTime:"",
        consultationKeywords:"",
        consultationTitle:"",
        consultationContent:"",
      }
    };
  },

  methods: {
    add() {

    },

    async getListByParam() {
      if (this.queryForm.responderName === "") {
          this.getList();
          return;
      }
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      this.queryForm.id = userObj.id;
      const { data: aa } = await this.$http.post("/api/consultation/publishConsultation", this.queryForm);
      console.log(aa)
      this.tableData = aa.data;
    },
    //搜索获取列表信息
    async getList() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/consultation/getConsultationByPublisherId", { id: userObj.id });
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
