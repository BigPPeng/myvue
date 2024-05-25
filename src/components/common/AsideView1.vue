<template>
<div class="asideContain">  
<el-menu 
      default-active="1-4-1" 
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isCollapse" 
      background-color="rgb(50,65,87)"
      text-color="#fff"
      active-text-color="#ffd04b"
>
<h3>现代农业服务平台</h3>  
<!--没有二级菜单-->
<el-menu-item 
 v-for="item in noChildren" 
 :key="item.name" 
 :index="item.name"
 @click="clickMenu(item)"
 >
    <i :class="['el-icon-'+item.icon]"></i>
    <span slot="title">{{item.label}}</span>
</el-menu-item>


<!--有二级菜单-->
<el-submenu 
v-for="item in hasChildren" 
:key="item.name" 
:index="item.name"
>
    <template slot="title">
      <i :class="['el-icon-'+item.icon]"></i>
      <span slot="title">{{ item.label }}</span>
    </template>
    <el-menu-item-group 
    v-for="subItem in item.children" 
    :key="subItem.name"
    
    >
      <el-menu-item index="subItem.name" @click="clickMenu(subItem)">{{subItem.label}}</el-menu-item>
    </el-menu-item-group>
</el-submenu>

</el-menu>

    </div>
</template>

<style lang="less" scoped>
  .el-menu{
    height: 100vh;
    border-right: none;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
  }
</style>

<script>
  export default {
    name:'AsideView',
    data() {

      return {
        isCollapse: false,
        menuData: [  //定义数据
          {
            path: "/",
            name: "main",
            label: "首页",
            icon: "s-home",
            url: "HomeView/HomeView",
          },
          {
            path: "/NewsView",
            name: "news",
            label: "上传资讯信息",
            icon: "upload",
            url: "NewsView/NewsView",
          },
          {
            path: "/UserList",
            name: "userlist",
            label: "用户列表",
            icon: "s-custom",
            url: "UserList/UserList",
          }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },clickMenu(item){
        //console.log(item)
        if(this.$route.push != item.path && !(this.$route.path === '/IndexView' && item.path ==='/')){
          this.$router.push(item.path)
        }
      
      }
    },computed:{
        hasChildren(){
            //过滤获取所有的有二级菜单的数据
            return this.menuData.filter(item => item.children)
        },noChildren(){
            //过滤所有只有一级菜单的数据
            return this.menuData.filter(item => !item.children)
        }
    }
  };
</script>