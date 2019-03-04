<template>
  <div class="content">
    <div class="recipeDetail flex">
      <!--左边菜谱的步骤列表-->
      <div class="left">
        <div><img src="../../../static/homeImg/article.jpg" class="img" alt=""></div>
        <h2 class="recipeName">酸辣汤面#急速早餐#</h2>
        <div class="flex flex-h-cen flex-btw">
          <div class="num-l flex">
            <div><i class="iconfont"></i>点赞115人</div>
            <div><i class="iconfont"></i>留言0条</div>
          </div>
          <div class="num-r flex">
            <div class="bt">收藏</div>
            <div class="bt">点赞</div>
          </div>
        </div>
      </div>
      <!--右边热门菜谱-->
      <div class="right">
        <div class="hotRecipe">热门菜谱</div>
        <div class="recipeList flex" v-for="item in 4">
          <div class="recipePic"><img src="../../../static/homeImg/article.jpg" class="img" alt=""></div>
          <div class="recipeTxt">
            <h3 class="recipeTit">菜谱名</h3>
            <div class="recipeCtn">这是一个非常好吃的菜，点赞率超过一百万</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "recipeDetail",
      data(){
          return {

          }
      },
      methods:{

      }
    }
</script>

<style scoped lang="scss">
.recipeDetail{
  .left{
    padding: 10px;
    width: 700px;
    border: 1px solid #999;
    .recipeName{
      padding: 12px 0;
    }
  }
  .right{
    border: 1px solid #999;
    margin-left: 20px;
    .hotRecipe{
      padding: 0 0 0 20px;
      height: 40px;
      line-height: 40px;
      color: #FFFFFF;
      font-size: 18px;
      background-color: #91bfbf;
    }
    .recipeList{
      padding: 10px;
      border-bottom: 1px solid #999;
      .recipePic{
        width: 150px;
      }
      .recipeTxt{
        padding-left: 10px;
        .recipeTit{
          padding-bottom: 10px;
        }
      }
    }
  }
}
</style>
