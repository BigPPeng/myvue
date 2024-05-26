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
          <el-button type="primary" @click="gotoPublish()"
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
        <el-table-column label="id" prop="id" />
        <el-table-column label="雇用标题" prop="recruitmentTitle" />
        <el-table-column label="雇用时间" prop="recruitmentTime" />
        <el-table-column label="数量" prop="recruitmentQuantity" />
        <el-table-column label="工作描述" prop="jobDescription" />
        <el-table-column label="发布人" prop="recruiterUserId" v-if="false"/>
        <el-table-column label="发布时间" prop="publishTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)">修改</el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteNews(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <el-dialog
        title="发布雇用信息"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogVisible = false"
      >
        <el-form :model="publishRecr" ref="registerForm" label-width="120px">
          <el-input placeholder="请输入标题" v-model="publishRecr.recruitmentUserId" v-show="false"></el-input>
          <el-form-item label="标题">
            <el-input placeholder="请输入标题" v-model="publishRecr.title"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input placeholder="数量" v-model="publishRecr.recruitmentQuantity"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input placeholder="时间" v-model="publishRecr.recruitmentTime"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="publishRecr.jobDescription"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()"
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
      publishRecr: {
        recruitmentUserId: "",
        title: "",
        jobDescription: "", 
        recruitmentTime: "",
        recruitmentQuantity: "",
      },
    };
  },
  methods: {
    gotoPublish(){
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      this.publishRecr.recruitmentUserId = userObj.id;
      this.dialogVisible =true;
    },
    async submitForm() {
      const { data: aa } = await this.$http.post("/api/recruitment/publishRecruitmentInfo", this.publishRecr);
      // status ==0 表示成功，成功后要关闭弹窗，并且清空弹窗中的内容，刷新列表
      if (aa.status === 0) {
        this.publishRecr.recruitmentUserId = "";
        this.publishRecr.title = "";
        this.publishRecr.jobDescription = "";
        this.publishRecr.recruitmentTime = "";
        this.publishRecr.recruitmentQuantity = "";
        this.dialogVisible =false;
        this.$message.success("发布成功");
        this.getList();
      } else{
        this.$message.fail("发布失败"+aa.message);
      }
    },
    async getList() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/recruitment/selectRecruitmentInfoByRecruitmentUserId", {id:userObj.id});   //selectRecruitmentInfoByRecruitmentUserId对不？
      console.log(aa)
      this.tableData = aa.data;
    },
    
    //删除
    async deleteNews(row) {
      console.log(row)
      const id = row.id;
      const confirmResult = await this.$confirm('是否确认序号为"' + id + '"的雇用信息?', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 成功删除为confirm 取消为 cancel
      if (confirmResult != 'confirm') {
        this.$refs.multipleTable.clearSelection();
        return this.$message.info("已取消删除");
      }
      const { data: bb } = await this.$http.post("/api/recruitment/delRecruitmentInfo", { id: row.id });
      this.$message.success(bb);
      this.getList();
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
