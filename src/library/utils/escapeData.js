
let tempDom = ''

export default val => {
    if (!tempDom) {
        tempDom = document.createElement('div')
    }

    tempDom.innerText = val

    return tempDom.innerHTML
}
