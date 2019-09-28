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
export function downloadApplyTable(data){
    return service({
        url:`${index}/user/downloadApplyTable?id=${data.id}`,
        method:'get',
        responseType:'blob'
    })
}

/**
 * 获取相关资料
 * 
 * @export
 * @returns 
 */
export function getUserFileList(){
    return service({
        url:`${index}/user/getUserFileList`,
        method:'get'
    })
}

/**
 * 修改
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function updatePass(data){
    return service({
        url:`${index}/user/updatePass`,
        method:"post",
        data
    })
}

/**
 * 判断旧密码是否正确
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function judgePass(data){
    return service({
        url:`${index}/user/judgePass`,
        method:"post",
        data
    })
}

/**
 * 获取用户对应的菜单
 * 
 * @export
 * @returns 
 */
export function getMenu(){
    return service({
        url:`${index}/user/getMenu`,
        method:"get",
    })
}