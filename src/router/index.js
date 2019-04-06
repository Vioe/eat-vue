import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Header from "../components/Header"
import homeSwiper from "../components/home/homeSwiper"
import Home from "../components/home/Home"
import Login from "../components/login/Login"
import Activity from "../components/activity/Activity"
import ArticleRec from "../components/article/Article"
import articleDetail from "../components/article/articleDetail"
import Register from "../components/register/Register"
import Recipe from "../components/recipe/Recipe"
import DaRenDistrict from "../components/district/DaRenDistrict"
import personalCenter from "../components/user/user"
import addRecipe from "../components/recipe/addRecipe"
import recipeDetail from "../components/recipe/recipeDetail"
import reviseInfo from "../components/user/reviseInfo"
import admin from "../components/admin/admin"
import adminInfo from "../components/admin/adminInfo"
import articleManger from "../components/admin/articleManger"
import activityManger from "../components/admin/activityManger"
import addActivity from "../components/admin/addActivity"



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
    {path: '/article1', name: 'articleRec', component: ArticleRec,children:[
        // {path: "", component: ArticleRec},
        {path:':year/:month',component:ArticleRec}
      ]},
    //达人区
    {path: '/district', name: 'district', component: DaRenDistrict},
    //活动
    {path: '/activity/:activityId', name: 'activity', component: Activity},
    //个人中心
    {path: '/personalCenter', name: 'personalCenter', component: personalCenter},
    //写菜谱
    {path: '/addRecipe', name: 'addRecipe', component: addRecipe},
    //菜谱详情
    {path: '/recipeDetail/:detailsId', name: 'recipeDetail', component: recipeDetail},
    //用户信息修改
    {path: '/reviseInfo', name: 'reviseInfo', component: reviseInfo},
    //文章详情
    {path: '/articleDetail/:articleId', name: 'articleDetail', component: articleDetail},
    //后台管理员登入
    {path: '/admin', name: 'admin', component: admin},
    //后台管理员操作
    {path: '/adminInfo', name: 'adminInfo', component: adminInfo,children:[
      {path: "", component: activityManger},
      {path:'/articleManger',component:articleManger},
      {path:'/activityManger',component:activityManger},
      {path:'/addActivity',component:addActivity}
    ]},
    // {path: '/articleManger', name: 'articleManger', component: articleManger},
  ]
})
