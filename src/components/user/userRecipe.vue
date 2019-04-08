<template>
    <div class="userRecipe">
      <div class="inner">
        <div class="myRecipe" v-for="item in myRecipe">
          <router-link :to="'/recipeDetail/'+item.detailsId">
            <div class="recipe-Pic" style="height: 128px;overflow-y: hidden;">
              <img :src="item.recipeCoverImg" alt="" style="width:100%;">
            </div>
          </router-link>
          <div class="recipe-txt flex flex-btw">
            <div>{{item.recipeName}}</div>
            <div @click="delRecipe(item.detailsId)"><i class="iconfont icon-shanchu"></i></div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "userRecipe",
        data(){
            return {
              myRecipe:[],
              recipeUserId:""
            }
        },
        mounted(){
          console.log("我的菜谱")
          if(this.$route.params.userId == undefined){
            this.recipeUserId = this.$store.state.userId
            this.$ajax.get(`/api/getMyRecipe/${this.$store.state.userId}`).then( res => {
              this.myRecipe = res.data.data;
            })
          }else{
            this.recipeUserId = this.$route.params.userId
            this.$ajax.get(`/api/getMyRecipe/${this.recipeUserId}`).then( res => {
              this.myRecipe = res.data.data;
            })
          }
        },
        methods:{
          delRecipe(detailId){
            console.log(detailId)
            console.log(this.$store.state.userId)
            this.$confirm('是否删除该菜谱？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$ajax.get(`/api/recipe/delRecipe/${this.recipeUserId}/${detailId}`).then(res => {
                this.$ajax.get(`/api/getMyRecipe/${this.recipeUserId}`).then( res => {
                  // console.log(res.data.data)
                  this.myRecipe = res.data.data;
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                })
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        }
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
