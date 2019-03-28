<template>
    <div class="joinActivity">
      <div class="inner">
        <div class="myRecipe" v-for="item in allActivity">
            <div class="recipe-Pic">
              <img :src="item.activityImg" alt="">
            </div>
          <div class="recipe-txt">
            <div>{{item.activityName}}</div>
            <div style="text-align: right;">{{item.activityState}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
        name: "userJoinActivity",
        data(){
          return {
            allActivity:[]
          }
        },
        computed: mapGetters([
          "isLogin",
          "userId"
        ]),
        mounted(){
          this.$ajax.get(`/api/users/joinActivity/${this.userId}`).then(res => {
            console.log("用户参与活动")
            console.log(res.data.data)
            this.allActivity = res.data.data;
          })
        }

    }
</script>

<style scoped lang="scss">
.joinActivity {
  .inner {
    width: 920px;
    margin: 0 auto;
  }
  .myRecipe {
    width: 200px;
    overflow: hidden;
    border: 4px solid white;
    box-shadow: 0 0 20px #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-left: 15px;
    margin-right: 15px;
    float: left;
    .recipe-txt {
      padding: 10px 15px;
    }
  }
}
</style>
