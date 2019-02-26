<template>
    <div class="userRecipe">
      <div class="myRecipe">
        <img src="../../../static/homeImg/daily.jpg" alt="">
        <div>菜谱名</div>
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
  .myRecipe{
    width: 200px;
    height: 150px;
    overflow: hidden;
  }
}
</style>
