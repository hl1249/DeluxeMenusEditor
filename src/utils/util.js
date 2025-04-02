export default {
    transformColor:function (input) {
        input = String(input);
        const colorMap = {
            '&0': '#000000', '&1': '#0000AA', '&2': '#00AA00', '&3': '#00AAAA',
            '&4': '#AA0000', '&5': '#AA00AA', '&6': '#FFAA00', '&7': '#AAAAAA',
            '&8': '#555555', '&9': '#5555FF', '&a': '#55FF55', '&b': '#55FFFF',
            '&c': '#FF5555', '&d': '#FF55FF', '&e': '#FFFF55', '&f': '#FFFFFF',
        };

        let result = '';
        let isBold = false;
        let isUnderlined = false;
        let isItalic = false;
        let isStrikethrough = false;
        let color = '';

        // 默认样式
        const defaultStyle = 'font-weight:normal; font-style:normal; text-decoration:none; color:';

        // 处理每个字符
        for (let i = 0; i < input.length; i++) {
            let char = input[i];

            // 如果是控制符（&符号）
            if (char === '&' && i + 1 < input.length) {
                const nextChar = input[i + 1];

                if (nextChar === 'l') {  // 加粗
                    isBold = true;
                    i++;  // 跳过下一个字符
                } else if (nextChar === 'r') {  // 重置
                    isBold = false;
                    isUnderlined = false;
                    isItalic = false;
                    isStrikethrough = false;
                    color = '';
                    i++;  // 跳过下一个字符
                } else if (nextChar === 'n') {  // 下划线
                    isUnderlined = true;
                    i++;  // 跳过下一个字符
                } else if (nextChar === 'o') {  // 斜体
                    isItalic = true;
                    i++;  // 跳过下一个字符
                } else if (nextChar === 'm') {  // 删除线
                    isStrikethrough = true;
                    i++;  // 跳过下一个字符
                } else if (colorMap[`&${nextChar}`]) {  // 颜色
                    color = colorMap[`&${nextChar}`];
                    i++;  // 跳过下一个字符
                }
            } else if (char === '\n') {  // 处理换行符
                result += `<span style="${defaultStyle}">${char}</span>`;  // 重置样式后输出换行
                // 强制重置样式
                isBold = false;
                isUnderlined = false;
                isItalic = false;
                isStrikethrough = false;
                color = '';
            } else {
                // 每个字符都单独包裹一个span并应用样式
                let textDecoration = '';
                if (isUnderlined && isStrikethrough) {
                    textDecoration = 'underline line-through';
                } else if (isUnderlined) {
                    textDecoration = 'underline';
                } else if (isStrikethrough) {
                    textDecoration = 'line-through';
                } else {
                    textDecoration = 'none';
                }

                let style = `font-weight:${isBold ? 'bold' : 'normal'}; font-style:${isItalic ? 'italic' : 'normal'}; text-decoration:${textDecoration}; color:${color || ''}`;
                result += `<span style="${style}">${char}</span>`;
            }
        }

        return result;
    }
}