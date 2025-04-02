<template>
    <div class="command-render">
        <el-table :data="commandList" :border="true" :style="{ marginLeft: 'auto', width:'500px', ...props.style }">
        <el-table-column prop="type" label="执行类型" />
        <el-table-column prop="content" label="执行指令" />
        
    </el-table>
    </div>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue'
const emit = defineEmits();


const props = defineProps({
    commandList: Object,
    style: {
        type: Object,
        default: ()=>({})
    },
})
</script>

<style scoped lang="less">
</style>