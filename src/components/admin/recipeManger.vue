<template>
    <div>
      <el-table
        :data="myActData1"
        style="width: 100%"
        max-height="400">
        <el-table-column
          prop="detailsId"
          label="菜谱编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="recipeName"
          label="菜谱名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="userId1"
          label="用户id"
          width="250">
        </el-table-column>
        <el-table-column
          prop="recipePraiseNum"
          label="点赞数"
          width="250">
        </el-table-column>
        <el-table-column
          prop="recipeClassifyId"
          label="菜谱类型"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, myActData1)"
              type="text"
              size="small">
              删除
            </el-button>
            <el-button
              @click.native.prevent="detail(scope.$index, myActData1)"
              type="text"
              size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="row text-center activityPage">
        <div class="block">
          <span class="demonstration" ></span>
          <el-pagination ref="elpage"
                         @current-change="change()"
                         :current-page.sync="pageIndex"
                         layout="prev, pager, next"
                         :total="pageCount"
                         :page-size = "pagesize"
          >
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "recipeManger",
      data(){
        return {
          tableData:[],
          pageIndex: 1,
          pagesize: 5,
          pageCount:0,
          recipe:[]
        }
      },
      mounted(){
        this.$ajax.get('/api/recipe/adminRecipeList').then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data;
          this.pageCount = this.tableData.length;
          this.loadData();
        })
      },
      computed:{
        myActData1() {
          return this.recipe
        }
      },
      methods:{
        deleteRow(index,rows){
          console.log(this.tableData[index].detailsId)
          this.$ajax.get(`/api/recipe/delRecipe/${this.recipeUserId}/${rows[index].detailsId}`).then(res => {
            rows.splice(index, 1)
          })
        },
        detail(index,rows){
          this.$router.push(`/recipeDetail/${rows[index].detailsId}`)
        },
        change(){
          this.loadData();
        },
        loadData() {
          this.recipe = [];
          let start = (this.pageIndex - 1) * this.pagesize;
          let end = start + this.pagesize;
          if (end >= this.pageCount){
            end = this.pageCount
          }
          for (let i = start; i < end; i++) {
            this.recipe.push(this.tableData[i])
          }
        },
      }
    }
</script>

<style scoped>

</style>
