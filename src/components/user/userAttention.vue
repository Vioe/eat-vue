<template>
    <div class="userAttention">
        <div class="flex flex-wrap flex-btw">
          <div class="attUser flex flex-btw flex-h-cen" v-for="item in attentionUser">
            <div class="attL flex flex-h-cen">
              <div class="userHead"><img class="img" :src="item.headPhoto" alt=""></div>
              <div>{{item.userName}}</div>
            </div>
            <div class="attR" @click="delUser(item.userId)">取消关注</div>
          </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
      name: "userAttention",
      data() {
        return {
          attentionUser: []
        }
      },
      computed: mapGetters([
        "isLogin",
        "userId"
      ]),
      mounted() {
        this.$ajax.get(`/api/users/attention/${this.userId}`).then(res => {
          this.attentionUser = res.data.data;
        })
      },
      methods: {
        delUser(attUserId) {
          this.$confirm('是否不再关注该用户？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$ajax.get(`/api/users/delAttentionUser/${attUserId}/${this.userId}`).then(res => {
              this.$ajax.get(`/api/users/attention/${this.userId}`).then(res => {
                this.attentionUser = res.data.data;
                this.$message({
                  type: 'success',
                  message: '已取消!'
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
  .userAttention{
    padding: 20px 90px;
    .attUser{
      width: 400px;
      border: 4px dotted #cccccc;
      padding: 10px 20px;
      margin-bottom: 20px;
      box-shadow: 0 0 20px #ccc;
      .attL{
        .userHead{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20px;
        }
      }
      .attR{
        padding: 6px 10px;
        border-radius: 4px;
        background-color: #91bfbf;
        color: #FFFFFF;
      }
    }
  }
  .collection-rep{
    width: 94%;
    margin: 0 auto;
    border: 2px solid #d5d5ab;
    padding: 10px 30px;
    legend{
      margin-left: 30px;
      font-size: 16px;
      padding: 0 10px;
    }
    .repiceCard{
      width: 260px;
      padding: 6px;
      border: 1px solid #ccc;
      margin-right: 20px;
      margin-left: 30px;
      margin-bottom: 20px;
      /*box-shadow: 2px 2px 5px #ccc;*/
      .recipeCard-l{
        width: 120px;
        height: 80px;
        overflow: hidden;
      }
      .recipeCard-r{
        padding-left: 10px;
      }
    }
  }
</style>
