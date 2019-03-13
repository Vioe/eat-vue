<template>
  <div class="content">
    <div class="recipeDetail flex">
      <!--左边菜谱的步骤列表-->
      <div class="left">
        <div><img src="../../../static/homeImg/article.jpg" class="img" alt=""></div>
        <h2 class="recipeName">酸辣汤面#急速早餐#</h2>
        <div class="flex flex-h-cen flex-btw">
          <div class="num-l flex">
            <div><i class="iconfont icon-shoucang"></i>点赞115人</div>
            <div style="margin-left: 10px;"><i class="iconfont icon-edit"></i>留言0条</div>
          </div>
          <div class="num-r flex">
            <div class="bt text-center">收藏</div>
            <div class="bt text-center">点赞</div>
          </div>
        </div>
        <!--作者信息-->
        <div class="userInfo">
          <div class="u-top flex flex-h-cen">
            <div class="u-pic"><img src="../../../static/headPic/userHead.jpg" alt=""></div>
            <div class="u-name">用户昵称</div>
            <div class="u-att text-center color-w">+关注</div>
          </div>
          <div class="u-bot">用户菜谱简介这是一个四川的酸辣汤，好吃不腻，快来吃啊</div>
        </div>
        <!--调味料-->
          <ul class="foodList">
            <li class="flex flex-h-cen food-r">
              <div class="foodName tit">食材名</div>
              <div class="foodNum tit">计量</div>
            </li>
            <li class="flex flex-h-cen food-r" v-for="list in foodList">
              <div class="foodName">{{list.name}}</div>
              <div class="foodNum">{{list.num}}</div>
            </li>
          </ul>
        <!--步骤图文介绍-->
        <div class="stepList">
          <div class="step flex" v-for="(step,index) in 4">
            <div class="stepL"><img src="../../../static/headPic/userHead.jpg" class="img" alt=""></div>
            <div class="stepR">
              <div class="stepNum">第{{index+1}}步</div>
              <div class="stepCtn">如何操作</div>
            </div>
          </div>
        </div>
        <!--菜谱评论-->
        <recipe-comment></recipe-comment>
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
    import recipeComment from './recipeComment'
    export default {
        name: "recipeDetail",
      data(){
          return {
            foodList:[
              {name: '油',num: '10g'},
              {name: '醋',num: '10g'},
              {name: '盐',num: '10g'},
              {name: '米粉',num: '10g'}
            ]
          }
      },
      components:{
        recipeComment
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
    .num-r{
      .bt{
        width: 60px;
        height: 25px;
        line-height: 25px;
        margin-left: 10px;
        background-color: #91bfbf;
        border-radius: 4px;
        color: #FFFFFF;
      }
    }
    .userInfo{
      margin-top:10px;
      margin-bottom: 15px;
      background-color: #ccc;
      padding: 6px 10px;
      .u-top{
        .u-pic{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
        }
        .u-name{
          padding: 0 10px;
        }
        .u-att{
          width: 60px;
          height: 25px;
          line-height: 25px;
          background-color: #91bfbf;
          border-radius: 4px;
        }
      }
      .u-bot{
        padding-top:6px;
      }
    }
    .foodList{
      padding-bottom: 10px;
      .food-r{
        border-bottom: 1px solid #ccc;
        height: 40px;
        .tit{
          font-weight: bold;
        }
        .foodName{
          width: 250px;
          padding: 30px;
        }
      }
    }
    .stepList{
      .step{
        padding: 10px 0;
        .stepL{
          width: 250px;
          height: 250px;
        }
        .stepR{
          padding:0 40px;
          .stepNum{
            font-size: 20px;
          }
        }
      }
    }
  }
  .right{
    /*border: 1px solid #999;*/
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
      border: 1px solid #999;
      border-top: 0 solid transparent;
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
