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

const searchText = ref('');

const handleSearch = () => {
  // 防抖/判空：避免空搜索
  if (!searchText.value.trim()) return;

  const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(searchText.value)}`;
  window.location.href = searchUrl;
};
</script>

<style scoped>
.search-container {
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.search-box {
  display: flex;
  width: 500px;
  max-width: 90%;
  background: white;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden; /* 保证内部元素不溢出圆角 */
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 20px;
  font-size: 16px;
  background: transparent;
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