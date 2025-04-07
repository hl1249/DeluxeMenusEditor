'use strict';
const fs = require('fs')
exports.main = async (event, context) => {


	const post_data = JSON.parse(event.body)
	console.log('event', event.body)
	console.log('post_data', post_data)
	//event为客户端上传的参数
	let obj = {
		open_command: null,
		size: 9,
		title: "&b&l菜单"
	};

	// 映射规则
	const mappedObj = {
		menu_title: obj.title ? obj.title : '&8&l主菜单',
		open_command: obj.open_command || 'cd',
		size: obj.size || 54
	};

	function isEmptyObject(obj) {
		return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	function isEmptyArray(arr) {
		return Array.isArray(arr) && arr.length === 0;
	}

	// let list = [{
	// 	id: "item-0",
	// 	slot: 0,
	// 	display_name: "菜单1",
	// 	material: 'GRAY_STAINED_GLASS_PANE',
	// 	amount: 1,
	// 	item_flags: [],
	// 	lore: '啊实打实\n啊实打实',
	// 	icon: null,
	// 	view_requirement: {
	// 		type: 'has permission',
	// 		permission: 'defalut.vip',

	// 	},
	// 	left_click_requirement: {
	// 		type: 'has permission',
	// 		permission: 'essentials.fly',
	// 		deny_commands: [{
	// 			content: "暂无左键该权限",
	// 			type: "[message]"
	// 		}]
	// 	},
	// 	left_click_commands: [{
	// 		content: "home",
	// 		type: "[player]"
	// 	}],
	// 	shift_left_click_requirement: {
	// 		type: 'has permission',
	// 		permission: 'essentials.fly',
	// 		deny_commands: [{
	// 			content: "暂无shift+左键该权限",
	// 			type: "[message]"
	// 		}]
	// 	},
	// 	shift_left_click_commands: [{
	// 		content: "back",
	// 		type: "[player]"
	// 	}],
	// 	right_click_requirement: {
	// 		type: 'has permission',
	// 		permission: 'essentials.fly',
	// 		deny_commands: [{
	// 			content: "暂无右键该权限",
	// 			type: "[message]"
	// 		}]
	// 	},
	// 	right_click_commands: [{
	// 		content: "me 草拟吗",
	// 		type: "[player]"
	// 	}],
	// 	shift_right_click_requirement: {
	// 		type: 'has permission',
	// 		permission: 'essentials.fly',
	// 		deny_commands: [{
	// 			content: "暂无shift+右键该权限",
	// 			type: "[message]"
	// 		}]
	// 	},
	// 	shift_right_click_commands: [{
	// 		content: "me 我触发shift+右键",
	// 		type: "[player]"
	// 	}],
	// }]


	let menuListString = post_data.menuList.map((item) => {
		return `
  '${item.id}':
    material: ${item.material.split('.')[0]}
    slot: ${item.slot}
    display_name: ${item.display_name}
${item.lore ? `    lore:\n${item.lore.split('\n').map(lores => `      - '${lores}'`).join('\n')}` : ''}
${!isEmptyObject(item.view_requirement) ? 
`    view_requirement:
      requirements:
        view_requirements_${item.slot}:
          type: '${item.view_requirement.type}'
          permission: ${item.view_requirement.permission}` : ''}

${!isEmptyObject(item.left_click_requirement) ? 
`    left_click_requirement:
      requirements:
        left_click_requirements_${item.slot}:
          type: '${item.left_click_requirement.type}'
          permission: ${item.left_click_requirement.permission}
${!isEmptyArray(item.left_click_requirement.deny_commands) ? 
`          deny_commands:
${item.left_click_requirement.deny_commands.map(cmd => `          - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}` : ''}

${!isEmptyArray(item.left_click_commands) ? 
`    left_click_commands:
${item.left_click_commands.map(cmd => `      - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}

${!isEmptyObject(item.shift_left_click_requirement) ? 
`    shift_left_click_requirement:
      requirements:
        shift_left_click_requirements_${item.slot}:
          type: '${item.shift_left_click_requirement.type}'
          permission: ${item.shift_left_click_requirement.permission}
${!isEmptyArray(item.shift_left_click_requirement.deny_commands) ? 
`          deny_commands:
${item.shift_left_click_requirement.deny_commands.map(cmd => `          - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}` : ''}

${!isEmptyArray(item.shift_left_click_commands) ? 
`    shift_left_click_commands:
${item.shift_left_click_commands.map(cmd => `      - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}

${!isEmptyObject(item.right_click_requirement) ? 
`    right_click_requirement:
      requirements:
        right_click_requirements_${item.slot}:
          type: '${item.right_click_requirement.type}'
          permission: ${item.right_click_requirement.permission}
${!isEmptyArray(item.right_click_requirement.deny_commands) ? 
`          deny_commands:
${item.right_click_requirement.deny_commands.map(cmd => `          - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}` : ''}

${!isEmptyArray(item.right_click_commands) ? 
`    right_click_commands:
${item.right_click_commands.map(cmd => `      - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}

${!isEmptyObject(item.shift_right_click_requirement) ? 
`    shift_right_click_requirement:
      requirements:
        shift_right_click_requirements_${item.slot}:
          type: '${item.shift_right_click_requirement.type}'
          permission: ${item.shift_right_click_requirement.permission}
${!isEmptyArray(item.shift_right_click_requirement.deny_commands) ? 
`          deny_commands:
${item.shift_right_click_requirement.deny_commands.map(cmd => `          - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}` : ''}

${!isEmptyArray(item.shift_right_click_commands) ? 
`    shift_right_click_commands:
${item.shift_right_click_commands.map(cmd => `      - '${cmd.type} ${cmd.content}'`).join('\n')}` : ''}
`.trim();
	}).join('\n\n');
	console.log(menuListString);


	// 将对象转换为 YAML 格式的字符串
	const yamlString = `
menu_title: '${post_data.title}'
open_command: ${post_data.open_command}
size: ${post_data.size}

open_requirement:
  requirements:
    permission:
      type: has permission
      permission: deluxemenus.${post_data.open_command}
      deny_commands:
        - '[message] &c你没有得到这样做的许可!'
items:
  ${menuListString}
`;


	//上传文件到云存储
	const uploadResult = await uniCloud.uploadFile({
		cloudPath: 'example.yml', // 云存储路径
		fileContent: Buffer.from(yamlString, 'utf-8') // 文件内容
	});

	// 返回文件的下载 URL
	return {
		fileUrl: uploadResult.fileID
	};
};