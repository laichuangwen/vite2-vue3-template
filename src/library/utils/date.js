import M from 'moment'

// 汉化
M.locale('zh-cn')
// 禁用警告
M.suppressDeprecationWarnings = true

// 获取moment
export const getMoment = val => {
    if (!val) {
        return
    }
    const m = M(val)
    if (!m._isValid) {
        return
    }
    return m
}

// YYYY-MM-DD HH:mm:ss.SSS (年-月-日 时:分:秒:毫秒)
export const formatDate = (val, format = 'YYYY-MM-DD') => {
    const m = getMoment(val)
    if (m) {
        return m.format(format)
    }
}
// 解析为原生Date对象
export const parseDate = val => {
    const m = getMoment(val)
    if (m) {
        return m.toDate()
    }
}
// 个性化时差 [刚刚,N秒前,N分钟前,N小时前,N天前,N月前,N年前]
export const dateDiff = val => {
    const range1 = [
        -Infinity,
        10
    ] // 0~10分钟
    const range2 = [
        10,
        60
    ] // 10分钟~1小时
    const range3 = [
        60,
        24 * 60
    ] // 1小时~1天
    const range4 = [
        24 * 60,
        48 * 60
    ] // 1天~2天
    const range5 = [
        48 * 60,
        365 * 24 * 60
    ] // 2天~1年
    const range6 = [
        365 * 24 * 60,
        Infinity
    ] // 1年~
    let beforeDate = new Date()
    const currentDate = new Date()
    let diff

    if (val) {
        beforeDate = getMoment(val).toDate()
    }

    const m = beforeDate.getTime()

    diff = (currentDate.getTime() - m) / (1000 * 60)

    if (diff > range1[0] && diff <= range1[1]) {
        return '刚刚'
    } else if (diff > range2[0] && diff <= range2[1]) {
        diff = Math.floor(diff)
        return `${diff}分钟前`
    } else if (diff > range3[0] && diff <= range3[1]) {
        diff = Math.floor(diff / 60)
        return `${diff}小时前`
    } else if (diff > range4[0] && diff <= range4[1]) {
        // 判断beforeDate和currentDate是否相隔超过一天
        if (Math.abs(beforeDate.getDay() - currentDate.getDay()) > 1) {
            return `${formatDate(m, 'M月D日 HH:mm')}`
        }
        return `昨天${formatDate(m, 'HH:mm')}`
    } else if (diff > range5[0] && diff <= range5[1]) {
        return `${formatDate(m, 'M月D日 HH:mm')}`
    } else if (diff > range6[0] && diff <= range6[1]) {
        return `${formatDate(m, 'YYYY年M月D日 HH:mm')}`
    }

    // if (val) {
    //     let m = getMoment(val)
    //     if (m) {
    //         if (new Date() - m.toDate() < 0) {
    //             return '刚刚'
    //         }
    //         return m.fromNow().replace(/\s/g, '')
    //     }
    // } else {
    //     return M().fromNow()
    // }
}
// 通过出生日期获取年龄
export const getAgeByBirthday = val => {
    const birthday = parseDate(val)
    if (birthday) {
        const now = new Date()
        // 要计算的日期大于当前日期时，拒绝计算
        if (birthday > now) { return }
        return Math.floor(M.duration(now - birthday, 'ms').asYears())
    }
}

// 获取日期获取星座
export const getConstellation = val => {
    const dt = parseDate(val)
    if (dt) {
        const m = dt.getMonth() + 1
        const d = dt.getDate()
        if (m === 1 && d >= 20 || m === 2 && d <= 18) {
            return '水瓶座'
        } else if (m === 2 && d >= 19 || m === 3 && d <= 20) {
            return '双鱼座'
        } else if (m === 3 && d >= 21 || m === 4 && d <= 19) {
            return '白羊座'
        } else if (m === 4 && d >= 20 || m === 5 && d <= 20) {
            return '金牛座'
        } else if (m === 5 && d >= 21 || m === 6 && d <= 21) {
            return '双子座'
        } else if (m === 6 && d >= 22 || m === 7 && d <= 22) {
            return '巨蟹座'
        } else if (m === 7 && d >= 23 || m === 8 && d <= 22) {
            return '狮子座'
        } else if (m === 8 && d >= 23 || m === 9 && d <= 22) {
            return '处女座'
        } else if (m === 9 && d >= 23 || m === 10 && d <= 22) {
            return '天秤座'
        } else if (m === 10 && d >= 23 || m === 11 && d <= 21) {
            return '天蝎座'
        } else if (m === 11 && d >= 22 || m === 12 && d <= 21) {
            return '射手座'
        } else if (m === 12 && d >= 22 || m === 1 && d <= 19) {
            return '摩羯座'
        }
    }
}
// 通过日期获取生肖
export const getZodiac = val => {
    const dt = parseDate(val)
    if (dt) {
        const start = 1901
        const year = dt.getFullYear()
        const x = (start - year) % 12
        if (x === 1 || x === -11) {
            return '鼠'
        } else if (x === 0) {
            return '牛'
        } else if (x === 11 || x === -1) {
            return '虎'
        } else if (x === 10 || x === -2) {
            return '兔'
        } else if (x === 9 || x === -3) {
            return '龙'
        } else if (x === 8 || x === -4) {
            return '蛇'
        } else if (x === 7 || x === -5) {
            return '马'
        } else if (x === 6 || x === -6) {
            return '羊'
        } else if (x === 5 || x === -7) {
            return '猴'
        } else if (x === 4 || x === -8) {
            return '鸡'
        } else if (x === 3 || x === -9) {
            return '狗'
        } else if (x === 2 || x === -10) {
            return '猪'
        }
    }
}
export const daterangeParseString = val => {
    if (Array.isArray(val) && val.length === 2 && val[0] && val[1]) {
        return `btw|${formatDate(val[0])},${formatDate(val[1])}`
    }
    return ''
}

export default {
    getMoment,
    parseDate,
    formatDate,
    dateDiff,
    getAgeByBirthday,
    getConstellation,
    getZodiac,
    daterangeParseString
}
