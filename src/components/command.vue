<template>
    <div>
        <el-dialog v-model="commandVisible" title="指令添加" width="800" :before-close="closeCommandEdit">
            <div style="display: flex;">
                <div style="flex: 1;">
                    <el-select v-model="actionType" placeholder="类型" style="width: 150px">
                        <el-option v-for="item, index in actionsList" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-button @click="addCommand" style="margin-left: 20px;">添加</el-button>
                    <el-input v-if="command.type !== '[refresh]' && command.type != '[close]'" v-model="command.content"
                        placeholder="" style="width: 200px; margin-top: 20px" />

                </div>
                <el-table :data="commandList" :border="true" style="margin-left: auto;flex:1.5">
                    <el-table-column prop="type" label="执行类型" />
                    <el-table-column prop="content" label="执行指令" />

                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button size="small" type="danger" @click="commandDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="clearCommandList" type="danger">清空</el-button>
                    <el-button type="primary" @click="confirmCommand">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, computed, watch, watchEffect } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElInput, ElSelect, ElOption, ElDialog } from 'element-plus';
const emit = defineEmits();

const commandVisible = ref(false)
const props = defineProps({
    commandList: Array
});
const commandList = ref([...props.commandList])

const actionType = ref('')
const command = ref({
    type: '',
    content: ''
})

watchEffect(() => {
    command.value.type = actionType.value
})

const actionsList = ref([
    {
        label: '控制台执行',
        value: '[console]',
    },
    {
        label: '以玩家身份执行',
        value: '[player]',
    },
    {
        label: '向玩家发送消息',
        value: '[message]',
    },
    {
        label: '刷新菜单GUI',
        value: '[refresh]',
    },
    {
        label: '收取货币',
        value: '[takemoney]',
    },
    {
        label: '给予货币',
        value: '[givemoney]',
    },
    {
        label: '收取等级',
        value: '[takeexp]',
    },
    {
        label: '给与等级',
        value: '[giveexp]',
    },
    {
        label: '关闭菜单',
        value: '[close]',
    }
])

const addCommand = () => {

    commandList.value.push({...command.value})
    command.value = {
        type: '',
        content: ''
    }
}

// 清空指令列表
const clearCommandList = () => {
    commandList.value = []
}

// 删除指令
const commandDelete = (index, row) => {
    commandList.value.splice(index, 1)
}

// 确认指令列表
const confirmCommand = () => {
    emit('confirmCommand', commandList.value)
}

const openCommandEdit = () => {
    commandVisible.value = true
}

const closeCommandEdit = () => {
    commandVisible.value = false
}

defineExpose({
    openCommandEdit,
    closeCommandEdit
})

</script>

<style scoped>
.expression-box {
    display: grid;
    gap: 20px;

}
</style>