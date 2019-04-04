<template>
    <div class="content">
      <div class="recipe flex">
        <div class="left">
          <div class="leftTit color-w">逛菜谱</div>
          <div class="recipeList">
            <recipe-waterfull></recipe-waterfull>
          </div>
        </div>
        <div class="right">
          <div class="rightTit color-w">精选作者推荐</div>
          <div class="userList">
            <div class="recipeUser flex flex-h-cen" v-for="(item,index) in fourUser" >
              <div class="userLeft flex flex-h-cen">
                <div class="ico flex flex-cen">
                  <!--<i class="iconfont icon-shuiguo"></i>-->
                  <div>{{index+1}}</div>
                </div>
                <div class="userHeadPic"><img class="img" :src="item.headPhoto" alt=""></div>
              </div>
              <div class="userRight">
                <p class="txt1">{{item.userName}}</p>
                <p><i class="iconfont icon-xihuan1"></i>{{item.recipePraiseNum}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import recipeList from './recipeList'
    export default {
        name: "Recipe",
      data(){
          return {
            fourUser: []
          }
      },
      components:{
          'recipe-waterfull': recipeList
      },
      mounted(){
        this.$ajax.get('/api/recipe/getFourUser').then(res => {
          console.log("我是精选作者")
          console.log(res.data.data)
          this.fourUser = res.data.data;
        })
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.recipe{
  .left{
      width: 770px;
      .leftTit{
        padding: 0 0 0 17px;
        font-size: 16px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #c1a174;
      }
    }
  .right{
      width: 300px;
      margin-left:30px;
      .rightTit{
        padding: 0 0 0 17px;
        width: 100%;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        background-color: #c1a174;
      }
      .userList{
        .recipeUser{
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          background-color: #FFFFFF;
          padding: 10px;
          .userLeft{
            .ico{
              width: 50px;
            }
          }
          .userRight{
            padding: 0 15px;
            .txt1{
              padding: 0 0 10px 0;
            }
          }
        }
      }
    }
  .userHeadPic{
    width: 70px;
    height: 70px;
    overflow: hidden;
  }
}
</style>
