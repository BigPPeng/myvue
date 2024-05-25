import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

//配置
Vue.use(ElementUI);
Vue.config.productionTip = false

//配置axios
// axios.default.baseURL="http://localhost:8082/"
Vue.prototype.$http = axios  //修改内部的$http为axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
