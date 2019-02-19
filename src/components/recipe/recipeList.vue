<template>
  <div class="example" style="margin-top: 20px;">
    <Waterfall :gutterWidth="10" :minCol="1" :maxCol="3" :gutterHeight="10" ref="waterfall" :fixWidth="0">
      <WaterfallItem v-for="(src, index) in dataArr" :key="index" :width="240" class="item animated fadeIn">
        <div style="background-color: white;border:7px solid white" id="pic">
          <!--<router-link :to="'/postcards/'+src.cardId"><img :src="src.cardPic"></router-link>-->
          <div>
            <img :src="src" alt="">
          </div>
          <div class="recipeList">
            <div class="recipeT">菜谱名</div>
            <ul class="flex ul1">
              <li class="flex flex-f1 flex-cen recipeL"><i class="iconfont icon-icon--"></i><div>收藏</div></li>
              <li class="flex flex-f1 flex-cen"><i class="iconfont icon-dianzan"></i><div>点赞 99 </div></li>
            </ul>
          </div>
        </div>
      </WaterfallItem>
    </Waterfall>
  </div>
</template>

<script>
  import {Waterfall, WaterfallItem} from 'vue2-waterfall';
  export default {
    name: 'app',
    data() {
      return {
        // dataArr:[],
        dataArr:['https://cp1.douguo.com/upload/caiku/2/3/7/600x400_234252b455d69118c6aa993d0f3c6707.jpg',
          '../../../static/recipe/recipe1.jpg',
          'https://cp1.douguo.com/upload/caiku/9/e/7/600x400_9ec980844c89d94c8ce4138a02987c47.jpeg',
          '../../../static/recipe/recipe2.jpg',
          'https://cp1.douguo.com/upload/caiku/6/a/7/600x400_6a8db9af82a1cb11af3a78133e4f9347.jpg',
          'https://cp1.douguo.com/upload/caiku/2/8/0/600x400_28fb4b64dd09e808979363d750a9ad50.jpg',
          'https://cp1.douguo.com/upload/caiku/6/f/c/600x400_6ffa072c4c8dd0a1e1cebddb631f906c.jpg',
          'https://cp1.douguo.com/upload/caiku/1/c/f/600x400_1ca013a692332b08c12916d3afc81aef.jpg',
          'https://cp1.douguo.com/upload/caiku/b/4/5/600x400_b4aaadfde28cc5282e3212328779ccc5.jpg'
        ],
        items: [],
        page: 0,
        allPic:[]
      }
    },
    watch:{
      "$route":"getPicture"
    },
    mounted() {
      // this.getPicture();
    },
    components: {
      Waterfall,
      WaterfallItem
    },
    // methods: {
    //   picsrc(wallPic){
    //     for(let i in wallPic){
    //       wallPic[i].cardPic = `${axios.defaults.baseURL}${wallPic[i].cardPic}`
    //     }
    //   },
    //   getPicture(){
    //     var that = this
    //     console.log("测试："+this.$route.params.city)
    //     if(this.$route.params.city!=undefined){
    //       this.city=this.$route.params.city
    //       console.log('搜索城市:'+this.city)
    //       this.$ajax({
    //         method:'get',
    //         url: `${axios.defaults.baseURL}/wall/search/${this.city}`
    //       }).then((res)=>{
    //         this.allPic=res.data.data;
    //         this.picsrc(this.allPic);
    //         this.items = this.allPic
    //         console.log("哈哈2" + this.allPic)
    //         var count = 7
    //         console.log(this.items.slice(count * this.page, count * (this.page + 1)))
    //         this.dataArr = [];
    //         this.dataArr = this.dataArr.concat(this.items.slice(count * this.page, count * (this.page + 1)))
    //         this.page += 1;
    //         window.addEventListener('scroll', function () {
    //           var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //           if (scrollTop + window.innerHeight >= document.body.clientHeight) {
    //             console.log(that.items.slice(count * that.page, count * (that.page + 1)))
    //             that.dataArr = that.dataArr.concat(that.items.slice(count * that.page, count * (that.page + 1)))
    //             that.page += 1;
    //           }
    //         })
    //       })
    //     }else{
    //       this.$ajax({
    //         method: 'get',
    //         url: `${axios.defaults.baseURL}/wall`
    //       })
    //         .then((res) => {
    //           this.allPic = res.data.data.allPicture;
    //           console.log(`${axios.defaults.baseURL}${this.allPic[0].cardPic}`)
    //           this.picsrc(this.allPic);
    //           this.items = this.allPic
    //           console.log("哈哈1" + this.items)
    //           var count = 7
    //           console.log(this.items.slice(count * this.page, count * (this.page + 1)))
    //           this.dataArr = [];
    //           this.dataArr = this.dataArr.concat(this.items.slice(count * this.page, count * (this.page + 1)))
    //           this.page += 1;
    //           window.addEventListener('scroll', function () {
    //             var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //             if (scrollTop + window.innerHeight >= document.body.clientHeight) {
    //               console.log(that.items.slice(count * that.page, count * (that.page + 1)))
    //               that.dataArr = that.dataArr.concat(that.items.slice(count * that.page, count * (that.page + 1)))
    //               that.page += 1;
    //             }
    //           })
    //         })
    //     }
    //   }
    // },
    // destroyed () {
    //   window.removeEventListener('scroll', this.getPicture); // 离开页面 关闭监听 不然会报错
    // }
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
