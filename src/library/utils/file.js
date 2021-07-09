
const UNITS = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB'
]
const STEP = 1024

const fileUtil = {
    format(value, power, decimalPlaces = 2) {
        if (!decimalPlaces) { decimalPlaces = 0 } else if (decimalPlaces < 0) { decimalPlaces = 0 } else if (decimalPlaces > 20) { decimalPlaces = 20 }
        return (value / Math.pow(STEP, power)).toFixed(decimalPlaces) + UNITS[power]
    },
    // 格式化文件大小 11234 = 10.97KB
    formatFileSize(value, decimalPlaces = 2) {
        if (isNaN(value)) {
            return value
        }
        value = parseInt(value, 10)
        let i = 0
        for (; i < UNITS.length; i++) {
            if (value < Math.pow(STEP, i)) {
                if (UNITS[i - 1]) {
                    return fileUtil.format(value, i - 1, decimalPlaces)
                }
                return value + UNITS[i]
            }
        }
        return fileUtil.format(value, i - 1, decimalPlaces)
    }
}

export const formatFileSize = fileUtil.formatFileSize
export default fileUtil
