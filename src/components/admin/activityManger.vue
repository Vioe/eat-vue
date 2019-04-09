<template>
    <div>
      <el-table
        :data="myActData1"
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
      name: "activityManger",
      data(){
        return {
          tableData: [],
          pageIndex: 1,
          pagesize: 5,
          pageCount:0,
          activity:[],
          all: {}
        }
      },
      computed:{
        myActData1() {
          return this.activity
        }
      },
      mounted(){
        this.$ajax.get('/api/activity/getAdminActivity').then( res => {
          console.log(res.data.data)
          this.tableData = res.data.data;
          this.pageCount = this.tableData.length;
          this.loadData()
        })
      },
      methods: {
        deleteRow(index, rows) {
          this.$ajax.get(`/api/activity/delAdminActivity/${rows[index].activityId}`).then( res =>{
            rows.splice(index, 1)
          })
        },
        change(){
          this.loadData();
        },
        loadData() {
          this.activity = [];
          let start = (this.pageIndex - 1) * this.pagesize;
          let end = start + this.pagesize;
          if (end >= this.pageCount){
            end = this.pageCount
          }
          for (let i = start; i < end; i++) {
            this.activity.push(this.tableData[i])
          }
          console.log(this.activity)
        },
      },
    }
</script>

<style scoped lang="scss">
/*/deep/ .el-button--text{*/
  /*color: #f56c6c !important;*/
/*}*/
</style>
