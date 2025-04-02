<template>
  <el-dialog v-model="materialVisible" title="物品大全" width="800" :before-close="closeMaterial">
    <div style="margin-bottom: 10px;">
      <el-input v-model="materialSearch" style="width:300px" placeholder="请输入">
        <template #prepend>
          <el-button :icon="Search" />
        </template>
        <template #append>
          <el-button @click="triggerSearch">搜索</el-button>
        </template>
      </el-input>
    </div>
    <div class="material-box" ref="materialBox" @scroll="handleScroll">
      <div class="material-item">
        <div 
          v-for="(item, index) in displayedIcons" 
          :key="index" 
          @click="selectMaterialItem(item)" 
          class="icon-container"
        >
          <img v-if="item.src" :src="item.src" alt="icon" class="icon" />
          <div class="icon-name">{{ item.name }}</div>
        </div>
      </div>
      <div v-if="loading" class="loading-text">加载中...</div>
    </div>
  </el-dialog>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { defineEmits, ref, onMounted, computed, nextTick } from 'vue';

const icons = ref([]); // 存储已加载的图标
const allIcons = ref([]); // 存储所有图标路径
const materialSearch = ref('');
const materialVisible = ref(false);
const displayedIcons = ref([]); // 实际展示的图标
const loading = ref(false);
const batchSize = 100; // 每次加载数量
let loadedIcons = 0;
const materialBox = ref(null);

const emit = defineEmits();

// **1. 预先存储所有图标路径（不加载图片）**
const iconFiles = import.meta.glob('./../assets/icon/*.{svg,png}');

onMounted(() => {
  allIcons.value = Object.keys(iconFiles).map(filePath => ({
    path: filePath, // 存储路径，减少内存占用
    name: filePath.split('/').pop(), // 提取文件名
    src: null // 初始不加载，懒加载
  }));
  loadMoreIcons(); // 初始加载
});

// **2. 懒加载下一批图标**
const loadMoreIcons = async () => {
  if (loading.value) return;
  loading.value = true;

  const nextBatch = allIcons.value.slice(loadedIcons, loadedIcons + batchSize);

  for (let item of nextBatch) {
    item.src = (await iconFiles[item.path]()).default; // **动态加载图片**
  }

  icons.value.push(...nextBatch);
  displayedIcons.value = [...icons.value]; // 更新展示数据
  loadedIcons += batchSize;

  loading.value = false;
};

// **3. 监听滚动，触发懒加载**
const handleScroll = async () => {
  if (!materialBox.value) return;
  const { scrollTop, scrollHeight, clientHeight } = materialBox.value;
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    await loadMoreIcons(); // 继续加载
  }
};

// **4. 搜索优化**
const triggerSearch = async () => {
  const searchKey = materialSearch.value.toLowerCase();
  const matchedIcons = allIcons.value.filter(icon =>
    icon.name.toLowerCase().includes(searchKey)
  );

  // **1. 清空当前图标**
  icons.value = [];
  displayedIcons.value = []; // **确保 UI 立即更新**
  loadedIcons = 0; // **重置加载索引**
  
  await nextTick(); // **确保 Vue 重新渲染**
  
  // **2. 只加载前 batchSize 个匹配项**
  for (let i = 0; i < Math.min(batchSize, matchedIcons.length); i++) {
    matchedIcons[i].src = (await iconFiles[matchedIcons[i].path]()).default;
    icons.value.push(matchedIcons[i]);
  }

  // **3. 更新 UI**
  displayedIcons.value = [...icons.value];
};


// **5. 选择图标**
const selectMaterialItem = (item) => {
  emit('selectMaterialItem', item);
};

// **6. 打开/关闭对话框**
const openSelectMaterial = () => { materialVisible.value = true; };
const closeMaterial = () => { materialVisible.value = false; };

defineExpose({ openSelectMaterial, closeMaterial });
</script>

<style scoped>
.material-box {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}
.material-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.icon-container {
  cursor: pointer;
  text-align: center;
  width: 80px;
}
.icon {
  width: 50px;
  height: 50px;
}
.icon-name {
  font-size: 8px;
}
.loading-text {
  text-align: center;
  padding: 10px;
}
</style>
