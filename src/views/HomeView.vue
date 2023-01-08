<script setup lang="ts">
import { Menu as IconMenu } from '@element-plus/icons-vue'
</script>

<template>
  <el-page-header :icon="null">
    <!-- Line 1 -->
    <template #breadcrumb />
    <!-- Line 2 -->
    <template #icon />
    <template #title> 臭狗蛋的学习之旅 </template>
    <template #content />
    <template #extra />
    <!-- Lines after 2 -->
    <template #default />
  </el-page-header>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>生成随机数</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
