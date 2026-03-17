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

const displayCity = ref('定位中...')
const temp = ref('--')
const weatherText = ref('--')
const loading = ref(true)

onMounted(async () => {
  try {
    // 高德 API Key
    const AMAP_KEY = '10f238fc63de3fea3468cc54592914d9' 
    
    // 1. IP 自动定位获取城市编码 (adcode)
    const ipRes = await fetch(`https://restapi.amap.com/v3/ip?key=${AMAP_KEY}`)
    const ipData = await ipRes.json()
    
    if (ipData.status !== '1') throw new Error('定位失败')
    
    const adcode = ipData.adcode 
    displayCity.value = ipData.city || '未知城市'

    // 2. 根据城市编码获取实时天气
    const weatherRes = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${adcode}`)
    const weatherData = await weatherRes.json()
    
    if (weatherData.status === '1' && weatherData.lives.length > 0) {
      const live = weatherData.lives[0]
      temp.value = live.temperature
      weatherText.value = live.weather
    }
  } catch (error) {
    console.error('天气获取失败:', error)
    fallbackWeather() // 主接口失败时触发降级方案
  } finally {
    loading.value = false // 无论成功失败，最终关闭加载状态
  }
})

// 降级方案：使用 wttr.in 免费服务
async function fallbackWeather() {
  try {
    const res = await fetch('https://wttr.in/?format=j1')
    const data = await res.json()
    displayCity.value = data.nearest_area[0].areaName[0].value
    temp.value = data.current_condition[0].temp_C
    weatherText.value = "外网连接中"
  } catch (e) {
    displayCity.value = '更新失败'
  }
}
</script>

<style scoped>
.weather-wrapper {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
}

/* 磨砂玻璃质感容器 */
.weather-content {
  background: rgba(255, 255, 255, 0.45);
  padding: 8px 25px;
  border-radius: 30px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari 兼容 */
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
  color: #d182cc; 
}

.weather-loading {
  font-size: 12px;
  color: #999;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
}
</style>