import service from '@/utils/request'
import { index } from '@/api/url'

/**
 * 上传课题申请表
 * fileName 文件的名字
 * 
 */
export function uploadApplyTable(data){
    return service({
        url:`${index}/teacher/uploadApplyTable?title=${data.title}&detail=${data.detail}&type=${data.type}&origin=${data.origin}&address=${data.address}`,
        method:'post',
        data:data.multipartFile
    })
}

/**
 * 上传普通文件
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function uploadFile(data){
    return service({
        url:`${index}/teacher/uploadFile?username=${data.username}&type=${data.type}`,
        method:'post',
        data:data.file
    })
}