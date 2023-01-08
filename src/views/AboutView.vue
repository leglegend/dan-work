<template>
  <div class="about">
    <el-form :model="form" label-width="80px">
      <el-form-item label="生成数量">
        <el-input
          v-model="form.count"
          placeholder="请输入需要生成随机数的数量"
        />
      </el-form-item>
      <el-form-item label="生成方式">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">自动生成</el-radio>
          <el-radio :label="1">手动输入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生成区间">
        <div v-if="form.type === 0" class="min-max">
          <el-input v-model="form.min" placeholder="最小值" />-
          <el-input v-model="form.max" placeholder="最大值" />
        </div>
        <el-input
          v-else
          v-model="form.textarea"
          :rows="2"
          type="textarea"
          placeholder="输入数字，以空格隔开，自动记录上次输入的内容"
        />
      </el-form-item>
      <el-form-item label="能否重复">
        <div class="min-max">
          <el-switch v-model="form.repeat" />
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary">生成</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const form = ref<{
  count?: number
  type: number
  min?: number
  max?: number
  repeat: boolean
  textarea?: string
}>({
  type: 0,
  repeat: false,
})
</script>

<style scoped lang="scss">
.about {
  padding: 16px;
  width: 300px;
  .min-max {
    display: flex;
    gap: 5px;
  }
}
</style>
