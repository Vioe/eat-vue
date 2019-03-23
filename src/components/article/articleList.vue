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
            <p class="articleTit">{{item.articleTitle}}</p>
            <p class="articleCtn line-clamp4">{{item.articleContent}}</p>
          </div>
        </div>
      </div>
      <!--文章日期-->
      <div class="articleTime">
        <div class="allTime text-center color-w">全部</div>
        <!--<ul class="timeList">-->
          <!--<li>2019</li>-->
          <!--<li>2018</li>-->
          <!--<li>2017</li>-->
          <!--<li>2016</li>-->
        <!--</ul>-->
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(year,index) in dateTime" :key="index" :title="String(year.year)" :name="index+1">
            <div class="month" v-for="month in year.month">{{month}}月</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!--分页-->
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
    mounted(){
      console.log("切换年份："+this.$route.params.year)
      let _this = this;
      this.$ajax.get('/api/article').then(res => {
        console.log(res.data.data.dateTime)
        this.all = res.data.data
        this.dateTime = res.data.data.dateTime;
      })
      if(this.$route.params.year!=undefined){
          let year = this.$route.params.year
          let month = this.$route.params.month
          this.$ajax.get(`/api/article/${year}/${month}`).then(res => {
            console.log("月份菜单")
            console.log(res.data.data)
            _this.myActData = res.data.data;
            _this.pageCount=_this.myActData.length;
            _this.loadData();
          })
      }else{
        this.$ajax.get('/api/article').then( res =>{
          console.log(res.data.data)
          _this.myActData = res.data.data.allDate;
          _this.pageCount=_this.myActData.length;
          console.log("结果"+_this.pageCount)
          _this.loadData();
        })
      }
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
        console.log(this.articles)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-collapse-item__header{
    padding-left: 20px;
    font-size: 16px;
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
