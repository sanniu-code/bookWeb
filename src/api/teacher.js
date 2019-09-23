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

/**
 * 获取自己学生的信息列表
 * 
 * @export
 * @returns 
 */
export function getStudentList(){
    return service({
        url:`${index}/teacher/getStudentList`,
        method:'get',
    })
}

/**
 * 获取还未审核的文件
 * 
 * @export
 * @returns 
 */
export function getNotExamineFiles(){
    return service({
        url:`${index}/teacher/getNotExamineFiles`,
        method:'get',
    })
}

/**
 * 获取当前老师所有学生的上传的文件信息
 * 
 * @export
 * @returns 
 */
export function getExamineFiles(){
    return service({
        url:`${index}/teacher/getExamineFiles`,
        method:'get',
    })
}

/**
 * 驳回学生上传的文件
 * 
 * @export
 * @returns 
 */
export function FailExamineStudentUploadFile(data){
    return service({
        url:`${index}/teacher/FailExamineStudentUploadFile`,
        method:'post',
        data
    })
}

/**
 * 通过学生上传的文件
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function ExamineStudentUploadFile(data){
    return service({
        url:`${index}/teacher/ExamineStudentUploadFile`,
        method:'post',
        data
    })
}

/**
 * 获取老师所有的题目
 * 
 * @export
 * @returns 
 */
export function getTeacherSubjects(){
    return service({
        url:`${index}/teacher/getTeacherSubjects`,
        method:'get',
        
    })
}

/**
 * 下载老师的文件
 * 
 * @export
 * @returns 
 */
export function downTeacherFile(data){
    return service({
        url:`${index}/teacher/downTeacherFile?id=${data.id}&fileName=${data.fileName}`,
        method:'get',
        responseType:"blob"
        
    })
}

/**
 * 获取所有学生的文件
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getStudentFileInfo(data){
    return service({
        url:`${index}/teacher/getStudentFileInfo?type=${data.type}`,
        method:'get',
        
    })
}   

export function examineStudentFile(data){
    return service({
        url:`${index}/teacher/examineStudentFile?id=${data.id}&status=${data.status}`,
        method:'get',
        
    })
}  





