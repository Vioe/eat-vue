<template>
  <div class="contentRegister">
    <!--验证进度条-->
    <ul class="step flex flex-cen">
      <li class="step-c flex flex-cen" v-for="(num,index) in 3" :class="{'active':index+1<=stepNum? true:false}"><span class="text-center" :class="{'active':index+1<=stepNum? true:false}">{{index+1}}</span></li>
    </ul>
    <ul class="flex flex-cen">
      <li class="step-t" v-for="(item,index) in items" :class="{'active-t':index+1<=stepNum? true:false}">{{item.name}}</li>
    </ul>

    <!--注册框step1-->
    <div class="register" v-if="stepNum==1">
      <h3 class="text-center tit">注册</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="text-center" label="手机号">
          <el-input  placeholder="请输入手机号" v-model="form.inputTel"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="15">
            <el-form-item label="验证码">
              <el-input  placeholder="请输入验证码" v-model="vCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <button class="code text-center" @click="sendCode" id="co">{{btnName}}</button>
          </el-col>
        </el-row>
        <el-row>
          <div class="w-all next text-center" @click="step1">下一步</div>
        </el-row>
      </el-form>
    </div>
    <!--注册框step2-->
    <div class="register" v-else-if="stepNum==2">
      <h3 class="text-center tit">注册</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="text-center" label="用户昵称">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item class="text-center" label="设置密码">
          <el-input v-model="form.password" placeholder="请输入输入密码"></el-input>
        </el-form-item>
        <el-form-item class="text-center" label="确认密码">
          <el-input v-model="form.password1" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item class="text-center" label="性别">
          <el-radio v-model="form.radio" label="1">男</el-radio>
          <el-radio v-model="form.radio" label="2">女</el-radio>
        </el-form-item>
        <el-row>
          <div class="w-all next text-center" @click="step2">下一步</div>
        </el-row>
      </el-form>
    </div>
    <!--注册框step3-->
    <div class="register" v-else>
      <div class="ico">
        <i class="iconfont icon-gouxuan"></i>
      </div>
      <h3 class="text-center steps-tit">哎呀，注册成功</h3>
      <div class="step3-txt">爱生活，从热爱美食开始。自己动手去做一做那些让认身心灵都感受到愉悦的美食，当你专心去做一件事情的时候，周围的一切都开始变得美好起来。</div>
      <el-row>
        <router-link to="/login">
          <div class="w-all next text-center" >去登入</div>
        </router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    data(){
      return {
        stepNum: 1,
        form:{
          name: '',
          password: '',
          password1: '',
          inputTel:"",
          radio:'1'
        },
        items:[
          {"name" : "创建账号"},
          {"name" : "设置省份信息"},
          {"name" : "等待认证"}
        ],
        Num:1111,
        btnName:"发送验证码",
        count:60,
        vCode: ''
      }
    },
    methods:{
      sendCode(){
        if(this.form.inputTel){
          this.Num="";
          let num=this.Num;
          for(let i=0; i<6;i++){
            num +=Math.floor(Math.random()*10);
          }
          console.log(num)
          this.Num=num;
          $.ajax({
            url: 'http://v.juhe.cn/sms/send?mobile='+this.form.inputTel+'&tpl_id=128061&tpl_value=%23code%23%3D'+this.Num+'&key=71fa9233a2cb7afe1eac2ee9c7356e1f',
            type: 'GET',
            dataType: 'JSONP',
            success: function (res) {

            }
          })
          this.getSecond();
        }else{
          alert('请输入手机号!');
        }

      },
      getSecond(){
        let _this=this;
        $('.code').attr("disabled", true);
        _this.count=60;
        _this.btnName=_this.count+"s重新获取";
        let time=setInterval(function(){
          console.log(111)
          if(_this.count > 0) {
            _this.count--;
            console.log(_this.count)
            _this.btnName = _this.count + 's重新获取';
          }else{
            _this.btnName="获取验证码";
            $('.code').attr("disabled", false);
            clearTimeout(time);
          }
        },1000)
      },
      step1(){
        if(this.form.inputTel != '' && this.vCode !=''){
          if(!(/^1[34578]\d{9}$/.test(this.form.inputTel))){
            alert("手机号码有误，请重填");
            return false;
          }else{
            if(this.vCode == this.Num ){
              this.stepNum = 2
            }else{
              alert('哎呀妈呀验证码错了！')
            }
          }
        }else{
          alert('手机号验证码不能为空哦！')
        }
      },
      step2(){
        console.log(this.form.name)
        if(this.form.name !="" && this.form.password !="" && this.form.password1 !=""){
            this.$ajax.get('/api/users').then(res =>{
              console.log()
              for(let i=0; i<res.data.data.length;i++){
                if(this.form.name == res.data.data[i].userName){
                  alert('用户名已经存在！请重新输入')
                  return;
                }
              }
              if(this.form.password == this.form.password1){
                let param = {
                  form: this.form,
                }
                this.$ajax.post('/api/users/add',param).then(res =>{
                  console.log(res)
                })
                this.stepNum = 3
              }else{
                alert('两次输入的密码不一致哦！')
              }
            })
        }else{
          alert('请填写完整！')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .contentRegister{
    width: 1100px;
    margin: 0 auto;
    position: relative;
    top:90px;
    padding:0 0 40px 0;
    /*background-color: #ebf6df;*/
    margin-bottom: 100px;
  }
  /*修改element样式*/
 /deep/ .el-input__inner:focus{
    border-color: #91bfbf !important;
  }
  /deep/ .el-form-item__label{
    width: 60px !important;
    text-align: center !important;
    padding:0;
  }
  /deep/ .el-radio__input.is-checked .el-radio__inner{
    border-color: #c1a174 !important;
    background: #c1a174 !important;
  }
  /deep/ .el-radio__inner:hover {
    border-color: #c1a174 !important;
  }
  /deep/ .el-radio__input.is-checked+.el-radio__label{
    color: #c1a174 !important;
  }
  /deep/ .el-form-item__content{
    text-align: left !important;
  }
  /*elemnt结束*/
  .step{
    .step-c{
      width: 200px;
      height: 9px;
      background:rgba(218,218,218,1);
      text-align: center;
      span{
        color:#ffffff;
        display:inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        line-height: 24px;
        background:rgba(218,218,218,1);
      }
    }
  }
  .active{
    background:#c1a174 !important;
  }
  .active-t{
    color: #c1a174 !important;
  }
  .step-t{
    width: 200px;
    height: 9px;
    margin-top:20px;
    color:#555555;
    text-align: center;
  }
  .register{
    width: 420px;
    padding:23px 54px 33px 54px;
    margin:40px auto;
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
      background-color: transparent;
    }
    .next{
      height:34px;
      font-size: 17px;
      background:#c1a174;
      border-radius:3px;
      line-height: 34px;
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
</style>
