<template>
  <div class="clock-card">
    <div class="time">{{ time }}</div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')
const date = ref('')
let timer = null // 存储定时器 ID

// 获取并格式化当前时间
const updateClock = () => {
  const now = new Date()
  
  time.value = now.toLocaleTimeString('zh-CN', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })

  date.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 组件挂载时启动定时器
onMounted(() => {
  updateClock() 
  timer = setInterval(updateClock, 1000) 
})

// 组件卸载时清理定时器，防止内存泄漏
onUnmounted(() => {
  if (timer) clearInterval(timer) 
})
</script>

<style scoped>
.clock-card {
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #000000;
  padding: 20px;
  z-index: 10;
}

.time {
  font-size: 80px;
  font-weight: bold;
  letter-spacing: 2px;
}

.date {
  font-size: 20px;
  color: #000000;
  margin-top: 10px;
}
</style>