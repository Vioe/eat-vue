<template>
    <div class="joinActivity">
      <div class="inner">
        <div class="myRecipe" v-for="item in allActivity">
          <router-link :to="'/activity/'+item.activityId">
            <div class="recipe-Pic">
              <img :src="item.activityImg" alt="">
            </div>
          </router-link>
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
            allActivity:[],
            activityUserId:""
          }
        },
        computed: mapGetters([
          "isLogin",
          "userId"
        ]),
        mounted(){
          if(this.$route.params.userId == undefined){
            this.activityUserId = this.userId;
          }else{
            this.activityUserId = this.$route.params.userId;
          }
          this.$ajax.get(`/api/users/joinActivity/${this.activityUserId}`).then(res => {
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
