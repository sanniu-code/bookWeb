import service from '@/utils/request'
import { index } from '@/api/url'

/**
 * 登录
 * @export
 * @param {any} data 
 * @returns 
 */
export function login(data){
    return service({
        url:`${index}/user/login`,
        method:'post',
        data
    })
}
/**
 * 获取验证码
 * 
 * @export
 * @returns 
 */
export function getCode(){
    return service({
        url:`${index}/user/createImg`,
        responseType: 'arraybuffer',
        method:'get',
    })
}
/**
 * 退出登录
 * 
 * @export
 * @returns 
 */
export function loginOut(){
    return service({
        url:`${index}/user/loginOut`,
        method:"get"
    })
}

/**
 * 下载常用表
 * 
 * @export
 * @param {any} fileName  文件的名字
 * @returns 
 */
export function download(fileName){
    return service({
        url:`${index}/user/download?fileName=${fileName}`,
        method:'get'
    })
}