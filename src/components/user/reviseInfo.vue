<template>
  <div class="content">
    <div class="userInfo flex flex-cen">
      <!--修改用户头像-->
      <div class="headPic">
        <label for="fileupload" class="ico">
          <div class="revisePic">
            <img :src="headPic" class="img brower" alt="">
          </div>
        </label>
        <input type="file" accept="image/*" multipart id="fileupload"  @change="showBasicPh($event)" style="display:none;">
      </div>
      <!--修改用户名、密码-->
      <div class="reviseName">
        <el-form label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="formLabelAlign.password1"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="formLabelAlign.password2"></el-input>
          </el-form-item>
          <el-form-item>
            <!--保存-->
            <div class="save text-center color-w" @click="saveUserInfo">保存</div>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "reviseInfo",
      data(){
          return {
            formLabelAlign:{
              name: '',
              password: '',
              password1: '',
              password2: ''
            },
            pwd: '',
            headFile: '',
            headPic: ''
          }
      },
      mounted(){
          let _that = this;
          this.$ajax.get(`/api/users/getUser/${this.$store.state.userId}`).then(res =>{
            console.log(res)
            _that.formLabelAlign.name = res.data.data[0].userName;
            _that.pwd = res.data.data[0].password;
            // _that.headPic = 'http://localhost:3000/headImg/'+ res.data.data[0].headPhoto;
            _that.headPic =  res.data.data[0].headPhoto;
          })
      },
      methods:{
        showBasicPh(e){
          this.headFile = e.target.files[0];
          let reader=new FileReader();
          reader.onload = function(event){
            document.querySelector(".brower").src=event.target.result;
          }
          reader.readAsDataURL(this.headFile);
        },
        saveUserInfo(){
          let oldName = this.headFile.name;
          let suffName = oldName.substring(oldName.lastIndexOf("."),oldName.length);
          let fileName = new Date().getTime()+'_'+new Date().getTime()+suffName;
          var zipFormData = new FormData();
          //添加文件
          zipFormData.append('files',this.headFile)
          zipFormData.append("fileName", fileName)
          //添加表单其他数据
          let data = {
            formLabelAlign: this.formLabelAlign,
            userId: localStorage.getItem('userId')
          }
          zipFormData.append('mydata',JSON.stringify(data))
          if(this.formLabelAlign.password == this.pwd){
            if(this.formLabelAlign.password1 == this.formLabelAlign.password2){
              this.$ajax.post('/api/updateInfo',zipFormData).then(res => {
                console.log(res)
              })
            }else{
              alert('两次的密码不一致！')
            }
          }else{
            alert('您的旧密码有误！请重新输入！')
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  /deep/ .el-form-item__label{
    text-align:justify;
    text-justify:distribute-all-lines;/*ie6-8*/
    text-align-last:justify;/* ie9*/
    -moz-text-align-last:justify;/*ff*/
    -webkit-text-align-last:justify;/*chrome 20+*/
  }
  /deep/ .el-input__inner:focus{
    border-color: #91bfbf !important;
  }
.userInfo{
  padding-top: 40px;
}
.headPic{
  margin-right: 50px
}
.revisePic{
  width: 200px;
  height:200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
.reviseName{
  width: 400px;
  padding: 10px;
  padding-top: 40px;
}
.save{
  width: 80px;
  height: 35px;
  line-height: 35px;
  border-radius: 4px;
  background-color: #91bfbf;
}
</style>
