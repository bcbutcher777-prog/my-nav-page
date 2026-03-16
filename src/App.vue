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

// 正确的 Vite 静态资源导入方式
import baiduIcon from './assets/baidu.svg'
import chromeIcon from './assets/chrome.svg'
import bilibiliIcon from './assets/bilibili.svg'
import githubIcon from './assets/github.svg'

const mySites = ref([
  { name: '百度', url: 'https://www.baidu.com', icon: baiduIcon },
  { name: 'Chrome', url: 'https://www.google.com', icon: chromeIcon },
  { name: 'Bilibili', url: 'https://www.bilibili.com', icon: bilibiliIcon },
  { name: 'GitHub', url: 'https://github.com', icon: githubIcon }
])
</script>

<style>
/* 保持你原有的样式代码... */
body, html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #fce4ec 100%);
  background-attachment: fixed;
  position: relative;
}

.link-container {
  display: flex;
  flex-direction: row;
  gap: 25px;
  justify-content: center;
  margin-top: 50px;
}

/* 粒子动画样式 */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
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
}

.p1 { width: 120px; height: 120px; top: 10%; left: 5%; animation-duration: 18s; }
.p2 { width: 250px; height: 250px; bottom: 5%; right: 10%; animation-duration: 30s; }
.p3 { width: 90px; height: 90px; top: 40%; right: 5%; animation-duration: 22s; }
.p4 { width: 180px; height: 180px; bottom: 20%; left: 10%; animation-duration: 28s; }
.p5 { width: 100px; height: 100px; top: 70%; left: 40%; background: rgba(221, 160, 221, 0.3); }
.p6 { width: 140px; height: 140px; top: 20%; left: 60%; }
.p7 { width: 70px; height: 70px; bottom: 40%; left: 50%; background: rgba(135, 206, 250, 0.2); }

.search-container { margin: 10px 0 !important; }
</style>