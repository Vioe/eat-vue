<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400">
        <el-table-column
          prop="activityId"
          label="活动编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="activityName"
          label="活动名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="activitySTime"
          label="活动开始"
          width="250">
        </el-table-column>
        <el-table-column
          prop="activityETime"
          label="活动结束"
          width="250">
        </el-table-column>
        <el-table-column
          prop="activityState"
          label="活动状态"
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
      name: "activityManger",
      data(){
        return {
          tableData: []
        }
      },
      mounted(){
        this.$ajax.get('/api/activity/getAdminActivity').then( res => {
          console.log(res.data.data)
          this.tableData = res.data.data;
        })
      },
      methods: {
        deleteRow(index, rows) {
          console.log(index)
          console.log(this.tableData[index].activityId)
          this.$ajax.get(`/api/activity/delAdminActivity/${this.tableData[index].activityId}`).then( res =>{
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
