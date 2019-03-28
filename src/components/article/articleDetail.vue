<template>
  <div class="content">
    <div class="articleDetail">
      <!--<div class="flex flex-cen"><img :src="articleDate.articleCoverImg" alt=""></div>-->
      <h1>{{articleDate.articleTitle}}</h1>
      <div class="articleContent">{{articleDate.articleContent}}</div>
      <div class="articleTime">{{articleDate.articleTime}}</div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "articleDetail",
      data(){
        return {
          articleDate:[]
        }
      },
      mounted(){
        console.log(this.$route.params.articleId)
        this.$ajax.get(`/api/getArticleDetail/${this.$route.params.articleId}`).then(res => {
          this.articleDate = res.data.data[0];
          JSON.p
        })
      }
    }
</script>

<style scoped lang="scss">
h1{
  text-align: center;
  padding: 20px 0;
}
  .articleTime{
    text-align: right;
    font-size: 16px;
    color: #cccccc;
    padding-top: 20px;
}
  .articleContent{
    line-height: 20px;
    font-size: 14px;
  }
  .articleDetail{
    padding: 0 20px 40px 20px;
  }
</style>
