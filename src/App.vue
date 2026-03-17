<template>
  <div id="app">
    <div class="particles">
      <div class="particle p1"></div>
      <div class="particle p2"></div>
      <div class="particle p3"></div>
      <div class="particle p4"></div>
      <div class="particle p5"></div>
      <div class="particle p6"></div>
      <div class="particle p7"></div>
    </div>

    <ClockDisplay />
    <Weather />
    <SearchBar />

    <div class="link-container">
      <LinkCard 
        v-for="site in mySites" 
        :key="site.name" 
        :name="site.name" 
        :url="site.url" 
        :icon="site.icon" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ClockDisplay from './components/ClockDisplay.vue'
import Weather from './components/Weather.vue'
import LinkCard from './components/LinkCard.vue'
import SearchBar from './components/SearchBar.vue' 

// 静态资源导入
import baiduIcon from './assets/baidu.svg'
import chromeIcon from './assets/chrome.svg'
import bilibiliIcon from './assets/bilibili.svg'
import githubIcon from './assets/github.svg'

// 导航数据配置
const mySites = ref([
  { name: '百度', url: 'https://www.baidu.com', icon: baiduIcon },
  { name: 'Chrome', url: 'https://www.google.com', icon: chromeIcon },
  { name: 'Bilibili', url: 'https://www.bilibili.com', icon: bilibiliIcon },
  { name: 'GitHub', url: 'https://github.com', icon: githubIcon }
])
</script>

<style>
/* 全局重置与基础样式 */
* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #fce4ec 100%);
  background-attachment: fixed;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  overflow-x: hidden; /* 防止移动端横向滚动 */
}

/* 导航卡片布局：响应式 Grid 网格 */
.link-container {
  display: grid;
  /* 默认手机端：强制 2 列，每列 100px */
  grid-template-columns: repeat(2, 100px); 
  gap: 25px;
  justify-content: center;
  margin-top: 40px;
  padding: 0 20px;
  width: 100%;
  z-index: 10;
}

/* 媒体查询：当屏幕宽度大于 768px (平板/电脑) 时，切换为 4 列 */
@media (min-width: 768px) {
  .link-container {
    grid-template-columns: repeat(4, 100px); 
  }
}

/* 背景粒子特效 */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none; /* 穿透点击，避免遮挡组件 */
}

@keyframes super-breathe {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.2; }
  33% { transform: translate(100px, -150px) scale(1.3) rotate(120deg); opacity: 0.6; }
  66% { transform: translate(-50px, -250px) scale(0.8) rotate(240deg); opacity: 0.4; }
}

.particle {
  position: absolute;
  background: rgba(255, 182, 193, 0.4);
  border-radius: 50%;
  filter: blur(15px);
  animation: super-breathe 25s infinite linear;
  will-change: transform, opacity; /* 性能优化：提前告知浏览器此元素会发生动画 */
}

/* 粒子初始位置与大小分布 */
.p1 { width: 300px; height: 300px; top: 10%; left: 5%; }
.p2 { width: 400px; height: 400px; top: 50%; left: 60%; animation-delay: -5s; }
.p3 { width: 250px; height: 250px; top: 70%; left: 10%; animation-delay: -10s; }
</style>