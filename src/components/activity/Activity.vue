<template>
    <div class="activity flex">
      <div class="left">
        <div class="backTop"><img :src="activity.activityImgTop" alt=""></div>
        <h1 class="activityName text-center">{{activity.activityName}}</h1>
        <!--<div class="activityTime">活动开始时间：{{activity.activitySTime.substr(0,10)}} 至 {{activity.activityETime.substr(0,10)}}</div>-->
        <div class="activityCtn">{{activity.activityContent}}</div>
        <div class="flex flex-btw btn">
          <div class="activityBtn text-center a">{{activity.activityState}}</div>
          <div class="activityBtn text-center b" @click="join">我要报名</div>
        </div>
      </div>
      <div class="right flex-f1">
        <div><img :src="activity.activityImgRight" alt=""></div>
      </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
      name: "activity",
      data(){
        return {
          activity:[]
        }
      },
      computed: mapGetters([
        "isLogin",
        "userId"
      ]),
      mounted(){
        console.log(this.$route.params.activityId)
        this.$ajax.get(`/api/activity/activityDetail/${this.$route.params.activityId}`).then(res => {
          console.log(res.data.data[0])
          this.activity = res.data.data[0];
        })
      },
      methods:{
        join(){
          this.$ajax.get(`/api/activity/addActivityResult/${this.userId}/${this.$route.params.activityId}`).then(res => {
            console.log(res.data.code)
            if(res.data.code == 200){
              this.$notify({
                title: '成功',
                message: '关注成功！',
                type: 'success'
              });
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .activity{
    width: 1100px;
    margin: 0 auto;
    margin-top:70px;
    padding-bottom: 60px;
    background-color: #feedd1;
    .left{
      width: 850px;
      margin-right: 10px;
      img{
        width: 850px;
      }
      .activityName{
        padding:20px 0;
      }
      .activityTime{
        padding: 10px 20px;
      }
    }
    .btn{
      padding: 0 20px;
      margin-top: 40px;
    }
    .activityCtn{
      padding: 0 20px;
    }
    .activityBtn{
      width: 400px;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      background-color: white;
      box-shadow:0px 2px 3px 0px #cccccc;
    }
    .b{
      background-color: #91bfbf;
      color: #FFFFFF;
    }
  }
</style>
