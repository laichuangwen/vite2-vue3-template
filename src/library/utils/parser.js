import qs from 'qs'

const parseUrl = url => {
    let search = ''
    let protocol = 'http:'
    let host = ''
    let origin = ''
    let pathname = ''
    let arr = url.split('?')
    let query = {}
    if (arr.length > 1) {
        const cUrl = arr.map((list,index) =>{
            if(index>0) return list
            return ''
        })
        search = `${cUrl.join('?')}`
        console.log('search',search);
        query = qs.parse(cUrl.join('?'))
        console.log('search',query);
    }
    arr = arr[0].split('//')
    if (arr.length > 1) {
        protocol = arr[0]
    }
    const hostAndPath = arr.pop()
    const pathIndex = hostAndPath.indexOf('/')
    if (pathIndex > -1) {
        host = hostAndPath.slice(0, pathIndex)
        pathname = hostAndPath.slice(pathIndex)
    } else {
        host = hostAndPath
    }
    origin = `${protocol}//${host}`

    return {
        protocol,
        host,
        pathname,
        search,
        query,
        origin
    }
}

// 平铺结构转树形结构
const flatToTree = (list = [], option = {}) => {
    const {
        rootId = 0
    } = option
    const keys = {
        nodeId: 'id',
        parentId: 'parentId',
        children: 'children',
        ...option.keys
    }
    const idsMap = {}

    list.forEach(item => {
        const id = item[keys.nodeId]
        const parentId = item[keys.parentId]
        let node = idsMap[id]
        if (!node) {
            node = {
                ...item,
                [keys.children]: []
            }
        } else {
            node = {
                ...item,
                ...node
            }
        }
        idsMap[id] = node
        let parentNode = idsMap[parentId]
        if (!parentNode) {
            parentNode = {
                id: parentId,
                [keys.children]: []
            }
            idsMap[parentId] = parentNode
        }
        idsMap[parentId][keys.children].push(node)
    })

    return idsMap[rootId] ? idsMap[rootId][keys.children] : []
}

// 树形结构转平铺结构
const treeToFlat = (tree = [], option = {}, container = []) => {
    const keys = {
        children: 'children',
        ...option.keys
    }

    tree.forEach(item => {
        item = { ...item }
        const children = item[keys.children]
        delete item[keys.children]
        container.push(item)
        if (children && children.length) {
            treeToFlat(children, option, container)
        }
    })

    return container
}

export default {
    parseUrl,
    flatToTree,
    treeToFlat
}
