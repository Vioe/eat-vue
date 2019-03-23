<template>
    <div class="userRecipe">
      <div class="inner">
        <div class="myRecipe" v-for="item in myRecipe">
          <router-link :to="'/recipeDetail/'+item.detailsId">
            <div class="recipe-Pic">
              <img :src="item.recipeCoverImg" alt="">
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
              myRecipe:[]
            }
        },
        mounted(){
          console.log("我的菜谱")
            this.$ajax.get(`/api/getMyRecipe/${this.$store.state.userId}`).then( res => {
              // console.log(res.data.data)
              this.myRecipe = res.data.data;
            })
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
              this.$ajax.get(`/api/recipe/delRecipe/${this.$store.state.userId}/${detailId}`).then(res => {
                this.$ajax.get(`/api/getMyRecipe/${this.$store.state.userId}`).then( res => {
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
