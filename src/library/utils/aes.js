import CryptoJS from 'crypto-js';//引用AES源码js
// return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(world), CryptoJS.enc.Utf8.parse('4aa34b9a4b7d54353c7256c3d9297af2'),
// { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).ciphertext.toString()
const key = CryptoJS.enc.Utf8.parse("4aa34b9a4b7d54353c7256c3d9297af2");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Utf8.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

export default {
    Decrypt,
    Encrypt
}