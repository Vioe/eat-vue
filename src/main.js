// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './style.css'
import './publicStyle/common.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import global_ from './components/global.vue'
import axios from 'axios'
// Vue.prototype.$ajax = axios;
// axios.defaults.baseURL=global_.BASE_URL;

// Vue.prototype.GLOBAL = global_;
var instance = axios.create({
  baseURL:'',
  timeout:5000,
  headers:{"Content-Type":"multipart/form-data"}
});

Vue.prototype.instance=instance;
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
