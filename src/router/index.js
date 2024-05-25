import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/components/common/HomeView.vue'
import LoginView from '@/components/common/LoginView.vue'

import NewsView from '@/components/pages1/NewsView.vue'
import UserList from '@/components/pages1/UserList.vue'
import IndexView1 from '@/components/pages1/IndexView1.vue'
/*
import IndexView from '@/components/pages/IndexView.vue'

import EmployNews from '@/components/pages/employ/EmployNews.vue'
import RegistrationList from '@/components/pages/employ/RegistrationList.vue'
import EmployList from '@/components/pages/employ/EmployList.vue'
import RentNews from '@/components/pages/rent/RentNews.vue'
import RentalList from '@/components/pages/rent/RentalList.vue'
import RentList from '@/components/pages/rent/RentList.vue'
import ExpertList from '@/components/pages/service/ExpertList.vue'
import ServiceList from '@/components/pages/service/ServiceList.vue'
import ProductNews from '@/components/pages/shopping/ProductNews.vue'
import ProductOrder from '@/components/pages/shopping/ProductOrder.vue'
import SoldList from '@/components/pages/acquisition/SoldList.vue'
*/


// 确保使用VueRouter 
Vue.use(VueRouter)

const routes = [
  {  
    path: '/',  
    name: 'LoginView',  
    component: LoginView  
  },  
  // 注册页面，可以设置一个特定的路由路径  
 
  // 首页，也设置一个特定的路由路径  
  {  
    path: '/HomeView',  
    name: 'HomeView',  
    component: HomeView, 
    // 可以添加meta字段来控制路由的权限，例如是否需要登录后才能访问  
    // meta: { requiresAuth: true }  
    meta: { requiresAuth: true },

  /*children: [      //用户菜单栏
      {
        path: '/IndexView',
        name: 'IndexView',
        component: IndexView
       
      },
      {
        path: '/EmployNews',
        name: 'EmployNews',
        component: EmployNews
     
      },
      {
        path: '/RegistrationList',
        name: 'RegistrationList',
        component: RegistrationList
     
      },
      {
        path: '/EmployList',
        name: 'EmployList',
        component: EmployList
        
      },
      {
        path: '/RentNews',
        name: 'RentNews',
        component: RentNews
      
      },
      {
        path: '/RentalList',
        name: 'RentalList',
        component: RentalList
       
      },
      {
        path: '/RentList',
        name: 'RentList',
        component: RentList
       
      },
      {
        path: '/ExpertList',
        name: 'ExpertList',
        component: ExpertList
      
      },
      {
        path: '/ServiceList',
        name: 'ServiceList',
        component: ServiceList
        
      },
      {
        path: '/ProductNews',
        name: 'ProductNews',
        component: ProductNews
       
      },
      {
        path: '/ProductOrder',
        name: 'ProductOrder',
        component: ProductOrder
    
      },
      {
        path: '/SoldList',
        name: 'SoldList',
        component: SoldList
      
      }
    ]
    */
    children: [      //管理员菜单栏
    {
      path: '/IndexView1',
      name: 'IndexView1',
      component: IndexView1
     
    },
    {
      path: '/NewsView',
      name: 'NewsView',
      component: NewsView
   
    },
    {
      path: '/UserList',
      name: 'UserList',
      component: UserList
   
    },
    ]
  },  
]

const router = new VueRouter({
  routes
})

  

export default router
