<template>
  <div class="search-container">
    <div class="search-box">
      <input 
        v-model="searchText"
        type="text" 
        class="search-input" 
        placeholder="输入搜索内容..."
        @keyup.enter="handleSearch"
      />
      <button class="search-button" @click="handleSearch">搜索</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义响应式变量存储搜索文字
const searchText = ref('');

// 搜索逻辑
const handleSearch = () => {
  // 如果输入内容为空，不执行搜索
  if (!searchText.value.trim()) return;

  // 使用百度搜索接口，直接跳转 URL
  const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(searchText.value)}`;
  
  // 在当前窗口跳转（如果想在新窗口打开，改用 window.open）
  window.location.href = searchUrl;
};
</script>

<style scoped>
.search-container {
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* SearchBar.vue 的样式部分修改 */

.search-box {
  display: flex;
  width: 500px;
  max-width: 90%;
  background: white; /* 容器背景保持白色 */
  padding: 0;        /* 修改点 1：把之前的 padding: 5px 改为 0，让内部元素紧贴边缘 */
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;  /* 确保内部元素超出圆角的部分被剪裁 */
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 20px; /* 适当增加高度 */
  font-size: 16px;
  background: transparent; /* 修改点 2：背景透明，统一使用容器的白色 */
}

.search-button {
  background-color: #fd9cff;
  color: rgb(0, 0, 0);
  border: none;
  padding: 0 30px;    
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.search-button:hover {
  background-color: #a5fd7c;
}
</style>