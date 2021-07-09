const strUtil = {
    // 计算字符串字节长度，全角算2字符，半角1字符
    getByteLen(str, target_len = 0) {
        let len = 0
        let target_idx = 0
        let hasIdx = false
        for (let i = 0; i < str.length; i++) {
            str.charCodeAt(i) > 255 ? len += 2 : len++
            if (!hasIdx && len >= target_len * 2) {
                target_idx = i
                hasIdx = true
            }
        }
        return { len, target_len, target_idx }
    }
}

export const getByteLen = strUtil.getByteLen
export default strUtil
