<template>
    <div class="expression-render">
        <div v-if="view_requirement.type === 'has permission' || view_requirement.type === '!has permission'">权限：{{ view_requirement.permission
        }}</div>
        <div v-if="view_requirement.type === 'has item' || view_requirement.type === '!has item'" style="display: flex;">
            <div> 物品：</div>
            <div style="display: flex;position: relative;">
                <img class="expression-render-icon" :src="view_requirement.icon" alt="">
                <div style="position: absolute;bottom: -10px;right: 0px;text-shadow: 1px 1px #000;color: #ff9b00;">{{ view_requirement.amount }}</div>
            </div>
        </div>
        <div v-if="view_requirement.type === 'has money' || view_requirement.type === '!has money'" style="display: flex; align-items: center;">
            <div> 货币: {{ view_requirement.amount }}</div>
        </div>
        
        <div v-if="view_requirement.type === 'string equals' || view_requirement.type === '!string equals'" style="display: flex; align-items: center;">
            <div> 比较: {{ view_requirement.input }}  是否等于  {{ view_requirement.output }}</div>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
    view_requirement: Object
})
</script>

<style scoped>
    .expression-render{


        .expression-render-icon{
            width: 32px;
            height: 32px;
        }
    }
</style>