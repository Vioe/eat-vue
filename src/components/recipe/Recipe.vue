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
            <div class="recipeUser flex flex-h-cen" v-for="(item,index) in 4" >
              <div class="userLeft flex flex-h-cen">
                <div class="ico flex flex-cen">
                  <!--<i class="iconfont icon-shuiguo"></i>-->
                  <div>{{index+1}}</div>
                </div>
                <div class="userHeadPic"><img src="https://i1.douguo.com/upload/photo/5/e/d/70_u19730136739726144900.jpg" alt=""></div>
              </div>
              <div class="userRight">
                <p class="txt1">用户名</p>
                <p>被关注的数量</p>
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
      components:{
          'recipe-waterfull': recipeList
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

}
</style>
