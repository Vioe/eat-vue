<template>
  <div>
    <div class="activity">
      <div class="w-all">
        <img src="../../../static/homeImg/recipeBackUrl.jpg"  alt="">
      </div>
      <article-list></article-list>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import appFooter from "../Footer"
import articleList from './articleList'
export default {
name: "articleRec",
components:{
  'article-list': articleList,
  'my-footer': appFooter
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

