<template>
  <div class="page-home">
    <div class="conditions-wrapper">
      <div
        v-for="item of types"
        :key="item.value"
        class="item"
        :class="{
          active: currentType === item.value,
        }"
        @click="currentType = item.value"
      >
        {{ item.label }}
      </div>
    </div>

    <div
      class="results-wrapper"
      :class="{ loading }"
    >
      <div
        v-for="item of records"
        :key="item.id"
        class="item"
      >
        <div class="row">
          <div class="label">类型：</div>
          <div class="value">{{ item.type }}</div>
        </div>

        <div class="row">
          <div class="label">名称：</div>
          <div class="value">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { getHomeData, getRecords } from '../api'

type RecordType = {
  id: number;
  type: number;
  name: string;
}

const types = [
  { label: '全部', value: 0 },
  { label: '类型1', value: 1 },
  { label: '类型2', value: 2 },
]

const currentType = ref(0)
const loading = ref(false)
const records = ref<RecordType[]>([])

const fetch = async () => {
  try {
    loading.value = true

    const res = await getRecords<RecordType[]>(currentType.value)

    if (res.code !== 0) {
      throw res
    }

    records.value = res.data

    loading.value = false
  } catch (err: any) {
    if (axios.isCancel(err)) {
      loading.value = true
    } else {
      loading.value = false
      records.value = []
      alert(err.message || '服务器出错，请稍候再试')
    }
  }
}

watch(currentType, () => {
  fetch()
}, { immediate: true })

onMounted(() => {
  getHomeData()
    .then(res => {
      if (res.code !== 0) {
        throw res
      }
      console.log('Home: success')
    })
    .catch(err => {
      if (!axios.isCancel(err)) {
        alert(`Home Error: ` + (err?.message || '服务器出错，请稍候再试'))
      }
    })
})
</script>

<style lang="scss" scoped>
$brand-color: #0088ff;
$border-color: #f1f1f1;
$primary-text: #333;

.page-home {
  padding: 16px;
}

.conditions-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;

  .item {
    width: 120px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 8px;
    color: $primary-text;
    border: 1px solid $border-color;
    cursor: pointer;

    &.active {
      background-color: $brand-color;
      border-color: $brand-color;
      color: #fff;
    }
  }
}

.results-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid $border-color;
  min-height: 100px;

  &:empty::before {
    content: '暂无数据';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    line-height: 40px;
    text-align: center;
    color: #ddd;
    transform: translate(-50%, -50%);
  }

  &.loading::after {
    content: 'Loading...';
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: $brand-color;
    background-color: rgba(255, 255, 255, .5);
  }

  .item {
    width: 120px;
    padding: 16px;
    border: 1px solid $border-color;
    color: $primary-text;

    .row {
      display: flex;
      align-items: center;
    }
  }
}
</style>
