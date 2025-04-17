<template>
  <div class="box">
    <div class="form">
      <div class="form-item">
        <div style="display: flex;gap: 10px;align-items: center;font-size: 14px;">
          <span>菜单标题</span>
          <el-input v-model="menuStyle.title" type="text" style="width: 140px" />

          <span>菜单大小</span>
          <el-select v-model="menuStyle.size" placeholder="Select" size="large" style="width: 140px">
            <el-option v-for="item in [9, 18, 27, 36, 45, 54]" :key="item" :label="item" :value="item" />
          </el-select>


          <span>菜单指令</span>
          <el-input v-model="menuStyle.open_command" type="text" style="width: 140px" placeholder="开启指令无需'/'" />
        </div>

        <div style="display: flex;">
          <el-button style="position: relative;" type="primary">
            <input type="file" @change="readFile"
              style="z-index: 2; cursor: pointer; position: absolute;opacity: 0;width: 100%;height: 100%;left: 0;top: 0;">
            <span style="z-index: 1;">读取文件（只能读取该编辑器生成的）</span>
          </el-button>

          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
            title="确定要重置菜单?" @confirm="resetMenu">
            <template #reference>
              <el-button style="margin-left:auto" type="danger">重置</el-button>
            </template>
          </el-popconfirm>
          <el-button @click="createMenu" type="success" :loading="isLoad">生成菜单</el-button>
        </div>
        <!-- <el-button style="margin-left: auto;" type="primary" @click="exportMenu">导出</el-button> -->
      </div>

    </div>

    <div class="drawing">
      <div class="title" v-html="utils.transformColor(menuStyle.title)">
      </div>
      <img :src="imageUrl" alt="">
      <div class="map-menu">
        <div class="map-menu-item" v-for="item, index in menuItemList" @click="openMenuItemEditDialog(item, index)">

          <div v-if="item.icon" style="width: 100%;height: 100%;position: relative;">
            <img :src="item.icon" alt="" />
            <div v-if="item.amount > 1"
              style="font-size: 17px;position: absolute;right: 0;bottom: -3px;font-family: Mojangles;">{{ item.amount }}
            </div>
          </div>
          <div v-else>{{ item.slot }}</div>
        </div>
      </div>
    </div>
  </div>


  <!-- 菜单项编辑 -->
  <el-dialog v-model="menuEditVisible" title="菜单项编辑" width="1000" top="8vh">
    <div style="display: flex;justify-content: space-between;max-height: 600px;overflow-y: auto;">
      <el-form>
        <el-form-item label="菜单项名称">
          <el-input v-model="currenItem.display_name" type="text" style="width: 140px" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="currenItem.amount" :min="1" :max="64" />
        </el-form-item>
        <el-form-item label="材料">
          <div @click="selectMaterial" v-if="materialTemporarily" style="cursor: pointer; display: flex;gap:20px">
            <div
              style="border: 1px solid #888;border-radius: 3px; height: 40px;width: 40px;display: flex;align-items: center;justify-content: center;">
              <img style="width: 32px;" :src="materialTemporarily.icon" alt="">
            </div>
            <div>{{ materialTemporarily.material }}</div>
          </div>
          <el-button v-else @click="selectMaterial">选择</el-button>
        </el-form-item>
        <el-form-item label="是否实时更新（时间,占位符）">
          <el-switch v-model="currenItem.update" />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="currenItem.lore" type="textarea" style="width: 240px" :rows="5" />
        </el-form-item>

        <el-form-item label="可见条件表达式-达到此要求才能可视此菜单项">
          <div v-if="currenItem?.view_requirement?.type" class="flex">
            <expressionRender :view_requirement="currenItem.view_requirement" />
            <el-button @click="viewRequirementExpression" style="margin-left: 20px;">修改</el-button>
          </div>
          <el-button v-else @click="viewRequirementExpression">添加</el-button>
        </el-form-item>

        <el-form-item label="左键该物品前置表达式-达到此要求才能进行左键">
          <div v-if="currenItem?.left_click_requirement?.type" class="flex">
            <expressionRender :view_requirement="currenItem.left_click_requirement" />
            <el-button @click="leftCommandRequirementExpression" style="margin-left: 20px;">修改</el-button>
          </div>
          <el-button v-else @click="leftCommandRequirementExpression">添加</el-button>
        </el-form-item>

        <el-form-item label="左键该物品执行指令">
          <div>
            <el-button @click="leftCommandClick" v-if="currenItem.left_click_commands.length <= 0">添加指令</el-button>
            <div v-else>
              <commandRender :commandList="currenItem.left_click_commands" />
              <el-button @click="leftCommandClick">修改</el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="shift+左键该物品前置表达式-达到此要求才能进行左键">

          <div v-if="currenItem?.shift_left_click_requirement?.type" class="flex">
            <expressionRender :view_requirement="currenItem.shift_left_click_requirement" />
            <el-button @click="shiftLeftCommandRequirementExpression" style="margin-left: 20px;">修改</el-button>
          </div>
          <el-button v-else @click="shiftLeftCommandRequirementExpression">添加</el-button>
        </el-form-item>

        <el-form-item label="shift+左键该物品执行指令">
          <div>
            <el-button @click="shiftLeftCommandClick"
              v-if="currenItem.shift_left_click_commands.length <= 0">添加指令</el-button>
            <div v-else>
              <commandRender :commandList="currenItem.shift_left_click_commands" />
              <el-button @click="shiftLeftCommandClick">修改</el-button>
            </div>
          </div>
        </el-form-item>


        <el-form-item label="右键该物品前置表达式-达到此要求才能进行右键">
          <div v-if="currenItem?.right_click_requirement?.type" class="flex">
            <expressionRender :view_requirement="currenItem.right_click_requirement" />
            <el-button @click="rightCommandRequirementExpression" style="margin-left: 20px;">修改</el-button>
          </div>
          <el-button v-else @click="rightCommandRequirementExpression">添加</el-button>
        </el-form-item>

        <el-form-item label="右键该物品执行指令">
          <div>
            <el-button @click="rightCommandClick" v-if="currenItem.right_click_commands.length <= 0">添加指令</el-button>
            <div v-else>
              <commandRender :commandList="currenItem.right_click_commands" />
              <el-button @click="rightCommandClick">修改</el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="shift+右键该物品前置表达式-达到此要求才能进行左键">
          <div v-if="currenItem?.shift_right_click_requirement?.type" class="flex">
            <expressionRender :view_requirement="currenItem.shift_right_click_requirement" />
            <el-button @click="shiftRightCommandRequirementExpression" style="margin-left: 20px;">修改</el-button>
          </div>
          <el-button v-else @click="shiftRightCommandRequirementExpression">添加</el-button>
        </el-form-item>

        <el-form-item label="shift+右键该物品执行指令">
          <div>
            <el-button @click="shiftRightCommandClick"
              v-if="currenItem.shift_right_click_commands.length <= 0">添加指令</el-button>
            <div v-else>
              <commandRender :commandList="currenItem.shift_right_click_commands" />
              <el-button @click="shiftRightCommandClick">修改</el-button>
            </div>
          </div>
        </el-form-item>

      </el-form>
      <div v-if="currenItem.display_name || currenItem.lore" class="item-right-drawing"
        :style='`border-image:url(${loreUrl}) 15 30 15 30 stretch;`'>
        <div v-for="value, key in currenItem" :key="key" v-show="key !== 'slot' && key !== 'id'">
          <div v-show="key === 'display_name'" v-html="utils.transformColor(value)" />
          <div v-show="key === 'lore'" style="white-space: pre-wrap;" v-html="utils.transformColor(value)" />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="clearCurrenItem" type="danger">清空</el-button>
        <el-button type="primary" @click="confirmItemEdit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 菜单项图片配置 -->
  <materialSelect ref="menuItemMaterialSelectRef" @selectMaterialItem="confirmMaterialMenuItem" />

  <!-- 菜单项可见条件表达式 -->
  <expression ref="viewRequirementExpressionRef" @confirmExpression="confrimViewRequirementExpression" />

  <!-- 左键前置条件表达式 -->
  <expression ref="leftExpressionExpressionRef" @confirmExpression="confrimLeftCommandRequirementExpression" />

  <!-- 左键指令执行 -->
  <command ref="leftCommandRef" @confirmCommand="leftCommandConfirm" :commandList="currenItem.left_click_commands" />

  <!-- shift左键前置条件表达式 -->
  <expression ref="shiftLeftExpressionExpressionRef"
    @confirmExpression="confrimShiftLeftCommandRequirementExpression" />

  <!-- shift左键指令执行 -->
  <command ref="shiftLeftCommandRef" @confirmCommand="shiftLeftCommandConfirm"
    :commandList="currenItem.shift_left_click_commands" />

  <!-- 右键前置条件表达式 -->
  <expression ref="rightExpressionExpressionRef" @confirmExpression="confrimRightCommandRequirementExpression" />

  <!-- 右键指令执行 -->
  <command ref="rightCommandRef" @confirmCommand="rightCommandConfirm" :commandList="currenItem.right_click_commands" />

  <!-- shift右键前置条件表达式 -->
  <expression ref="shiftRightExpressionExpressionRef"
    @confirmExpression="confrimShiftRightCommandRequirementExpression" />

  <!-- shift右键指令执行 -->
  <command ref="shiftRightCommandRef" @confirmCommand="shiftRightCommandConfirm"
    :commandList="currenItem.shift_right_click_commands" />
</template>

<script setup>


import axios from 'axios'
import yaml from 'js-yaml'
import { ref, computed, watchEffect, nextTick } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue'
import utils from './utils/util.js';
import materialSelect from './components/materialSelect.vue';
import expression from './components/expression.vue';
import command from './components/command.vue';


import expressionRender from './components/expressionRender.vue'
import commandRender from './components/commandRender.vue'


const iconMap = import.meta.glob('./assets/icon/*.png');
const path = `./assets/icon/ACACIA_BOAT.png`;
console.log('尝试加载图标路径:', path, '是否存在:', iconMap[path] !== undefined);

async function getIconPath(material) {
  const path = `./assets/icon/${material}.png`;
  const loader = iconMap[path];
  if (loader) {
    const mod = await loader(); // 模块懒加载
    return mod.default; // 返回图片路径
  } else {
    console.warn(`未找到图片: ${path}`);
    return new URL('./assets/icon/default.png', import.meta.url).href;
  }
}

const menuItemMaterialSelectRef = ref(null)
const viewRequirementExpressionRef = ref(null)

const leftExpressionExpressionRef = ref(null)
const leftCommandRef = ref(null)
const shiftLeftExpressionExpressionRef = ref(null)
const shiftLeftCommandRef = ref(null)

const rightExpressionExpressionRef = ref(null)
const rightCommandRef = ref(null)
const shiftRightExpressionExpressionRef = ref(null)
const shiftRightCommandRef = ref(null)

const predefineColors = ref([
  '#000000', //0
  '#0000AA', //1
  '#00AA00',  //2
  '#00AAAA',  //3
  '#AA0000',  //4
  '#AA00AA',  //5
  '#FFAA00',  //6
  '#AAAAAA',  //7
  '#555555',  //8
  '#5555FF',  //9
  '#55FF55',  //a
  '#55FFFF',  //b
  '#FF5555',  //c    
  '#FF55FF',  //d
  '#FFFF55',  //e
  '#FFFFFF',  //f
])

const defaultStyle = {
  title: "菜单",
  size: 9,
  open_command: null
}

const menuStyle = ref({ ...defaultStyle })

const clear = () => {
  console.log(defaultStyle)
  menuStyle.value = { ...defaultStyle }
}


const imageUrl = computed(() => new URL(`./assets/${menuStyle.value.size}.png`, import.meta.url).href);
const loreUrl = computed(() => new URL(`./assets/lore_bg.png`, import.meta.url).href);



// -菜单项编辑逻辑
const menuEditVisible = ref(false)
const menuItemList = ref([]);
const currentIndex = ref(0)
const currentId = ref('item-0')

const defaultItem = {
  display_name: "",
  material: null,
  amount: 1,
  item_flags: [],
  lore: '',
  icon: null,
  view_requirement: {},
  left_click_requirement: {},
  left_click_commands: [],
  shift_left_click_requirement: {},
  shift_left_click_commands: [],
  right_click_requirement: {},
  right_click_commands: [],
  shift_right_click_requirement: {},
  shift_right_click_commands: [],
}

watchEffect(() => {
  const oldMenuItemList = [...menuItemList.value]; // 复制旧数组
  const newMenuItemList = Array.from({ length: menuStyle.value.size }, (_, index) => ({
    slot: index,
    id: `item-${index}`,
    ...defaultItem
  }));

  // console.log('newMenuItemList', newMenuItemList)
  // 遍历旧数组，把匹配的 slot 数据插入新数组的正确位置
  oldMenuItemList.forEach(oldItem => {
    const index = newMenuItemList.findIndex(newItem => newItem.slot === oldItem.slot);

    if (index !== -1) {
      newMenuItemList[index] = { ...oldItem }; // 保留旧数据，并覆盖新数据的默认值
    }
  });

  menuItemList.value = newMenuItemList;
  console.log("我这里执行了一次")
});

const currenItem = ref({
  ...defaultItem,
});


const openMenuItemEditDialog = (item, index) => {
  // 清除临时材料
  if (item.material) {
    materialTemporarily.value = {
      material: item.material,
      icon: item.icon
    }
  } else {
    materialTemporarily.value = null
  }


  currenItem.value = { ...item }

  currentIndex.value = index
  currentId.value = item.id
  menuEditVisible.value = true
  console.log('currenItem:', currenItem.value)
}

// 清空当前编辑项
const clearCurrenItem = () => {
  console.log('defaultItem', defaultItem)
  currenItem.value = {
    id: currentId.value,
    slot: currentIndex.value,
    ...defaultItem,
  }

  materialTemporarily.value = null

  console.log('currenItem-清空', currenItem.value)
}

// 菜单项编辑确认
const confirmItemEdit = () => {
  console.log('currenItem', currenItem.value)
  menuItemList.value[currentIndex.value] = { ...currenItem.value, ...materialTemporarily.value }
  menuEditVisible.value = false
}


// -可见条件编辑逻辑
const viewRequirementExpression = () => {
  // console.log('viewRequirementExpressionRef',viewRequirementExpressionRef.value)
  viewRequirementExpressionRef.value.openExpressionEdit(currenItem.value.view_requirement)
}

const confrimViewRequirementExpression = (item) => {
  console.log(item)
  viewRequirementExpressionRef.value.closeExpressionEdit()

  currenItem.value.view_requirement = item
}

// -左键指令前置
const leftCommandRequirementExpression = (item) => {
  leftExpressionExpressionRef.value.openExpressionEdit(currenItem.value.left_click_requirement)
}

const confrimLeftCommandRequirementExpression = (item) => {
  console.log(item)
  leftExpressionExpressionRef.value.closeExpressionEdit()
  currenItem.value.left_click_requirement = item
}

// -左键执行指令
const leftCommandClick = () => {
  leftCommandRef.value.openCommandEdit()
}

const leftCommandConfirm = (commandList) => {
  console.log('commandList', commandList)
  leftCommandRef.value.closeCommandEdit()
  currenItem.value.left_click_commands = [...commandList]
}

// -shift+左键指令前置
const shiftLeftCommandRequirementExpression = (item) => {
  shiftLeftExpressionExpressionRef.value.openExpressionEdit(currenItem.value.shift_left_click_requirement)
}

const confrimShiftLeftCommandRequirementExpression = (item) => {
  console.log(item)
  shiftLeftExpressionExpressionRef.value.closeExpressionEdit()
  currenItem.value.shift_left_click_requirement = item
}


// -shfit+左键执行指令
const shiftLeftCommandClick = () => {
  shiftLeftCommandRef.value.openCommandEdit()
}

const shiftLeftCommandConfirm = (commandList) => {
  shiftLeftCommandRef.value.closeCommandEdit()
  currenItem.value.shift_left_click_commands = [...commandList]
}

// -右键指令前置
const rightCommandRequirementExpression = (item) => {
  rightExpressionExpressionRef.value.openExpressionEdit(currenItem.value.right_click_requirement)
}

const confrimRightCommandRequirementExpression = (item) => {
  console.log(item)
  rightExpressionExpressionRef.value.closeExpressionEdit()
  currenItem.value.right_click_requirement = item
}

// -右键执行指令
const rightCommandClick = () => {
  rightCommandRef.value.openCommandEdit()
}

const rightCommandConfirm = (commandList) => {
  rightCommandRef.value.closeCommandEdit()
  currenItem.value.right_click_commands = [...commandList]
}

// -shift+右键指令前置
const shiftRightCommandRequirementExpression = (item) => {
  shiftRightExpressionExpressionRef.value.openExpressionEdit(currenItem.value.shift_right_click_requirement)
}

const confrimShiftRightCommandRequirementExpression = (item) => {
  console.log(item)
  shiftRightExpressionExpressionRef.value.closeExpressionEdit()
  currenItem.value.shift_right_click_requirement = item
}

// -shift+右键执行指令
const shiftRightCommandClick = () => {
  shiftRightCommandRef.value.openCommandEdit()
}

const shiftRightCommandConfirm = (commandList) => {
  shiftRightCommandRef.value.closeCommandEdit()
  currenItem.value.shift_right_click_commands = [...commandList]
}


// -菜单项材料选择
const materialTemporarily = ref(null)
const selectMaterial = () => {
  menuItemMaterialSelectRef.value.openSelectMaterial()
}

const confirmMaterialMenuItem = (item) => {
  materialTemporarily.value = {
    material: item.name,
    icon: item.src
  }
  console.log('materialTemporarily', materialTemporarily)
  menuItemMaterialSelectRef.value.closeMaterial()

}
// -菜单生成
const isLoad = ref(false)
const createMenu = async () => {
  // POST
  if (!menuStyle.value?.open_command?.trim()) {
    ElMessage({
      message: '指令必须填写!',
      type: 'warning',
    })
    return
  }

  const menuData = {
    ...menuStyle.value,
    menuList: menuItemList.value.filter(item => item.material).map(({ icon, ...item }) => item)
  }

  isLoad.value = true
  const res = await axios({
    url: 'https://fc-mp-dfe03582-4d20-4823-a4af-531996ee3cb6.next.bspapp.com/exportMenu',
    method: 'post',
    data: {
      ...menuData
    },
    headers: {
      token: 'http-test'
    }
  }).then(res => {
    console.log(res.data);

    if (res.data.fileUrl) {
      ElMessage({
        message: '菜单生成成功',
        type: 'success',
      })
      forceDownload(res.data.fileUrl, menuStyle.value.command)
    } else {
      ElMessage({
        message: '菜单生成失败' + res.data.error.message,
        type: 'warning',
      })
    }

  }).catch((err) => {
    ElMessage({
      message: '菜单生成失败' + err,
      type: 'warning',
    })
  })
    .finally(() => {
      isLoad.value = false
    });
  console.log('请求数据', res)
}

async function forceDownload(url, filename = 'cd.yml') {
  const response = await fetch(url);
  const blob = await response.blob();

  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

// -重置
const resetMenu = () => {
  location.reload()
}

// -菜单导出
const exportMenu = () => {
  const menuData = {
    ...menuStyle.value,
    menuList: menuItemList
  }
  console.log(menuData)
}

// -yml读取
const fileInput = ref(null)
const yamlText = ref('')

const readFile = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 创建一个新的 FileReader 实例
  const reader = new FileReader()

  // 处理文件读取成功的回调
  reader.onload = async (e) => {
    const text = e.target.result
    try {
      // 尝试解析 YAML 内容
      const data = await yaml.load(text)
      yamlText.value = JSON.stringify(data, null, 2)
      console.log('读取数据', data)

      const { items, ...menuStyleTitle } = data
      menuStyle.value = {
        ...menuStyleTitle,
        title: data.menu_title
      }

      // 分割中括号字符串为数组 "[console] fuck world" => ["[console]","fuck world"]
      function splitByFirstBracket(str) {
        const match = str.match(/^(\[[^\]]+\])\s*(.*)$/);
        return match ? [match[1], match[2].trim()] : [];
      }

      nextTick(() => {
        Object.keys(items).forEach(async (item, index) => {
          const obj = items[item]
          for (const [ind, ite] of menuItemList.value.entries()) {
            if (obj.slot === ite.slot) {
              console.log("匹配到了", obj.lore)

              const iconPath = await getIconPath(obj.material)

              menuItemList.value[obj.slot] = {
                ...defaultItem,
                ...obj,
                lore: Array.isArray(obj.lore) ? obj.lore.join('\n') : "",
                view_requirement: obj?.view_requirement?.requirements?.view_requirements_0,
                left_click_requirement: obj?.left_click_requirement?.requirements?.left_click_requirements_0 ? {
                  ...obj.left_click_requirement.requirements.left_click_requirements_0,
                  deny_commands: obj?.left_click_requirement?.requirements?.left_click_requirements_0?.deny_commands ? obj.left_click_requirement.requirements.left_click_requirements_0.deny_commands.map(dc => ({
                    type: splitByFirstBracket(dc)[0],
                    content: splitByFirstBracket(dc)[1]
                  })) : []
                } : undefined,
                left_click_commands: obj.left_click_commands ? obj.left_click_commands.map(lcc => ({
                  type: splitByFirstBracket(lcc)[0],
                  content: splitByFirstBracket(lcc)[1]
                })) : [],
                shift_left_click_requirement: obj?.shift_left_click_requirement?.requirements?.shift_left_click_requirements_0 ? {
                  ...obj.shift_left_click_requirement.requirements.shift_left_click_requirements_0,
                  deny_commands: obj?.shift_left_click_requirement?.requirements.shift_left_click_requirements_0?.deny_commands ? obj.shift_left_click_requirement.requirements.shift_left_click_requirements_0.deny_commands.map(dc => ({
                    type: splitByFirstBracket(dc)[0],
                    content: splitByFirstBracket(dc)[1]
                  })) : []
                } : undefined,
                shift_left_click_commands: obj.shift_left_click_commands ? obj.shift_left_click_commands.map(lcc => ({
                  type: splitByFirstBracket(lcc)[0],
                  content: splitByFirstBracket(lcc)[1]
                })) : [],
                right_click_requirement: obj?.right_click_requirement?.requirements?.right_click_requirements_0 ? {
                  ...obj.right_click_requirement.requirements.right_click_requirements_0,
                  deny_commands: obj?.right_click_requirement?.requirements?.right_click_requirements_0?.deny_commands ? obj.right_click_requirement.requirements.right_click_requirements_0.deny_commands.map(dc => ({
                    type: splitByFirstBracket(dc)[0],
                    content: splitByFirstBracket(dc)[1]
                  })) : []
                } : undefined,
                right_click_commands: obj.right_click_commands ? obj.right_click_commands.map(lcc => ({
                  type: splitByFirstBracket(lcc)[0],
                  content: splitByFirstBracket(lcc)[1]
                })) : [],
                shift_right_click_requirement: obj?.shift_right_click_requirement?.requirements?.shift_right_click_requirements_0 ? {
                  ...obj.shift_right_click_requirement.requirements.shift_right_click_requirements_0,
                  deny_commands: obj?.shift_right_click_requirement?.requirements?.shift_right_click_requirements_0?.deny_commands ? obj.shift_right_click_requirement.requirements.shift_right_click_requirements_0.deny_commands.map(dc => ({
                    type: splitByFirstBracket(dc)[0],
                    content: splitByFirstBracket(dc)[1]
                  })) : []
                } : undefined,

                icon: iconPath,
                id: item
              }
            }
          }

        })
      })
      console.log('读取完数据', menuItemList.value)

    } catch (err) {
      console.log(err)
      // 解析失败时的错误处理
      yamlText.value = `❌ YAML 解析失败：${err.message}`
      ElMessage({
        message: ' YAML 解析失败' + err.message,
        type: 'warning',
      })
    }
  }

  // 处理文件读取失败的回调
  reader.onerror = (err) => {
    console.error('文件读取失败:', err)
    yamlText.value = '❌ 文件读取失败，请检查文件格式或内容'
  }

  // 读取文件
  reader.readAsText(file)

  // 清空 input，支持重复上传相同文件
  fileInput.value = ''
}



</script>

<style scoped>
@font-face {
  font-family: 'CustomFont';
  src: url('./assets/mc_font.otf');
}

* {
  font-family: CustomFont !important;
}

.box {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.drawing {
  position: relative;
}

.title {
  position: absolute;
  top: 9px;
  left: 15px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
}

.map-menu {
  display: grid;
  grid-template-columns: repeat(9, 32px);
  padding-top: 37px;
  gap: 4px;
  position: absolute;
  top: 0;
  left: 15px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
}

.map-menu-item {
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.map-menu-item:hover {
  cursor: pointer;
}

.map-menu-item img {
  width: 100%;
  height: 100%;
  width: 32px;
  height: 32px;
  transform: translateX(1px);
}

.item-right-drawing {
  position: sticky;
  top: 0;
  right: inherit;
  width: max-content;
  /* 宽度随内容撑开 */
  height: auto;
  /* 高度随内容增加 */
  padding: 10px;
  /* 可选，增加内边距 */
  background: lightgray;
  /* 可选，方便调试 */
  border: 10px solid transparent;
  padding: 3px;
  background-color: #120312;
}


.requirement-box {
  display: grid;
  gap: 20px;

}

.flex {
  display: flex;
}

.form-item {
  display: flex;
  flex-direction: column;
}
</style>