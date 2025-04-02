<template>
    <div>
        <el-dialog v-model="expressionVisible" title="表达式" width="500" :before-close="closeExpressionEdit">
            <div class="expression-box">
                <el-select v-model="expressionTemporarily.type" placeholder="类型" style="width: 240px">
                    <el-option v-for="item, index in expressionTypeList" :label="item.label" :value="item.value" />
                </el-select>
                <el-input
                    v-if="expressionTemporarily.type === 'has permission' || expressionTemporarily.type === '!has permission'"
                    v-model="expressionTemporarily.permission" placeholder="权限节点" style="width: 240px" />

                <el-input v-if="expressionTemporarily.type === 'has money'" v-model="expressionTemporarily.amount"
                    placeholder="达到预设货币显示菜单" style="width: 240px" />

                <div v-if="expressionTemporarily.type === 'has item' || expressionTemporarily.type === '!has item'"
                    style="display: flex;flex-direction: column;gap:10px">
                    <el-button v-if="!expressionTemporarily?.material" style="width: 80px"
                        @click="openExpressionSelectMaterial">选择物品</el-button>
                    <img v-else style="width: 32px;cursor: pointer;" :src="expressionTemporarily.icon" alt=""
                        @click="openExpressionSelectMaterial" />
                    <el-input placeholder="物品数量达到" v-model="expressionTemporarily.amount" style="width: 120px" />
                </div>

                <div v-if="expressionTemporarily.type === 'string equals' || expressionTemporarily.type === '!string equals'"
                    style="display: flex;flex-direction: column;gap:10px">
                    <el-input v-model="expressionTemporarily.input" placeholder="输入占位符 玩家ID 服务器名等" style="width: 240px" />
                    <el-input v-model="expressionTemporarily.output" placeholder="比较字符串"  style="width: 240px" />
                </div>

                <div>
                    <div></div>
                    <el-button @click="notReachCommandOpen">{{ expressionTemporarily?.deny_commands?.length > 0 ? '如果未达到此权限执行-修改' : '如果未达到此权限执行-添加'}}</el-button>
                    <commandRender  :style="{width:'auto'}" :commandList="expressionTemporarily.deny_commands" />
                </div>

            </div>


            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="expressionVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmExpression">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <materialSelect ref="expressionMaterialSelectRef" @selectMaterialItem="confirmMaterialViewRequirement" />

    </div>

    
  <!-- 左键指令执行 -->
  <command ref="notReachCommandRef" @confirmCommand="notReachCommandConfirm" :commandList="expressionTemporarily.deny_commands" />
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import command from './command.vue';
import commandRender from './commandRender.vue';

const notReachCommandRef = ref(null)
const expressionMaterialSelectRef = ref(null)
const emit = defineEmits(['confirmExpression']);
// -表达式选择

const defaultExpressionTemporarily = {
    requirement_name: 'expression_name',
    type: 'has permission',
    permission: '',
    amount: null,
    material: null,
    icon: null,
    input:null,
    output:null,
    deny_commands:[]
}

const expressionTemporarily = ref({
   ...defaultExpressionTemporarily
})

const expressionVisible = ref(false)

const openExpressionEdit = (expression) => {
    if(expression) expressionTemporarily.value = {...expression}
    else expressionTemporarily.value = {...defaultExpressionTemporarily}
    expressionVisible.value = true
}

const closeExpressionEdit = () => {
    expressionVisible.value = false
}

const notReachCommandOpen = () => {
    notReachCommandRef.value.openCommandEdit()
}

const notReachCommandConfirm = (commandList) => {
    expressionTemporarily.value.deny_commands = [...commandList]
    notReachCommandRef.value.closeCommandEdit()
    console.log('未达到条件执行指令', commandList)
}

const expressionTypeList = ref([
    {
        label: '拥有该权限节点',
        value: 'has permission'
    },
    {
        label: '未拥有该权限',
        value: '!has permission'
    },
    {
        label: '拥有货币达到',
        value: 'has money'
    },
    {
        label: '拥有该物品',
        value: 'has item'
    },
    {
        label: '未拥有该物品',
        value: '!has item'
    },
    {
        label: '字符串等于',
        value: 'string equals'
    },
    {
        label: '字符串不等于',
        value: '!string equals'
    }
])

const confirmExpression = () => {
    emit('confirmExpression', expressionTemporarily.value)
}


// 物品选择打开
const openExpressionSelectMaterial = () => {
    expressionMaterialSelectRef.value.openSelectMaterial()
}

// 物品选择确认
const confirmMaterialViewRequirement = (item) => {
    console.log('item', item)
    expressionTemporarily.value.material = item.name
    expressionTemporarily.value.icon = item.src

    expressionMaterialSelectRef.value.closeMaterial()
    console.log('确认选择', expressionTemporarily.value)
}


defineExpose({
    openExpressionEdit,
    closeExpressionEdit
})

</script>

<style scoped>
.expression-box {
    display: grid;
    gap: 20px;

}
</style>