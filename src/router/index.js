import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/components/common/HomeView.vue'
import LoginView from '@/components/common/LoginView.vue'
import IndexView1 from '@/components/pages1/IndexView1.vue'

import NewsView from '@/components/pages1/NewsView.vue'
import UserList from '@/components/pages1/UserList.vue'

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

import ListProduct from '@/components/pages2/ListProduct.vue'
import OrderList from '@/components/pages2/OrderList.vue'

import AcquisitionNews from '@/components/pages3/AcquisitionNews.vue'
import AcquisitionList from '@/components/pages3/AcquisitionList.vue' 

import ConsultList from '@/components/pages4/ConsultList.vue'



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView,
    meta: { requiresAuth: false },
  },  
  {
    path: '/HomeView2',
    name: 'HomeView2',
    component: HomeView,
    // 可以添加meta字段来控制路由的权限，例如是否需要登录后才能访问  
    meta: { requiresAuth: true },
    children: [      //用户菜单栏
    {
      path: '/IndexView1',
      name: 'IndexView1',
      component: IndexView1,
      meta: { requiresAuth: true },
    },
    {
      path: '/NewsView',
      name: 'NewsView',
      component: NewsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/UserList',
      name: 'UserList',
      component: UserList,
      meta: { requiresAuth: true },
    },
      {
        path: '/EmployNews',
        name: 'EmployNews',
        component: EmployNews,
        meta: { requiresAuth: true },

      },
      {
        path: '/RegistrationList',
        name: 'RegistrationList',
        component: RegistrationList,
        meta: { requiresAuth: true },

      },
      {
        path: '/EmployList',
        name: 'EmployList',
        component: EmployList,
        meta: { requiresAuth: true },

      },
      {
        path: '/RentNews',
        name: 'RentNews',
        component: RentNews,
        meta: { requiresAuth: true },

      },
      {
        path: '/RentalList',
        name: 'RentalList',
        component: RentalList,
        meta: { requiresAuth: true },

      },
      {
        path: '/RentList',
        name: 'RentList',
        component: RentList,
        meta: { requiresAuth: true },

      },
      {
        path: '/ExpertList',
        name: 'ExpertList',
        component: ExpertList,
        meta: { requiresAuth: true },

      },
      {
        path: '/ServiceList',
        name: 'ServiceList',
        component: ServiceList,
        meta: { requiresAuth: true },

      },
      {
        path: '/ProductNews',
        name: 'ProductNews',
        component: ProductNews,
        meta: { requiresAuth: true },

      },
      {
        path: '/ProductOrder',
        name: 'ProductOrder',
        component: ProductOrder,
        meta: { requiresAuth: true },

      },
      {
        path: '/SoldList',
        name: 'SoldList',
        component: SoldList,
        meta: { requiresAuth: true },
      },
      {
        path: '/ListProduct',
        name: 'ListProduct',
        component: ListProduct,
        meta: { requiresAuth: true },
      },
      {
        path: '/OrderList',
        name: 'OrderList',
        component: OrderList,
        meta: { requiresAuth: true },
      },
      {
        path: '/AcquisitionNews',
        name: 'AcquisitionNews',
        component: AcquisitionNews,
        meta: { requiresAuth: true },
      },
      {
        path: '/AcquisitionList',
        name: 'AcquisitionList',
        component: AcquisitionList,
        meta: { requiresAuth: true },
      },
      {
        path: '/ConsultList',
        name: 'ConsultList',
        component: ConsultList,
        meta: { requiresAuth: true },
      },
    ]
  },
]

// 确保使用VueRouter 
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //console.log("跳转页from:"+from.fullPath + "  to:"+to.fullPath);
  let user = getUser();
  const isAuthenticated = (user === undefined);
  // console.log(isAuthenticated);
  // console.log("1111");
  // console.log(to.meta.requiresAuth);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      // 如果用户未登录且访问的是需要登录的页面，则重定向到登录页面
      next({ path: '/' });
      //console.log(4+"   "+to.fullPath);
    } else {
      //console.log(3+"   "+to.fullPath);
      // 如果用户已登录或访问的不是需要登录的页面，正常导航
      next();
    }
  } else {
    //console.dir(5+"   "+to.fullPath);
    if (to.fullPath == "/") {
      let user = getUser();
      //console.log(user);
      if (!(user === undefined) && user != null) {
        console.dir("已经登陆了，欢迎：" + user.username);
        next({ path: '/IndexView1' });
      }
      next();
    } else {
      next();
    }
  }


})

function getUser() {
  let user = window.sessionStorage.getItem('user');
  let userObj = JSON.parse(user);
  //console.log(userObj);
  return userObj;
}



export default router
