<template>
    <div class="userRecipe">
      <div class="inner">
        <div class="myRecipe" v-for="item in 7">
          <div class="recipe-Pic">
            <img src="../../../static/homeImg/daily.jpg" alt="">
          </div>
          <div class="recipe-txt flex flex-btw">
            <div>菜谱名</div>
            <div><i class="iconfont icon-shanchu"></i></div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "userRecipe"
    }
</script>

<style scoped lang="scss">
.userRecipe{
  padding: 10px 0;
  .inner{
    width: 920px;
    margin: 0 auto;
  }
  .myRecipe{
    width: 200px;
    overflow: hidden;
    border: 4px solid white;
    box-shadow: 0 0 20px #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-left: 15px;
    margin-right: 15px;
    float: left;
    .recipe-txt{
      padding: 10px 15px;
    }
  }
}
</style>
