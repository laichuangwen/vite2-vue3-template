
/**
 * 图片转base64
 */
export const convertImgToBase64 = url => {
    let canvas
    let ctx
    let ext
    let img
    return new Promise((resolve) => {
        img = new Image()
        img.onload = function() {
            canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, img.width, img.height)
            ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
            resolve(canvas.toDataURL(`image/${ext}`))
        }

        img.onerror = function() {
            resolve('')
        }
        img.setAttribute('crossOrigin', 'anonymous')
        img.src = url
    })
}

class UserAgent {
    constructor() {
        // 如果是客户端退出，则退出到login页面
        const u = navigator.userAgent
        Object.assign(this, {
            trident: u.indexOf('Trident') > -1, // IE内核
            weChat: u.indexOf('MicroMessenger') > -1, // 微信打开
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            mobile: Boolean(u.match(/AppleWebKit.*Mobile.*/)), // 是否为移动终端
            ios: Boolean(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') === -1, // 是否web，没有头部与底部
            isWebkit: (/webkit/i).test(u), // webkit
            isIE: (() => 'ActiveXObject' in window)(), // ie
            isFirefox: u.indexOf('Firefox') > -1, // firefox
            isClient: u.toLowerCase().indexOf('electron') > -1 // 是否为electron客户端
        })
    }
}
export const userAgent = new UserAgent()

/**
 * 打开新窗口
 */
let pushDom
export const openWindow = url => {
    if (userAgent.isClient) { // 判断是否为客户端
        if (!pushDom) {
            pushDom = document.createElement('a')
            pushDom.style.position = 'fixed'
            pushDom.style.left = '-999999px'
            document.body.appendChild(pushDom)
        }
        pushDom.target = '_blank'
        pushDom.href = url
        pushDom.click()
    } else {
        const newWin = window.open()
        if (newWin) { // 窗口被拦截的情况下newWin为null
            newWin.location.href = url
        }
    }
}

/**
 * 下载文件
 */

let linkDom
export const downloadFile = url => {
    if (!linkDom) {
        linkDom = document.createElement('a')
        linkDom.setAttribute('name', 'downloadFile')
        linkDom.style.position = 'fixed'
        linkDom.style.left = '-99999px'
        if (userAgent.trident) { // ie浏览器
            linkDom.setAttribute('target', '_blank')
        }
        document.body.appendChild(linkDom)
    }
    linkDom.href = url
    linkDom.click()
}

/**
 * 复制文本
 */
let copy_el
export const copy = text => {
    if (!copy_el) {
        copy_el = document.createElement('textarea')
        copy_el.style.position = 'fixed'
        copy_el.style.left = '-99999px'
        document.body.appendChild(copy_el)
    }
    copy_el.value = text
    copy_el.select()
    document.execCommand('Copy')
}

export default {
    openWindow,
    downloadFile,
    convertImgToBase64,
    userAgent,
    copy
}
