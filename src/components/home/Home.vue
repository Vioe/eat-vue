<template>
  <div>
    <div class="content">
      <div class="flex">
        <!--轮播图-->
        <div class="sw flex-btw">
          <home-swiper></home-swiper>
        </div>
        <!--热门文章列表-->
        <div class="hotArticle">
          <div class="articleTit">热门文章</div>
          <div class="articleList flex" v-for="item in 3">
            <div class="articleLeft"><img class="img" src="https://cp1.douguo.com/upload/caiku/1/c/f/600x400_1ca013a692332b08c12916d3afc81aef.jpg" alt=""></div>
            <div class="articleRight flex-f1 line-clamp3 ">65℃度以上热饮成高危食物65℃度以上热饮成高危食物65℃度以上热饮成高危食物65℃度以上热饮成高危食物65℃度以上热饮成高危食物65℃度以上热饮成高危食物65℃度以上热饮成高危食物65℃度以上热饮成高危食物</div>
          </div>
        </div>
      </div>
      <!--每日推荐-->
      <div class="w-all daily">
        <div class="dailyTit color-w w-all h-five">每日推荐</div>
        <!--图片列表-->
        <div class="dailyCtnAll flex flex-btw flex-wrap">
          <div class="dailyList" v-for="dailyList in 8">
            <div class="dailyBackUrl">
              <img src="https://cp1.douguo.com/upload/caiku/2/8/0/600x400_28fb4b64dd09e808979363d750a9ad50.jpg" class="" alt="">
            </div>
            <div class="dailyName">菜谱名</div>
            <div class="dailyCtn flex flex-h-cen flex-btw">
              <div class="ctnLeft flex flex-h-cen">
                <div class="userPic">
                  <img src="../../../static/homeImg/article.jpg" class="img" alt="">
                </div>
                <div class="userName">小可爱</div>
              </div>
              <i class="ico iconfont icon-dianzan"><span>999</span></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="randomBackUrl w-all img"  :style="{'background-image':'url('+randomBackUrl+')'}">
      <div class="ranTit text-center color-w">总有一款适合你</div>
      <div class="ranCtn text-center color-w">还拿不定主意？来看看今日的菜谱推荐吧</div>
      <div class="icoLoad">
        <i class="iconfont icon-load color-w"></i>
      </div>
      <div class="ranLists flex flex-btw">
        <div class="ranList" v-for="ranList in 4">
          <div class="ranPic">
            <img src="https://cp1.douguo.com/upload/caiku/9/9/e/600x400_99d0489f647f19fb47be7bdf6a84827e.jpg" alt="">
          </div>
          <div class="reName">菜谱名</div>
          <div class="reCtn">菜谱简介</div>
        </div>
      </div>
      <!--近期活动-->
      <div class="w-all activity">
        <div class="activityLists">
          <div class="activityTit h-five color-w">近期活动</div>
          <div class="flex flex-btw">
            <div class="activityList" v-for="activity in 4">
              <div class="activityBackUrl">
                <img src="https://cp1.douguo.com/upload/caiku/5/2/e/600x400_5262a1e2e6a5432890ebe7d90e77b42e.jpg" alt="">
              </div>
              <div class="activityName">活动名称</div>
              <div class="activityCtn">活动状态</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div class="toTop" @click="toTop" v-if="showImg">
      <img src="../../../static/homeImg/toTop.png" alt="">
      <div class="text-center">Back</div>
    </div>
  </div>
</template>

<script>
  import homeSwiper from "./homeSwiper"
    export default {
        name: "home",
      data(){
          return {
            randomBackUrl:"../../../static/homeImg/article.jpg",
            showImg:false,
          }
      },
      components:{
        "home-swiper":homeSwiper
      },
      mounted(){
          window.addEventListener('scroll',this.handleScroll)
      },
      methods:{
        handleScroll(){
          let scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if(scrollTop > 200){
            this.showImg = true;
          }else{
            this.showImg = false;
          }
        },
          toTop(){
            window.pageYOffset = document.documentElement.scrollTop=document.body.scrollTop = 0;
          }
      },
      destroyed(){
          window.removeEventListener('scroll',this.handleScroll)
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content{
    position: relative;
    z-index:-10;
    padding:0 0 40px 0;
  }
  .sw{
    width: 700px;
  }
   /*轮播图、热门文章*/
    .hotArticle{
    width: 100%;
    margin-left: 20px;
    .articleTit{
      width: 100%;
      padding:0 0 0 20px;
      height: 40px;
      line-height: 40px;
      color:#FFFFFF;
      font-size:18px;
      background-color: #91bfbf;
    }

    .articleList{
      background-color: #FFFFFF;
      border-bottom: 1px solid #ccc;
      padding: 10px 15px;
      .articleLeft{
        width: 150px;
        height: 100px;
        margin-right: 20px;
      }
      .articleRight{
        height: 50px;
        overflow: hidden;
      }
    }
  }
  /*每日推荐*/
  .daily{
    .dailyTit{
      background-color: #c1a174;
      margin-top: 40px;
      padding: 0 0 0 20px;
      line-height: 40px;
      font-size: 16px;
    }
    .dailyCtnAll{
      height: 500px;
    }
    .dailyList{
      width: 250px;
      margin-top:20px;
      background-color: #FFFFFF;
      border-radius: 5px 5px 0 0;
      overflow: hidden;
      .dailyName{
        padding:7px 17px 0 17px;
      }
      .dailyCtn{
        padding:7px 17px;
        .ctnLeft{
          .userName{
            padding: 0 0 0 10px;
          }
        }
        .ico{
          color:#ccc;
          font-size: 12px;
        }
      }
    }
    .userPic{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  /*随机选菜谱*/
  .randomBackUrl{
    height: 850px;
    background-repeat: no-repeat;
    background-position: center;
    .ranTit{
      font-size: 22px;
      padding:50px 0 15px 0;
    }
    .ranCtn{
      padding: 0 0 10px 0;
    }
    .icoLoad{
       width: 28px;
       margin:0 auto;
      i{
        font-size:28px;
      }
    }
    .ranLists{
      width: 1000px;
      margin:40px auto;
      .ranList{
        width: 230px;
        background-color: #FFFFFF;
        .reName{
          padding: 8px 17px 8px 17px;
        }
        .reCtn{
          padding: 0 17px 8px 17px;
        }
      }
    }
    /*活动*/
    .activity{
      background-color: #FFFFFF;
      height:290px;
      position: relative;
      top:40px;
      .activityLists{
        padding:10px 0 0 0;
        width: 1000px;
        margin: 0 auto;
        .activityTit{
          background-color: #91bfbf;
          line-height: 40px;
          padding: 0 0 0 20px;
          font-size: 16px;
        }
        .activityList{
          width: 230px;
          margin-top: 10px;
          box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.21);
          .activityBackUrl{

          }
          .activityName{
            padding: 8px 17px 8px 17px;
          }
          .activityCtn{
            padding: 0 17px 8px 17px;
          }
        }

      }
    }
  }
  .toTop{
    position:fixed;
    right:60px;
    top:500px;
    img{
      width: 64px;
    }
  }
</style>
