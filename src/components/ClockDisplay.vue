<template>
  <div class="clock-card">
    <div class="time">{{ time }}</div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 1. 定义响应式变量（ref）
const time = ref('')
const date = ref('')

// 2. 更新时间的逻辑
const updateClock = () => {
  const now = new Date()
  
  // 格式化时间
  time.value = now.toLocaleTimeString('zh-CN', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })

  // 格式化日期：2026年3月15日 星期日
  date.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 3. 生命周期钩子
let timer
onMounted(() => {
  updateClock() // 初始执行一次
  timer = setInterval(updateClock, 1000) // 每秒更新
})

onUnmounted(() => {
  clearInterval(timer) // 组件销毁时停止计时器
})
</script>

<style scoped>
/* 样式部分 */
.clock-card {
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #000000;
  padding: 20px;
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