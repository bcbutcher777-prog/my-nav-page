<template>
  <a :href="url" target="_blank" class="link-card" :title="name">
    <img :src="icon" :alt="name" class="link-icon" />
    <span class="link-name">{{ name }}</span>
  </a>
</template>

<script setup>
// 接收父组件传递的数据
defineProps({
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true }
})
</script>

<style scoped>
.link-card {
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  width: 100%; /* 宽度自适应 App.vue 中定义的 grid 列宽 */
  height: 100px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.link-card:hover {
  transform: translateY(-5px); /* 悬浮上浮效果 */
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.link-icon {
  width: 48px;  
  height: 48px;
  object-fit: contain;
  margin-bottom: 8px; 
}

.link-name {
  font-size: 12px;
  color: #666; 
  letter-spacing: 0.5px;
}
</style>