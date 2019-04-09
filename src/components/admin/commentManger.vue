<template>
    <div>
      <el-table
        :data="myActData1"
        style="width: 100%"
        max-height="400">
        <el-table-column
          prop="commentId"
          label="评论编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="detailsId"
          label="菜谱id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户id"
          width="250">
        </el-table-column>
        <el-table-column
          prop="commentContent"
          label="评论内容"
          width="250">
        </el-table-column>
        <el-table-column
          prop="commentTime"
          label="评论时间"
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
      name: "commentManger",
      data(){
          return {
            tableData:[],
            pageIndex: 1,
            pagesize: 5,
            pageCount:0,
            comment:[]
          }
      },
      mounted(){
          this.$ajax.get('/api/recipe/commentList').then(res => {
            console.log(res.data.data)
            this.tableData = res.data.data;
            this.pageCount = this.tableData.length;
            this.loadData();
          })
      },
      computed:{
        myActData1() {
          return this.comment
        }
      },
      methods:{
        deleteRow(index,rows){
          this.$ajax.get(`/api/recipe/delComment/${rows[index].commentId}`).then( res => {
            rows.splice(index, 1)
            this.$notify({
              title: '成功',
              message: '删除成功！',
              type: 'success'
            });
          })
        },
        change(){
          this.loadData();
        },
        loadData() {
          this.comment = [];
          let start = (this.pageIndex - 1) * this.pagesize;
          let end = start + this.pagesize;
          if (end >= this.pageCount){
            end = this.pageCount
          }
          for (let i = start; i < end; i++) {
            this.comment.push(this.tableData[i])
          }
        },
      }
    }
</script>

<style scoped lang="scss">
/deep/ .el-table .cell{
  height: 23px;
}
</style>
