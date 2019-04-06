<template>
    <div class="articleManger">
      <el-table
        :data="tableData"
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
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "articleManger",
      data(){
        return {
          tableData: []
        }
      },
      mounted(){
        this.$ajax.get('/api/article/getAdminArticle').then(res => {
          this.tableData = res.data.data;
        })
      },
      methods: {
        deleteRow(index, rows) {
          console.log(index)
          console.log(this.tableData[index].articleId)
          this.$ajax.get(`/api/delAdminArticle/${this.tableData[index].articleId}`).then(res => {
            rows.splice(index, 1)
          })
        }
      },
    }
</script>

<style scoped lang="scss">
  /deep/ .el-button--text{
    color: #f56c6c !important;
  }
</style>
