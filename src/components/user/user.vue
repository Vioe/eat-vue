<template>
  <div class="content">
    <div class="personalCenter">
      <div class="userInfoBack w-all">
        <img src="../../../static/homeImg/recipeBackUrl.jpg"  alt="">
        <div class="back2">
          <div class="userHead">
            <img :src="userInfo.headPhoto" class="img" alt="">
          </div>
          <div class="text-center userName">{{userInfo.userName}} <router-link to="/reviseInfo"><i class="iconfont icon-edit"></i></router-link></div>
        </div>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="我的菜谱">
            <user-recipe></user-recipe>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
            <user-collection></user-collection>
        </el-tab-pane>
        <el-tab-pane label="关注达人">
            <user-attention></user-attention>
        </el-tab-pane>
        <el-tab-pane label="参加活动">
            <user-join-activity></user-join-activity>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  import userCollection from './userCollection'
  import userAttention from './userAttention'
  import userJoinActivity from './userJoinActivity'
  import userRecipe from './userRecipe'
    export default {
      name: "user",
      data(){
          return {
            radio: '1',
            userInfo:{}
          }
      },
      components:{
        userCollection,
        userAttention,
        userJoinActivity,
        userRecipe
      },
      mounted(){
        console.log(this.$store.state.userId)
        this.$ajax.get(`/api/users/getUser/${this.$store.state.userId}`).then(res => {
          // console.log(res.data.data[0])
          this.userInfo = res.data.data[0];
          this.userInfo.headPhoto = 'http://localhost:3000/headImg/'+this.userInfo.headPhoto
        })
      }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .personalCenter{
    .userInfoBack{
      height: 300px;
      overflow: hidden;
      position: relative;
    }
    .back2{
      position: absolute;
      left:50%;
      top:100px;
      margin-left: -40px;
      .userHead{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
      }
      .userName{
        padding-top:10px;
        i{
          margin-left:5px;
        }
      }
    }
    .tab{
      margin-top: 100px;
    }
  }
</style>
