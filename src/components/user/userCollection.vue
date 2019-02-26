<template>
    <div class="collection">
      <fieldset class="collection-rep">
        <legend>菜谱</legend>
        <div class="flex flex-wrap">
          <div class="repiceCard flex" v-for="item in 5">
            <div class="recipeCard-l"><img src="../../../static/homeImg/daily.jpg" alt=""></div>
            <div class="recipeCard-r">
              <h4>菜谱名</h4>
              <div>菜谱简介</div>
            </div>
          </div>
        </div>
      </fieldset>

    </div>
</template>

<script>
    export default {
        name: "userCollection"
    }
</script>

<style scoped lang="scss">
.collection{
  .collection-rep{
    width: 94%;
    margin: 0 auto;
    border: 2px solid #d5d5ab;
    padding: 10px 30px;
    legend{
      margin-left: 30px;
      font-size: 16px;
      padding: 0 10px;
    }
    .repiceCard{
      width: 260px;
      padding: 6px;
      border: 1px solid #ccc;
      margin-right: 20px;
      margin-left: 30px;
      margin-bottom: 20px;
      /*box-shadow: 2px 2px 5px #ccc;*/
      .recipeCard-l{
        width: 120px;
        height: 80px;
        overflow: hidden;
      }
      .recipeCard-r{
        padding-left: 10px;
      }
    }
  }
}
</style>
