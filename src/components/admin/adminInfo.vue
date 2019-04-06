<template>
    <div class="adminInfo">
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <router-link role="presentation" to="/activityManger" tag="li">
                  <el-menu-item index="1">
                    <i class="el-icon-picture-outline"></i>
                    <span slot="title">活动管理</span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-edit-outline"></i>
                    <span>文章管理</span>
                  </template>
                  <el-menu-item-group>
                    <!--<template slot="title">已发布的文章</template>-->
                    <router-link role="presentation" to="/articleManger" tag="li">
                      <el-menu-item index="2-1">文章列表</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                  <el-menu-item-group>
                    <!--<template slot="title">文章发布</template>-->
                    <router-link role="presentation" to="/addActivity" tag="li">
                      <el-menu-item index="2-2">添加文章</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import leftMenu from './leftMenu'
    export default {
      name: "adminInfo",
      components:{
        leftMenu
      },
      data(){
        return {
          tabPosition: 'left'
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped lang="scss">
.adminInfo{
  margin-top: 60px;
}
</style>
