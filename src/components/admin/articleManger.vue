<template>
    <div class="articleManger">
      <el-table
        :data="myActData1"
        style="width: 100%"
        max-height="400">
        <el-table-column
          prop="articleId"
          label="文章编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="articleTitle"
          label="文章标题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="articleTime"
          label="发布时间"
          width="250">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="发布用户"
          width="250">
        </el-table-column>
        <el-table-column
          prop="classifyId"
          label="文章类型"
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
      name: "articleManger",
      data(){
        return {
          tableData: [],
          pageIndex: 1,
          pagesize: 5,
          pageCount:0,
          article:[]
        }
      },
      mounted(){
        this.$ajax.get('/api/article/getAdminArticle').then(res => {
          this.tableData = res.data.data;
          this.pageCount = this.tableData.length;
          this.loadData();
        })
      },
      computed:{
        myActData1() {
          return this.article
        }
      },
      methods: {
        deleteRow(index, rows) {
          console.log(index)
          console.log(this.tableData[index].articleId)
          this.$ajax.get(`/api/delAdminArticle/${rows[index].articleId}`).then(res => {
            rows.splice(index, 1)
          })
        },
        detail(index,rows){
          this.$router.push(`/articleDetail/${rows[index].articleId}`)
        },
        change(){
          this.loadData();
        },
        loadData() {
          this.article = [];
          let start = (this.pageIndex - 1) * this.pagesize;
          let end = start + this.pagesize;
          if (end >= this.pageCount){
            end = this.pageCount
          }
          for (let i = start; i < end; i++) {
            this.article.push(this.tableData[i])
          }
        },
      },
    }
</script>

<style scoped lang="scss">
  /*/deep/ .el-button--text{*/
    /*color: #f56c6c !important;*/
  /*}*/
</style>
