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
    <el-button type="primary" @click="onGenerate">生成</el-button>
    <div>结果：{{ result }}</div>
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

form.value.textarea = localStorage.getItem('textarea') || ''

const result = ref('')

function onGenerate() {
  if (!form.value.count) return
  if (form.value.type === 0 && form.value.max && form.value.min) {
    if (
      form.value.count >
      Number(form.value.max!) - Number(form.value.min!) + 1
    )
      return

    const list: number[] = []
    for (let i = 0; i < form.value.count; i++) list.push(random())

    if (form.value.repeat) result.value = list.join(' ')
    else {
      calcRepeat(list)
    }
  } else if (form.value.type === 1 && form.value.textarea) {
    localStorage.setItem('textarea', form.value.textarea)
    const text = form.value.textarea
      .split(' ')
      .map((item) => Number(item))
      .filter((item) => !isNaN(item))

    if (form.value.count > text.length) return

    const list: number[] = []
    for (let i = 0; i < form.value.count; i++) list.push(random2(text.length))

    if (form.value.repeat)
      result.value = list.map((item) => text[item]).join(' ')
    else {
      result.value = calcRepeat2(list, text.length)
        .map((item) => text[item])
        .join(' ')
    }
  }
}

function random() {
  return parseInt(
    String(
      Math.random() * (Number(form.value.max!) - Number(form.value.min!) + 1) +
        Number(form.value.min!)
    ),
    10
  )
}

function random2(max: number) {
  return parseInt(String(Math.random() * max), 10)
}

function calcRepeat(list: number[]) {
  const newList = new Array(...new Set(list))
  if (newList.length >= Number(form.value.count!)) result.value = list.join(' ')
  else {
    newList.push(random())
    calcRepeat(newList)
  }
}

function calcRepeat2(list: number[], max: number): number[] {
  const newList = new Array(...new Set(list))
  if (newList.length >= Number(form.value.count!)) return newList
  else {
    newList.push(random2(max))
    return calcRepeat2(newList, max)
  }
}
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
