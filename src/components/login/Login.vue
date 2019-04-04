<template>
  <div>
    <div class="contentLogin">
      <div class="login">
        <h3 class="text-center tit">登入</h3>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item class="text-center" label="用户名">
            <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item class="text-center" label="密码">
            <el-input v-model="userPwd" type="password" placeholder="请输入密码" ></el-input>
          </el-form-item>
          <el-row>
            <div class="w-all next text-center" @click="toLogin" >登入</div>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="foot"><my-footer></my-footer></div>
  </div>
</template>

<script>
  import appFooter from "../Footer"
    export default {
      name: "login",
      data(){
        return {
          form:{},
          userName:"",
          userPwd:"",
        }
      },
      components:{
        "my-footer":appFooter
      },
      methods:{
        toLogin(){
          let _this=this;
          if(_this.userName != "" && _this.userPwd !=""){
            this.$ajax.post('/api/login',{username:_this.userName,userpassword: _this.userPwd}).then(res => {
              console.log(res.data.data)
              if(res.data.data.num == 1){
                alert("用户名不存在！")
                this.userName ="";
                this.userPwd = "";
              }else if(res.data.data.num == 2){
                alert("密码错误！")
                this.userPwd = "";
              }else if(res.data.data.num == 3){
                alert("登入成功!")
                localStorage.setItem("userId", res.data.data.userId)
                location.href = "/"
              }else{
                alert("服务器错误！")
              }
            })
          }else{
            alert("用户名或密码不能为空！")
          }
        }

      },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .contentLogin{
    width: 1100px;
    margin: 0 auto;
    position: relative;
    top:150px;
    /*margin-bottom:200px;*/
    /*background-color: #ebf6df;*/
  }
  /*修改element样式*/
  /deep/ .el-input__inner:focus{
    border-color: #91bfbf !important;
  }
  /deep/ .el-form-item__label{
    /*width: 60px !important;*/
    /*text-align: center !important;*/
    /*padding:0;*/
    text-align:justify;
    text-justify:distribute-all-lines;/*ie6-8*/
    text-align-last:justify;/* ie9*/
    -moz-text-align-last:justify;/*ff*/
    -webkit-text-align-last:justify;/*chrome 20+*/
  }
  /*element结束*/
  .login{
    width: 420px;
    padding:23px 54px 33px 54px;
    margin:0 auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.21);
    border-radius:4px;
    .tit{
      font-size:17px;
      color:rgba(51,51,51,1);
      padding:0 0 36px 0;
    }
    .code{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border:1px solid #c1a174;
      border-radius:4px;
    }
    .next{
      height:34px;
      background:#c1a174;
      border-radius:3px;
      line-height: 34px;
      font-size: 17px;
      color:#FFFFFF;
    }
    .ico{
      width: 80px;
      margin: 0 auto;
      i{
        font-size: 80px;
        color:#c1a174;
      }
    }
    .steps-tit{
      padding:20px 0;
      color: #c1a174;
      font-size: 21px;
    }
    .step3-txt{
      color:rgba(85,85,85,1);
      font-size:11px;
      padding:0 0 50px 0;
    }
  }
  .foot{
    position: fixed;
    bottom: 0;
    left:0;
    right: 0;
  }
</style>
