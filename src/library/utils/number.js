import BigNumber from 'bignumber.js'
const numUtil = {
    // 阿拉伯数字转换中文，仅支持万亿以下，不支持小数
    numToChinese(_num) {
        if (_num === null || _num === undefined || _num === '') {
            return
        }
        if (isNaN(_num)) {
            return
        }
        const units = [
            '',
            '万',
            '亿'
        ]
        const _units = [
            '千',
            '百',
            '十',
            ''
        ]
        const zero2Nine = [
            '零',
            '一',
            '二',
            '三',
            '四',
            '五',
            '六',
            '七',
            '八',
            '九'
        ]
        if (_num === 0) { return zero2Nine[0] }
        let num = parseInt(_num)
        num = num.toString().split('')
            .reverse()
            .join('')
        const unitsLen = units.length
        const numLen = num.length

        // 请不要传入过大的数字
        if (numLen > unitsLen * 4) {
            return
        }
        let str = ''
        for (let i = 0; i < numLen / 4; i++) {
            const __num = num.slice(i * 4, i * 4 + 4).split('')
                .reverse()
                .join('')
            if (__num === '0000') {
                continue
            }
            let __str = ''
            for (let j = 0; j < __num.length; j++) {
                const currentNum = zero2Nine[parseInt(__num[j])]
                const currentUnit = _units[j + 4 - __num.length]
                if (currentNum === '零' && currentUnit === '') {
                    continue
                } else {
                    __str += currentNum + currentUnit
                }
            }
            str = __str + units[i] + str
        }
        return str.replace(/零[\D]/g, '@').replace(/[@]+/g, '@')
            .replace(/@$/, '')
            .replace(/@([万亿]+)/, '$1')
            .replace(/@/g, '零')
    },
    // 数字转换为千分位
    numToThousands: (s, n) => {
        if (s === null || s === undefined || s === '') {
            return
        }
        if (isNaN(s)) {
            return
        }
        return new BigNumber(s.toString()).toFormat(n)
    }
}

export const numToChinese = numUtil.numToChinese
export const numToThousands = numUtil.numToThousands
export default numUtil
