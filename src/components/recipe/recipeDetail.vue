<template>
  <div>
    <div class="content">
      <div class="recipeDetail flex">
        <!--左边菜谱的步骤列表-->
        <div class="left">
          <div><img :src="recipe.recipeCoverImg" class="img" alt=""></div>
          <h2 class="recipeName">{{recipe.recipeName}}</h2>
          <div class="flex flex-h-cen flex-btw">
            <div class="num-l flex">
              <div><i class="iconfont icon-shoucang"></i>点赞{{recipe.recipePraiseNum}}人</div>
              <div style="margin-left: 10px;"><i class="iconfont icon-edit"></i>留言{{comment.length}}条</div>
            </div>
            <div class="num-r flex">
              <div class="bt text-center">收藏</div>
              <div class="bt text-center">点赞</div>
            </div>
          </div>
          <!--作者信息-->
          <div class="userInfo">
            <div class="u-top flex flex-h-cen">
              <div class="u-pic"><img :src="recipe.headPhoto" alt=""></div>
              <div class="u-name">{{recipe.userName}}</div>
              <div class="u-att text-center color-w" @click="attentionUser" v-if="att">+关注</div>
              <div class="u-att text-center color-w" @click="noAttention" v-else>已关注</div>
            </div>
            <div class="u-bot">{{recipe.recipeBrief}}</div>
          </div>
          <!--调味料-->
          <ul class="foodList">
            <li class="flex flex-h-cen food-r">
              <div class="foodName tit">食材名</div>
              <div class="foodNum tit">计量</div>
            </li>
            <li class="flex flex-h-cen food-r" v-for="list in recipeFood">
              <div class="foodName">{{list.foodName}}</div>
              <div class="foodNum">{{list.foodNum}}</div>
            </li>
          </ul>
          <!--步骤图文介绍-->
          <div class="stepList">
            <div class="step flex" v-for="(step,index) in recipeStep">
              <div class="stepL"><img :src="step.recipeStepImg" class="img" alt=""></div>
              <div class="stepR">
                <div class="stepNum">第{{index+1}}步</div>
                <div class="stepCtn">{{step.recipeStepBrief}}</div>
              </div>
            </div>
          </div>
          <!--菜谱评论-->
          <recipe-comment @all-comment="getCom"></recipe-comment>
          <!--全部评论-->
          <div class="cm">
            <h3 class="commentT">全部评论</h3>
            <div class="allComment" v-for="(item,i) in comment" v-if="i<n">
              <div class="user flex flex-h-cen">
                <div class="userHead"><img class="img" :src="item.headPhoto" alt=""></div>
                <div class="userName flex flex-f1 flex-btw">
                  <div>{{item.userName}}</div>
                  <div class="pointer" style="color:red;cursor: pointer;" v-if="item.userId == userId" @click="delComment(item.commentId)">删除</div>
                </div>
              </div>
              <div class="commentC" v-html="item.commentContent"></div>
            </div>
            <div v-if="comment.length==0" class="text-center " >暂无评论~</div>
            <div v-else-if="comment.length<=n"></div>
            <div @click="onload" v-else-if="show" class="pointer aa flex flex-cen" ><i class="iconfont icon-zhongxinjiazai"></i>加载更多</div>
            <div @click="hidden" v-if="unshow" class="pointer aa flex flex-cen" ><i class="iconfont icon-ziyuanldpi"></i>收起</div>
          </div>
        </div>
        <!--右边热门菜谱-->
        <div class="right flex-f1">
          <div class="hotRecipe">热门菜谱</div>
          <div class="recipeList flex" v-for="item in hotRecipe">
            <div class="recipePic"><img :src="item.recipeCoverImg" class="img" alt=""></div>
            <div class="recipeTxt flex-f1">
              <router-link :to="'/recipeDetail/'+item.detailsId">
                <h3 class="recipeTit">{{item.recipeName}}</h3>
              </router-link>
              <div class="recipeCtn line-clamp3">{{item.recipeBrief}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <appFooter></appFooter>
  </div>
</template>

<script>
  import appFooter from "../Footer"
    import recipeComment from './recipeComment'
    export default {
        name: "recipeDetail",
      data(){
          return {
            detailId: '',
            allDate: {},
            recipe: {},
            recipeFood: [],
            recipeStep: [],
            hotRecipe:[],
            comment:[],
            userId: localStorage.getItem('userId'),
            n:3,
            show:true,
            unshow:false,
            att:true
          }
      },
      components:{
        recipeComment,
        appFooter
      },
      methods:{
        delComment(commentId){
          console.log(commentId)
          this.$ajax.get(`/api/recipe/delComment/${commentId}`).then( res => {
            this.$ajax.get(`/api/recipe/comment/${this.detailId}`).then(res => {
              this.comment = res.data.data;
            })
          })
        },
        getCom(data){
          this.comment = data;
        },
        onload(){
          if(this.n<this.comment.length){
            if(this.n+3>=this.comment.length){
              this.n+=3;
              this.show=false;
              this.unshow=true;
            }else{
              this.n+=3;
            }
          }else{
            this.show=false
          }
        },
        hidden(){
          this.n=3;
          this.show=true;
          this.unshow=false;
        },
        mount(){
          this.detailId = this.$route.params.detailsId;
          this.$ajax.get(`/api/recipe/recipeDetail/${this.detailId}`).then(res => {
            console.log(res.data.data)
            this.allDate = res.data.data;
            this.recipe = this.allDate.recipe[0];
            console.log("菜谱详情")
            console.log(this.recipe)
            this.recipeFood = this.allDate.recipeFood;
            this.recipeStep = this.allDate.recipeStep;
            this.$ajax.get(`/api/users/isAttUser/${this.recipe.userId}/${this.$store.state.userId}`).then(res => {
              console.log(res.data.data[0].count)
              if(res.data.data[0].count == 1){
                this.att = !this.att;
              }
            })
          })
        },
        attentionUser(){
          this.$ajax.get(`/api/users/myAttention/${this.recipe.userId}/${this.$store.state.userId}`).then(res => {
            console.log(res)
            if(res.data.code == 200){
              this.att = !this.att;
            }
          })
        },
        noAttention(){
          this.$ajax.get(`/api/users/delAttentionUser/${this.recipe.userId}/${this.$store.state.userId}`).then(res => {
              this.att = !this.att;
            })
          }
      },
      watch:{
        "$route": "mount"
      },
      mounted(){
          this.mount()
          this.$ajax.get('/api/recipe/hotRecipe').then(res => {
            console.log("热门菜谱")
            console.log(res.data.data)
            this.hotRecipe = res.data.data;
          })
          this.$ajax.get(`/api/recipe/comment/${this.detailId}`).then(res => {
            this.comment = res.data.data;
          })

      }
    }
</script>

<style scoped lang="scss">
.recipeDetail{
  margin-bottom: 60px;
  .aa{
    i{
      margin-right: 3px;
    }
  }
  .pointer{
    cursor: pointer;
  }
  .left{
    padding: 10px;
    width: 700px;
    border: 1px solid #999;
    .recipeName{
      padding: 12px 0;
    }
    .num-r{
      .bt{
        width: 60px;
        height: 25px;
        line-height: 25px;
        margin-left: 10px;
        background-color: #91bfbf;
        border-radius: 4px;
        color: #FFFFFF;
      }
    }
    .userInfo{
      margin-top:10px;
      margin-bottom: 15px;
      background-color: #ccc;
      padding: 6px 10px;
      .u-top{
        .u-pic{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
        }
        .u-name{
          padding: 0 10px;
        }
        .u-att{
          width: 60px;
          height: 25px;
          line-height: 25px;
          background-color: #91bfbf;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      .u-bot{
        padding-top:6px;
      }
    }
    .foodList{
      padding-bottom: 10px;
      .food-r{
        border-bottom: 1px solid #ccc;
        height: 40px;
        .tit{
          font-weight: bold;
        }
        .foodName{
          width: 250px;
          padding: 30px;
        }
      }
    }
    .stepList{
      .step{
        padding: 10px 0;
        .stepL{
          width: 250px;
          height: 250px;
        }
        .stepR{
          flex:1;
          padding:0 40px;
          .stepNum{
            font-size: 20px;
          }
        }
      }
    }
  }
  .right{
    /*border: 1px solid #999;*/
    margin-left: 20px;
    .hotRecipe{
      padding: 0 0 0 20px;
      height: 40px;
      line-height: 40px;
      color: #FFFFFF;
      font-size: 18px;
      background-color: #91bfbf;
    }
    .recipeList{
      padding: 10px;
      border: 1px solid #999;
      border-top: 0 solid transparent;
      .recipePic{
        width: 150px;
      }
      .recipeTxt{
        padding-left: 10px;
        .recipeTit{
          padding-bottom: 10px;
        }
      }
    }
  }
  .cm{
    padding: 0 20px;
    margin-top: 20px;
    .allComment{
      padding: 10px 0;
      .user{
        .userHead{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
        }
        .userName{
          padding-left: 10px;
        }
      }
      .commentC{
        padding-left: 70px;
      }
    }
  }
}
</style>
