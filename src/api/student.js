import service from '@/utils/request'
import { index } from '@/api/url'

/**
 * 下载老师的文件
 * fileName 文件的名字
 * 
 */
export function downTeacherUploadFile(data){
    return service({
        url:`${index}/student/downTeacherUploadFile?type=${data.type}`,
        method:'get',
        responseType:"blob"
    })
}

/**
 * 下载学生上传的文件
 * 
 * @export
 * @param {any} fileName 文件名
 * @returns 
 */
export function downloadStudentFile(data){
    return service({
        url:`${index}/student/downloadStudentFile?type=${data.type}`,
        method:"get",
        responseType:"blob"
    })
}
/**
 * 获取用户上传文件的详细信息
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getStudentFileInfo(data){
    return service({
        url:`${index}/student/getStudentFileInfo?type=${data.type}`,
        method:'get'
    })
}
/**
 * 获取被指导老师驳回的文件信息
 * 
 * @export
 * @returns 
 */
export function getFailExamineFile(){
    return service({
        url:`${index}/student/getFailExamineFile`,
        method:'get'
    })
}

/**
 * 获取老师的文件信息
 * 
 * @export
 * @returns 
 */
export function getTeacherUploadFile(data){
    return service({
        url:`${index}/student/getTeacherUploadFile?type=${data.type}`,
        method:'get'
    })
}

/**
 * 获取用户选择的课题的详情
 * 
 * @export
 * @returns 
 */
export function getSubject(){
    return service({
        url:`${index}/student/getSubject`,
        method:'get'
    })
}



/*
* 获取课题列表
*/
export function getSubjects(data){
    return service({
        url:`${index}/student/getSubjects/${data.pageSize}/${data.pageNum}`,
        method:'get'
    })
}


/**
 * 学生选题
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function selectSubject(data){
    return service({
        url:`${index}/student/selectSubject?subjectId=${data.subjectId}`,
        method:'get'
    })
}

/**
 * 上传学生文件
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function uploadStudentFile(data){
    return service({
        url:`${index}/student/uploadStudentFile?type=${data.type}`,
        method:'post',
        data:data.formData
    })
}