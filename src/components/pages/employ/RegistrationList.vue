<template>
    <div>
      <h3 style="margin-top: 0">报名列表</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>雇用农工</el-breadcrumb-item>
        <el-breadcrumb-item>报名列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>

  
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          typle="margin-top: 90px;"
        >
          <el-table-column label="id" prop="id" />
          <el-table-column label="招聘信息ID" prop="recruitmentInfoId" />
          <el-table-column label="申请人ID" prop="applicantId" v-if="false"/>
          <el-table-column label="申请人" prop="applicantName" v-if="false"/>
          <el-table-column label="申请时间" prop="applicationTime" />
          <el-table-column label="操作">
            <template slot-scope="scope">
          
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteApply(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
      };
    },

    methods: {
      async getList() {
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/recruitment/selectRecruitmentApplicationRecordByApplyUserId", {id:userObj.id});
      console.log(aa)
      this.tableData = aa.data;
    },
    //删除
    async deleteApply(row) {
      console.log(row)
      const id = row.id;
      const confirmResult = await this.$confirm('是否确认删除序号为"' + id + '"的报名信息?', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 成功删除为confirm 取消为 cancel
      if (confirmResult != 'confirm') {
        this.$refs.multipleTable.clearSelection();
        return this.$message.info("已取消删除");
      }
      const { data: bb } = await this.$http.post("/api/recruitment/delRecruitmentApplicationRecord", { id: row.id });
      this.$message.success(bb);
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