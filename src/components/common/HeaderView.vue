<template>
  <div class="header-container">
    <div class="r-content">
      <el-dropdown placement="bottom">
        <div>
          <img class="user_img" src="@/assets/WechatIMG2163.jpeg"  alt=""/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
export default {
  name: "HeaderView",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.header-container {
  height: 60px;
  background-color: #242f42;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  .r-content {
      
    .user_img {
      width: 40px;
      height: 40px;
      border-radius: 50%; /*圆角*/
    }
  }

}
</style>
