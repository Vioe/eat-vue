<template>
  <div class="activity">
    <div class="w-all">
      <img src="../../../static/homeImg/recipeBackUrl.jpg"  alt="">
    </div>
    <article-list></article-list>
  </div>
</template>

<script>
import articleList from './articleList'
export default {
name: "article",
components:{
'article-list': articleList,
}
}
</script>

<style scoped>
.activity{
  width: 1100px;
  margin: 0 auto;
  margin-top:50px;
  background-color: #feedd1;
}
</style>

