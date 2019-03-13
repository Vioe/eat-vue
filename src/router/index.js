import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Header from "../components/Header"
import homeSwiper from "../components/home/homeSwiper"
import Home from "../components/home/Home"
import Login from "../components/login/Login"
import Activity from "../components/activity/Activity"
import ArticleRec from "../components/article/Article"
import Register from "../components/register/Register"
import Recipe from "../components/recipe/Recipe"
import DaRenDistrict from "../components/district/DaRenDistrict"
import personalCenter from "../components/user/user"
import addRecipe from "../components/recipe/addRecipe"
import recipeDetail from "../components/recipe/recipeDetail"



Vue.prototype.$ajax = axios;
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    //首页
    {path: '/', name: 'home', component: Home},
    //登入
    {path: '/login', name: 'login', component: Login},
    // 注册
    {path: '/register', name: 'register', component: Register},
    //逛菜谱
    {path: '/recipe', name: 'recipe', component: Recipe},
    //食享社区
    {path: '/article1', name: 'articleRec', component: ArticleRec},
    //达人区
    {path: '/district', name: 'district', component: DaRenDistrict},
    //活动
    {path: '/activity', name: 'activity', component: Activity},
    //个人中心
    {path: '/personalCenter', name: 'personalCenter', component: personalCenter},
    //写菜谱
    {path: '/addRecipe', name: 'addRecipe', component: addRecipe},
    //菜谱详情
    {path: '/recipe/recipeDetail', name: 'recipeDetail', component: recipeDetail}
  ]
})
