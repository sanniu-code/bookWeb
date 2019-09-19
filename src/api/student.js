import service from '@/utils/request'
import { index } from '@/api/url'

/**
 * 下载自己的任务书
 * fileName 文件的名字
 * 
 */
export function downOwnMissionBook(data){
    return service({
        url:`${index}/student/downOwnMissionBook?fileName=${data.fileName}`,
        method:'get',
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
        url:`${index}/student/downloadStudentFile?fileName=${data.fileName}`,
        method:"get"
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
 * 获取学生的任务书信息
 * 
 * @export
 * @returns 
 */
export function getOwnMissionBook(){
    return service({
        url:`${index}/student/getOwnMissionBook`,
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
        url:`${index}/student/uploadStudentFile`,
        method:'post',
        data
    })
}