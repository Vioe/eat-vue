<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">

        <router-link role="presentation" to="/articleManger" tag="li">
          <el-menu-item index="1">
            <i class="el-icon-upload"></i>
            <span slot="title">控制台</span>
          </el-menu-item>
        </router-link>


        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">已发布的文章</template>
            <router-link role="presentation" to="/" tag="li">
              <el-menu-item index="2-1">文章管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章发布</template>
            <router-link role="presentation" to="" tag="li">
              <el-menu-item index="2-2">编辑文章</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
    export default {
      name: "leftMenu",
      methods: {
        handleOpen(key, keyPath){
          console.log(key, keyPath);
        },
        handleClose(key, keyPath){
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
