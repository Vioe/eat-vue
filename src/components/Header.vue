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
            <div class="right flex">
              <router-link to="/login"><div class="login">登入</div></router-link>
              <router-link to="/register"><div>注册</div></router-link>
            </div>
        </div>
     </div>
</template>

<script>
    export default {
      name: "Header",
      data(){
         return {
           lists:[
             {"name":"首页","top":"/"},
             {"name":"逛菜谱","top":"/recipe"},
             {"name":"食享社区","top":"/activity"},
             {"name":"达人区","top":"/personalCenter"}
           ],
           num:0
         }
      },
      methods: {

      }
    }
</script>

<style scoped >
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
}
</style>
