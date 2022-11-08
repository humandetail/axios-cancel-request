<template>
  <div class="page-about">About</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue'
import { getAboutData } from '../api'


onMounted(() => {
  getAboutData()
    .then(res => {
      if (res.code !== 0) {
        throw res
      }
      console.log('About: success')
    })
    .catch(err => {
      if (!axios.isCancel(err)) {
        alert('About Error: ' + (err?.message || '服务器出错，请稍候再试'))
      }
    })
})
</script>
