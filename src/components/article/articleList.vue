<template>
  <div class="article">
    <div class="flex">
      <!--文章列表-->
      <div class="articleLists">
        <div class="articleList flex" v-for="item in myActData1">
          <div class="articleLeft">
            <img :src="item.articleCoverImg" alt="">
          </div>
          <div class="articleRight flex-f1">
           <router-link :to="'/articleDetail/'+item.articleId"><p class="articleTit">{{item.articleTitle}}</p></router-link>
            <p class="articleCtn line-clamp4">{{item.articleContent}}</p>
            <p class="articleTime1" style="margin-top: 15px; text-align: right; color:#999999;"><i class="iconfont icon-shijian"></i>{{item.articleTime.substr(0,10)}}</p>
          </div>
        </div>
      </div>
      <!--文章日期-->
      <div class="articleTime">
        <router-link to="/article1"><div class="allTime text-center color-w">全部</div></router-link>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(year,index) in dateTime" :key="index" :title="String(year.year)" :name="index+1">
           <div class="month" v-for="month in year.month"><router-link :to="'/article1/'+year.year+'/'+month">{{month}}月</router-link></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!--分页-->
    <div class="row text-center activityPage">
      <div class="block">
        <span class="demonstration" ></span>
        <el-pagination ref="elpage"
           @current-change="change()"
           :current-page.sync="pageIndex"
           layout="prev, pager, next"
           :total="pageCount"
           :page-size = "pagesize"
         >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'element-ui'
  export default {
    name: "articleList",
    data(){
      return {
        pageIndex: 1,
        pagesize: 5,
        pageCount:0,
        myActData:[],
        articles:[],
        activeName:1,
        dateTime:[],
        all: {}
      }
    },
    computed:{
      myActData1() {
        return this.articles
      }
    },
    watch:{
      "$route": "mounted"
    },
    created(){
      let  loading = Loading.service({
        lock: true,
        text: '加载中......',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.mounted();
      loading.close()
    },
    methods:{
      change(){
        this.loadData();
      },
      loadData() {
        this.articles = [];
        let start = (this.pageIndex - 1) * this.pagesize;
        let end = start + this.pagesize;
        if (end >= this.pageCount){
          end = this.pageCount
        }
        for (let i = start; i < end; i++) {
          this.articles.push(this.myActData[i])
        }
      },
      mounted(){
        let _this = this;
        this.$ajax.get('/api/article').then(res => {
          this.all = res.data.data
          // for(let i=0;i<this.all.allDate.length;i++){
          //     let date = this.all.allDate[i].articleTime.substr(0,10).split('-')
          //     let k = Number(date[2])+1
          //     this.all.allDate[i].articleTime = date[0]+'-'+date[1]+'-'+0+k
          // }
          // console.log(this.all.allDate[0].articleTime)
          this.dateTime = res.data.data.dateTime;
        })
        if(this.$route.params.year!=undefined){
          let year = this.$route.params.year
          let month = this.$route.params.month
          this.$ajax.get(`/api/article/${year}/${month}`).then(res => {
            _this.myActData = res.data.data;
            _this.pageCount=_this.myActData.length;
            _this.loadData();
          })
        }else{
          this.$ajax.get('/api/article').then( res =>{
            _this.myActData = res.data.data.allDate;
            _this.pageCount=_this.myActData.length;
            _this.loadData();
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-collapse-item__header{
    padding-left: 20px;
    font-size: 16px;
  }
  /deep/ .el-pager li.active{
    color: #c1a174;
  }

  .article{
    margin-bottom: 40px;
    .articleLists{
      margin-right: 50px;
      .articleList{
        padding:20px 20px;
        width:770px;
        border-bottom: 1px solid #ccc;
        .articleLeft{
          width: 200px;
        }
        .articleRight{
          padding: 0 0 0 15px;
          .articleTit{
            font-size: 18px;
            font-weight: bold;
            padding: 0 0 12px 0;
          }
          .articleCtn{
            min-height: 64px;
          }
          .articleTime1{
            i{
              margin-right: 6px;
            }
          }
        }
      }
    }
    .articleTime{
      width: 250px;
      .allTime{
        width: 80px;
        height: 50px;
        line-height: 50px;
        background-color: #91bfbf;
        font-size: 16px;
      }
      .timeList{
        width: 100%;
        li{
          padding: 0 0 0 15px;
          font-size: 16px;
          width: 100%;
          height: 50px;
          line-height: 50px;
          background-color: #FFFFFF;
          border-bottom: 1px solid #ccc;
        }
      }
      .month{
        height: 30px;
        line-height: 30px;
        padding-left: 40px;
      }
    }
    .activityPage{
      padding:10px 0;
      /*padding-bottom: 10px;*/
    }
  }

</style>
