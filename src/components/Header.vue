<template>
     <div class="header w-all">
        <div class="topContent flex flex-btw flex-h-cen">
          <div class="left flex flex-h-cen">
            <div class="logo text-center">LOGO</div>
            <ul class="flex">
              <li v-for="(list,index) in lists" :class="{tapActive:num==index? true:false}" @click="num=index">
                <router-link tag="div" :to="list.top">{{list.name}}</router-link>
              </li>
            </ul>
          </div>
            <div class="right flex flex-h-cen">
              <!--未登入-->
              <div class="flex" v-if="isLogin">
                <router-link to="/login"><div class="login">登入</div></router-link>
                <router-link to="/register"><div>注册</div></router-link>
              </div>
              <!--登入-->
              <div class="icon" v-else>
                <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link flex flex-h-cen">
                      <i class="iconfont people icon-gerenzhongxin1"></i>余哎呀
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <router-link to="/personalCenter"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
                      <el-dropdown-item @click.native="setOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
        </div>
     </div>
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
      name: "Header",
      data(){
         return {
           lists:[
             {"name":"首页","top":"/"},
             {"name":"逛菜谱","top":"/recipe"},
             {"name":"食享社区","top":"/article1"},
             {"name":"达人区","top":"/recipeDetail"}
           ],
           num:0,
           login: null
         }
      },
      computed: mapGetters([
        "isLogin",
        "userId"
      ]),
      methods: {
        setOut(){
          localStorage.removeItem("userId");
          location.href = "/"
        }
      }
    }
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  font-size: 16px;
  position:relative;
  z-index:9999;
  height: 50px;
  background-color: #daeae8;
  box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.21);
}
.topContent{
  width: 1100px;
  margin: 0 auto;
}
.logo{
  width: 80px;
  height: 50px;
  line-height: 50px;
  background-color: white;
}
.left>ul>li{
  height: 50px;
  line-height: 50px;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
  color: #5e5e5e;
}
.left>ul>li>div{
  height: 100%;
}
.tapActive{
  border-bottom: 2px solid #7c6254;
}
.login{
  margin-right: 20px;
}
.right{
  color: #5e5e5e;
  .icon{
    i{
      font-size: 22px;
      margin-right: 5px;
    }
  }
}
</style>
