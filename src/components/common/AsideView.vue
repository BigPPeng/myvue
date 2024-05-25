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
            label: "商品采购",
            icon: "shopping-cart-2",
            name: "shopping",
            children: [
                {
                    path: "/ProductNews",
                    name: "productnews",
                    label: "商品信息",
                    icon: "setting",
                    url: "shopping/productnews",
                },
                {
                    path: "/ProductOrder",
                    name: "order",
                    label: "订单列表",
                    icon: "setting",
                    url: "shopping/order",
                }
            ]
          },
          {
            label: "农具租用",
            icon: "date",
            name: "rent",
            children: [
                {
                    path: "/RentNews",
                    name: "rentnews",
                    label: "发布租用信息",
                    icon: "setting",
                    url: "rent/rentnews",
                },
                {
                    path: "/RentalList",
                    name: "rentallist",
                    label: "出租列表",
                    icon: "setting",
                    url: "rent/rentallist",
                },
                {
                    path: "/RentList",
                    name: "data",
                    label: "租用列表",
                    icon: "setting",
                    url: "rent/rentLis",
                }
            ]
          },
          {
            label: "雇用农工",
            icon: "date",
            name: "employ",
            children: [
                {
                    path: "/EmployNews",
                    name: "employnews",
                    label: "发布雇用信息",
                    icon: "setting",
                    url: "employ/employnews",
                },
                {
                    path: "/RegistrationList",
                    name: "registrationlist",
                    label: "报名列表",
                    icon: "setting",
                    url: "employ/registrationlist",
                },
                {
                    path: "/EmployList",
                    name: "employlist",
                    label: "雇用列表",
                    icon: "setting",
                    url: "employ/employlist",
                }
            ]
          },
          {
            label: "农产品收购",
            icon: "shopping-cart-2",
            name: "acquisition",
            children: [
                {
                    path: "/SoldList",
                    name: "sold",
                    label: "售出列表",
                    icon: "setting",
                    url: "acquisition/sold",
                }
            ]
          },
          {
            label: "农业咨询",
            icon: "service",
            name: "service",
            children: [
                {
                    path: "/ExpertList",
                    name: "expert",
                    label: "农业专家",
                    icon: "setting",
                    url: "service/expert",
                },
                {
                    path: "/ServiceList",
                    name: "serviceMessage",
                    label: "咨询历史",
                    icon: "setting",
                    url: "service/serviceMessage",
                }
            ]
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