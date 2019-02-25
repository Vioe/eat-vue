<template>
  <div class="content">
    <div class="personalCenter">
      <div class="userInfoBack w-all">
        <img src="../../../static/homeImg/recipeBackUrl.jpg"  alt="">
        <div class="back2">
          <div class="userHead">
            <img src="../../../static/headPic/userHead.jpg" class="img" alt="">
          </div>
          <div class="text-center userName">余哎呀</div>
        </div>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="我的菜谱">我的菜谱</el-tab-pane>
        <el-tab-pane label="我的收藏">
          <fieldset class="" style="width: 94%;margin: 0 auto;border: 2px solid #d5d5ab;">
            <legend style="margin-left: 30px; font-size: 16px;padding: 0 10px;">健康信息</legend>
             <div></div>
          </fieldset>
        </el-tab-pane>
        <el-tab-pane label="关注达人">关注达人</el-tab-pane>
        <el-tab-pane label="参加活动">参加活动</el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
    export default {
        name: "user",
      data(){
          return {
            radio: '1'
          }
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
      }
    }
    .tab{
      margin-top: 100px;
    }
  }
</style>
