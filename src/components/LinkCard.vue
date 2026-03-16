<template>
  <a :href="url" target="_blank" class="link-card" :title="name">
    <img :src="icon" :alt="name" class="link-icon" />
    
    <span class="link-name">{{ name }}</span>
  </a>
</template>

<script setup>
// 定义接收的属性：name用于提示，url用于跳转，icon用于显示图标
defineProps({
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true } // 新增图标属性
})
</script>

<style scoped>
.link-card {
  display: flex;
  flex-direction: column; /* 垂直排列图标和文字 */
  align-items: center;
  justify-content: center;
  width: 100px;  /* 适当调大卡片 */
  height: 100px;
  background-color: rgba(255, 255, 255, 0.9); /* 保持半透明 */
  border-radius: 20px; /* 更圆润 */
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

/* 悬停效果：保持你的“悬浮感” */
.link-card:hover {
  transform: translateY(-5px);
  background-color: #ffffff; /* 悬停时变全白 */
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

/* --- 图标的核心样式 --- */
.link-icon {
  width: 48px;  /* 设置合适的图标大小 */
  height: 48px;
  object-fit: contain; /* 确保图片不失真 */
  margin-bottom: 8px; /* 图标与文字的间距 */
}

.link-name {
  font-size: 12px;
  color: #666; /* 灰色小字 */
  letter-spacing: 0.5px;
}
</style>