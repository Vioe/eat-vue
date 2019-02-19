<template>
  <div class="article flex">
    <!--文章列表-->
    <div class="articleLists">
      <div class="articleList flex" v-for="item in 5">
        <div class="articleLeft">
          <img src="http://images.meishij.net/p/20161116/e1a14a1e26c092e39a659adacd48158c.jpg" alt="">
        </div>
        <div class="articleRight flex-f1">
          <p class="articleTit">65℃以上热饮成高危致癌物</p>
          <p class="articleCtn">亚油酸是人体必需脂肪酸，能与血液中的胆固醇结合，促进胆固醇的转运和代谢，预防动脉粥样硬化。腐竹还富含具有血管清道夫功能的大豆卵磷脂，同样能降低胆固醇、软化血管、预防心脑血管疾病，还具有健脑作用。同样能降低胆固醇、软化血管、预防心脑血管疾病，还具有健脑作用同样能降低胆固醇、软化血管、预防心脑血管疾病，还具有健脑作用(马冠生)//来源：新华网//s</p>
        </div>
      </div>
    </div>
    <!--文章日期-->
    <div class="articleTime">
      <div class="allTime text-center color-w">全部</div>
      <ul class="timeList">
        <li>2019</li>
        <li>2018</li>
        <li>2017</li>
        <li>2016</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "activityList"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  }
}

</style>
