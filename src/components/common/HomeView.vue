<template>
    <div id="hello">
      <el-container>
        <el-aside width="200px">
          <!--改  原本 <asideView></asideView> -->
            <AsideView1></AsideView1> 
        </el-aside>
        <el-container>
          <el-header>
            <HeaderView></HeaderView>
          </el-header>
          <el-main>
            <!--路由的出口-->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>

   
   import AsideView1 from '@/components/common/AsideView1.vue'//引入组件
   import HeaderView from '@/components/common/HeaderView.vue'//引入组件
    export default {
        name: 'HomeView',
        data(){
            return{
                msg: "H",
            };
        },components:{ //定义组件？
            AsideView1,  //改  原本 AsideView
            HeaderView
        }
    }
  </script>
 
  <style scoped>
  .el-header{
    padding: 0 0;
  }
  </style>