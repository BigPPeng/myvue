<template>
  <div>
    <h3 style="margin-top: 0">咨询列表</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>咨询列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>


      <el-table :data="tableData" border style="width: 100%" typle="margin-top: 90px;">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="咨询人id" prop="consultantId" v-if="false"/>
        <el-table-column label="咨询姓名" prop="consultantName" />
        <el-table-column label="咨询标题" prop="consultationTitle" />
        <el-table-column label="咨询内容" prop="consultationContent" />
        <el-table-column label="咨询关键字" prop="consultationKeywords"  v-if="false"/>
        <el-table-column label="咨询时间" prop="consultationTime" />
        <el-table-column label="回复人" prop="responderId" v-if="false"/>
        <el-table-column label="回复人姓名" prop="responderName" />
        <el-table-column label="回复时间" prop="responseTime" />
        <el-table-column label="回复内容" prop="responseContent" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 咨询 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="clickReply(scope.row)">回复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <el-dialog title="回复" :visible.sync="dialogVisible" width="50%" @close="dialogVisible = false">
        <el-form :model="replay" ref="replay" label-width="120px">

          <el-form-item label="回复内容">
            <el-input type="textarea" :rows="2" v-model="replay.responderId" v-show="false"></el-input>
            <el-input type="textarea" :rows="2" v-model="replay.consultationId"  v-show="false"></el-input>
            <el-input type="textarea" :rows="2" placeholder="请输入回复内容" v-model="replay.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="replayCon()">回复</el-button>
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
      replay: {
        responderId: "",
        consultationId: "",
        content: "",
      },
    };
  },
  methods: {
    async getList() {
      const { data: aa } = await this.$http.post("/api/consultation/getAllConsultation");
      console.log(aa)
      this.tableData = aa.data;
    },
    clickReply(row) {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      this.dialogVisible = true;
      this.replay.responderId = userObj.id;
      this.replay.consultationId = row.id;
    },
    reset() {
      this.queryForm.userType = null,
        this.getList();
    },
    async replayCon() {
      console.log(this.replay)
      const { data: aa } = await this.$http.post("/api/consultation/responseConsultation", this.replay);
      console.log(aa)
      if (aa.status === 0) {
        this.$message.info("回复成功");
        this.replay.content = "";
          this.dialogVisible = false;
      } else {
        this.$message.info("回复失败：" + aa.message);
      }
      this.getList();
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