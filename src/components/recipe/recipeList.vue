<template>
  <div class="example" style="margin-top: 20px;">
    <Waterfall :gutterWidth="10" :minCol="1" :maxCol="3" :gutterHeight="10" ref="waterfall" :fixWidth="0">
      <WaterfallItem v-for="(src, index) in dataArr" :key="index" :width="240" class="item animated fadeIn">
        <div style="background-color: white;border:7px solid white" id="pic">
          <!--<router-link :to="'/postcards/'+src.cardId"><img :src="src.cardPic"></router-link>-->
          <router-link :to="'/recipeDetail/'+src.detailsId">
            <div>
              <img :src="src.recipeCoverImg" alt="">
            </div>
          </router-link>
          <div class="recipeList">
            <div class="recipeT">{{src.recipeName}}</div>
            <ul class="flex ul1">
              <li class="flex flex-f1 flex-cen recipeL">
                <div class="star">
                  <vue-star animate="heartBeat" color="#F05654">
                    <i slot="icon"  class="iconfont icon-xihuan1" style="font-size: 17px;" @click="handleClick(src.recipePraiseNum,index)"></i>
                  </vue-star>
                </div>
                <div style="position:relative;left: 60px;">收藏</div>
              </li>
              <li class="flex flex-f1 flex-cen">
                <div><i class="iconfont icon-dianzan"></i></div>
                <div>{{src.recipePraiseNum}}</div>
              </li>
            </ul>
          </div>
        </div>
      </WaterfallItem>
    </Waterfall>
  </div>
</template>

<script>
  import {Waterfall, WaterfallItem} from 'vue2-waterfall';
  import VueStar from 'vue-star'
  export default {
    name: 'app',
    data() {
      return {
        dataArr:[],
        items: [],
        page: 0,
        allPic:[]
      }
    },
    watch:{
      "$route": "mounted"
    },
    mounted() {
      var that = this
      this.$ajax.get('/api/recipe').then( res => {
        this.allPic = res.data.data;
        this.items = this.allPic
        var count = 7
        console.log(this.items.slice(count * this.page, count * (this.page + 1)))
        this.dataArr = [];
        this.dataArr = this.dataArr.concat(this.items.slice(count * this.page, count * (this.page + 1)))
        this.page += 1;
        window.addEventListener('scroll', function () {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop + window.innerHeight >= document.body.clientHeight) {
            console.log(that.items.slice(count * that.page, count * (that.page + 1)))
            that.dataArr = that.dataArr.concat(that.items.slice(count * that.page, count * (that.page + 1)))
            that.page += 1;
          }
        })
      })
    },
    components: {
      Waterfall,
      WaterfallItem,
      VueStar
    },
    methods:{

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  html,
  body,
  #app {
    -ms-overflow-style: none;
    width: calc(100vw + 18px);
    overflow: auto;
  }

</style>
<style rel="stylesheet/scss" lang="scss" >
  .star{
    margin-left:-95px;
    margin-top: -100px;
  }
  * {
    padding: 0;
    margin: 0;
  }
  .item img {

    width: 100%;
    display: block;
  }
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  #pic:hover{
    box-shadow: 5px 5px 5px #888888;
  }
  #pic{
    border-radius: 5px;
  }
  .recipeList {
    .recipeT{
      height:40px;
      line-height: 40px;
      color: #666;
      border-bottom: 1px solid #ccc;
    }
    .recipeL{
      border-right: 1px solid #ccc;
    }
    .ul1{
      padding: 10px 0;
    }
  }
</style>
