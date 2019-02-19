<template>
    <div class="activity">
      <div class="w-all">
        <img src="../../../static/homeImg/recipeBackUrl.jpg"  alt="">
      </div>
      <activity-list></activity-list>
    </div>
</template>

<script>
  import activityList from './activityList'
    export default {
        name: "activity",
      components:{
        'activity-list': activityList,
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
