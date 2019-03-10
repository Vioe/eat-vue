import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

function isLogin() {
  var login = {};
  login.userId = localStorage.getItem("userId");
  if (login.userId) {
    login.isLogin = false;
  } else {
    login.isLogin = true;
  }
  console.log(login)
  return login;
}
//导出Vuex的实例
export default new Vuex.Store({
  state: {
    userId: isLogin().userId,
    isLogin: isLogin().isLogin
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    userId(state){
      return state.userId;
    },
  },
  mutations: {
    loginStatus(state,p){

    }
  }
})
