import service from '@/utils/request'
import { index } from '@/api/url'

/**
 * 下载任务书
 * 
 */
export function downOwnMissionBook(fileName){
    return service({
        url:`${index}/student/downOwnMissionBook?fileName=${fileName}`,
        method:'get',
    })
}

/**
 * 
 * 获取自己已经选择课题详情
 */
export function getSubject(date){
    return service({
        url:`${index}/student/getSubject`,
        method:'post',
        date
    })
}

/*
* 获取课题列表
*/
export function getSubjects(date){
    return service({
        url:`${index}/student/getSubjects/${date.pageSize}/${date.pageNum}`,
        method:'get'
    })
}