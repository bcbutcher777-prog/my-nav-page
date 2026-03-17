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

// 天气现象翻译/匹配（针对高德返回的数据通常已经是中文，这里做容错）
const translateWeather = (desc) => desc || '未知'

onMounted(async () => {
  try {
    // 方案：使用高德 IP 定位接口（你可以先用我的测试 Key 验证效果，建议后续换成自己的）
    // 注意：在正式环境，请确保你的 API Key 开启了静态地图或 Web 服务权限
    const AMAP_KEY = '10f238fc63de3fea3468cc54592914d9' 
    
    // 1. 获取地理位置 (基于 IP)
    const ipRes = await fetch(`https://restapi.amap.com/v3/ip?key=${AMAP_KEY}`)
    const ipData = await ipRes.json()
    
    if (ipData.status !== '1') throw new Error('定位失败')
    
    const adcode = ipData.adcode // 获取城市行政区划代码
    displayCity.value = ipData.city || '未知城市'

    // 2. 根据 adcode 获取天气
    const weatherRes = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${adcode}`)
    const weatherData = await weatherRes.json()
    
    if (weatherData.status === '1' && weatherData.lives.length > 0) {
      const live = weatherData.lives[0]
      temp.value = live.temperature
      weatherText.value = live.weather
    }
    
    loading.value = false
  } catch (error) {
    console.error('天气获取失败:', error)
    // 降级方案：如果高德失败，尝试回退到 wttr.in
    fallbackWeather()
  }
})

// 备选降级逻辑
async function fallbackWeather() {
  try {
    const res = await fetch('https://wttr.in/?format=j1')
    const data = await res.json()
    displayCity.value = data.nearest_area[0].areaName[0].value
    temp.value = data.current_condition[0].temp_C
    weatherText.value = "外网连接中"
    loading.value = false
  } catch (e) {
    displayCity.value = '更新失败'
    loading.value = false
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