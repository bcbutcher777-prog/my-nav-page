<template>
  <div class="weather-wrapper">
    <div v-if="loading" class="weather-loading">正在获取天气...</div>
    
    <div v-else class="weather-content">
      <span class="location">📍 {{ displayCity }}</span>
      <span class="temp">{{ temp }}°C</span>
      <span class="text">{{ weatherText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 1. 先定义所有响应式变量
const displayCity = ref('定位中...')
const temp = ref('--')
const weatherText = ref('--')
const loading = ref(true)

// 2. 先定义翻译函数（确保在被调用前就已经存在）
const translateWeather = (desc) => {
  if (!desc) return '未知'
  const dict = {
    'Clear': '晴', 
    'Sunny': '晴', 
    'Partly cloudy': '多云',
    'Cloudy': '阴', 
    'Overcast': '阴', 
    'Mist': '有雾',
    'Patchy rain possible': '可能有雨', 
    'Light rain': '小雨',
    'Moderate rain': '中雨',
    'Heavy rain': '大雨'
  }
  return dict[desc] || desc
}

// 3. 最后执行生命周期钩子
onMounted(async () => {
  try {
    // 获取城市
    const ipRes = await fetch('https://pv.sohu.com/cityjson?ie=utf-8')
    const ipText = await ipRes.text()
    const match = ipText.match(/"cname":\s*"(.*?)"/)
    const rawCity = match ? match[1].replace('省', '').replace('市', '') : '北京'
    displayCity.value = rawCity

    // 获取天气数据
    const weatherRes = await fetch(`https://wttr.in/${rawCity}?format=j1`)
    if (!weatherRes.ok) throw new Error('网络请求失败')
    
    const data = await weatherRes.json()
    const current = data.current_condition[0]
    
    // 赋值数据
    temp.value = current.temp_C
    weatherText.value = translateWeather(current.weatherDesc[0].value)
    
    // 关闭加载状态
    loading.value = false
  } catch (error) {
    console.error('天气组件出错:', error)
    displayCity.value = '天气更新失败'
    loading.value = false
  }
})
</script>

<style scoped>
.weather-wrapper {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
}

.weather-content {
  background: rgba(255, 255, 255, 0.45);
  padding: 8px 25px;
  border-radius: 30px;
  backdrop-filter: blur(12px);
  display: flex;
  gap: 15px;
  align-items: center;
  color: #444;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.temp {
  font-weight: bold;
  color: #d182cc; /* 匹配粉色主题 */
}

.weather-loading {
  font-size: 12px;
  color: #999;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
}
</style>