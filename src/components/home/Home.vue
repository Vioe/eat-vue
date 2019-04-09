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
          <div class="articleList flex" v-for="(item,index) in threeArticle">
            <div class="articleLeft"><img :src="item.articlePic" alt=""></div>
            <div class="articleRight flex-f1">
             <router-link :to="'/articleDetail/'+item.articleId"><h3 class="line-clamp1" style="padding-bottom: 6px;">{{item.articleTitle}}</h3></router-link>
              <div class="line-clamp3">{{item.articleContent}}</div>
              <div class="icon" v-if="att.indexOf(index)== -1"><i @click="addPraiseNum(item.articleId,index)" class="iconfont icon-dianzan" ></i><span style="display: inline-block;width: 20px;">{{item.articlePraiseNum}}</span></div>
              <div class="icon" v-else><i @click="subPraiseNum(item.articleId,index)" class="iconfont icon-dianzan" style="color: red;"></i><span style="display: inline-block;width: 20px;">{{item.articlePraiseNum}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <!--每日推荐-->
      <div class="w-all daily">
        <div class="dailyTit color-w w-all h-five">每日推荐</div>
        <!--图片列表-->
        <div class="dailyCtnAll flex flex-btw flex-wrap">
          <div class="dailyList" v-for="dailyList in severRecipe">
            <router-link :to="'/recipeDetail/'+dailyList.detailsId">
              <div class="dailyBackUrl">
                <img :src="dailyList.recipeCoverImg" class="" alt="">
              </div>
            </router-link>
            <div class="dailyName">{{dailyList.recipeName}}</div>
            <div class="dailyCtn flex flex-h-cen flex-btw">
              <div class="ctnLeft flex flex-h-cen">
                <div class="userPic">
                  <img :src="dailyList.headPhoto" class="img" alt="">
                </div>
                <div class="userName">{{dailyList.userName}}</div>
              </div>
              <i class="ico iconfont icon-dianzan"><span>{{dailyList.recipePraiseNum}}</span></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="randomBackUrl w-all img" :style="{'background-image':'url('+randomBackUrl+')'}">
      <div class="ranTit text-center color-w">总有一款适合你</div>
      <div class="ranCtn text-center color-w">还拿不定主意？来看看今日的菜谱推荐吧</div>
      <div class="icoLoad" @click="randomRecipe">
        <i class="iconfont icon-load color-w"></i>
      </div>
      <div class="ranLists flex flex-btw">
        <div class="ranList" v-for="ranList in random">
          <router-link :to="'/recipeDetail/'+ranList.detailsId">
            <div class="ranPic">
            <img :src="ranList.recipeCoverImg" alt="">
          </div>
          </router-link>
          <div class="reName">{{ranList.recipeName}}</div>
          <div class="line-clamp1 reBrif">{{ranList.recipeBrief}}</div>
        </div>
      </div>
      <!--近期活动-->
      <div class="w-all activity">
        <div class="activityLists">
          <div class="activityTit h-five color-w">近期活动</div>
          <div class="flex flex-btw">
            <div class="activityList" v-for="activity in activitys">
              <router-link :to="'/activity/'+activity.activityId">
                <div class="activityBackUrl">
                  <img :src="activity.activityImg" alt="">
                </div>
              </router-link>
              <div class="activityName">{{activity.activityName}}</div>
              <div class="activityCtn" style="text-align: right;">{{activity.activityState}}</div>
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
    <my-footer></my-footer>
  </div>
</template>

<script>
  import homeSwiper from "./homeSwiper"
  import appFooter from "../Footer"
  import { Loading } from 'element-ui'
    export default {
        name: "home",
      data(){
          return {
            randomBackUrl:"../../../static/homeImg/article.jpg",
            showImg:false,
            severRecipe: [],
            activitys:[],
            threeArticle:[],
            random:[],
            allRecipe:[],
            d: null,
            att:[1]
          }
      },
      components:{
        "home-swiper":homeSwiper,
        "my-footer":appFooter
      },
      mounted(){
        let  loading = Loading.service({
          lock: true,
          text: '加载中......',
          background: 'rgba(0, 0, 0, 0.7)'
        })
          window.addEventListener('scroll',this.handleScroll)
          this.$ajax.get('/api/recipe/homeRecipe').then(res => {
            this.severRecipe = res.data.data
          })
          this.$ajax.get('/api/activity').then(res => {
            this.activitys = res.data.data;
            console.log("近期文章")
            console.log(this.activitys)
          })
          this.$ajax.get('/api/article/threeArticle').then(res => {
            console.log("热门")
            console.log(res.data.data)
            this.threeArticle = res.data.data;
          })
          this.$ajax.get('/api/recipe').then( res => {
            this.allRecipe = res.data.data;
            let page = parseInt(this.allRecipe.length/4)
            let count = Math.floor(Math.random()*page)
            this.random = this.allRecipe.slice(count*4,count*4+4)
            console.log(this.random)
          })
        loading.close()
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
          },
        randomRecipe(){
          let page = parseInt(this.allRecipe.length/4)
          let count = Math.floor(Math.random()*page)
          this.random = this.allRecipe.slice(count*4,count*4+4)
          console.log(this.random)
        },
        addPraiseNum(articleId,index){
          console.log(articleId)
          if(this.att.indexOf(index) == -1){
            this.att.push(index)
            this.threeArticle[index].articlePraiseNum += 1;
            this.$ajax.get(`/api/addPriseNum/${articleId}`).then(res => {
              console.log(res)
            })
          }
        },
        subPraiseNum(articleId,index){
          this.threeArticle[index].articlePraiseNum -= 1;
          this.att.splice(this.att.indexOf(index),1);
        }
      },
      destroyed(){
          window.removeEventListener('scroll',this.handleScroll)
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content{
    /*position: relative;*/
    /*<!--z-index:-10;-->*/
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
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      padding: 10px 15px;
      .articleLeft{
        width: 150px;
        height: 100px;
        margin-right: 20px;
        overflow: hidden;
      }
      .articleRight{
        .icon{
          padding-top: 10px;
          float:right;
          i{
            margin-right: 6px;
          }
        }
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
          float: right;
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
       cursor: pointer;
      i{
        font-size:28px;
      }
    }
    .ranLists{
      width: 1000px;
      margin:40px auto;
      .ranList{
        width: 230px;
        height: 210px;
        background-color: #FFFFFF;
        .ranPic{
          height: 150px;
          overflow: hidden;
        }
        .reName{
          padding: 8px 17px 8px 17px;
          font-weight: bold;
        }
        .reBrif{
          padding: 0 17px;
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
      height: 300px;
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
