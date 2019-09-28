import service from '@/utils/request'
import { index } from '@/api/url'

/**
 * 上传公用文件
 * fileName 文件的名字
 * 
 */
export function uploadCommonFile(data){
    return service({
        url:`${index}/leader/uploadCommonFile`,
        method:'post',
        data:data.formData
    })
}


/**
 * 领导修改老师的密码
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function updateTeacherPass(data){
    return service({
        url:`${index}/leader/updateTeacherPass`,
        method:'post',
        data,
    })
}

/**
 * 修改课题
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function updateSubject(data){
    return service({
        url:`${index}/leader/updateSubject`,
        method:'post',
        data,
    })
}


/**
 * 修改密码
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function updateStudentPass(data){
    return service({
        url:`${index}/leader/updateStudentPass`,
        method:'post',
        data,
    })
}


/**
 * 修改专业
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function updateProfession(data){
    return service({
        url:`${index}/leader/updateProfession`,
        method:'post',
        data,
    })
}

/**
 * 修改班级
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function updateClassGrade(data){
    return service({
        url:`${index}/leader/updateClassGrade`,
        method:'post',
        data,
    })
}

/**
 * 领导导入课题
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function importSubject(data){
    return service({
        url:`${index}/leader/importSubject`,
        method:'post',
        data,
    })
}

/**
 * 修改老师的数据
 */
export function updateTeacher(data){
    return service({
        url:`${index}/leader/updateTeacher`,
        method:'post',
        data,
    })
}




/**
 * 获取本系老师的数据
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getTeacherList(data){
    return service({
        url:`${index}/leader/getTeacherList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`,
        method:'get',
        data,
    })
}

/**
 * 获取本系学生的数据
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getStudentList(data){
    return service({
        url:`${index}/leader/getStudentList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`,
        method:'get',
        data,
    })
}

/**
 * 通过excel中获取老师的数据
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getDataByTeacherExcel(data){
    return service({
        url:`${index}/leader/getDataByTeacherExcel`,
        method:'post',
        data:data.file,
    })
}



/**
 * 通过excel中获取学生的数据
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getDataByStudentExcel(data){
    return service({
        url:`${index}/leader/getDataByStudentExcel`,
        method:'post',
        data:data.file,
    })
}

/**
 * 获取所有专业
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getAllProfession(data){
    return service({
        url:`${index}/leader/getAllProfession`,
        method:'post',
        data,
    })
}

/**
 * 获取未审核的文件信息
 * 
 * @export
 * @returns 
 */
export function getAllNoExamineFile(data){
    return service({
        url:`${index}/leader/getAllNoExamineFile/${data.pageSize}/${data.pageNum}`,
        method:'get',
    })
}
/**
 * 获取所有的班级
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getAllClassGrade(data){
    return service({
        url:`${index}/leader/getAllClassGrade?pageSize=${data.pageSize}&pageNum=${data.pageNum}`,
        method:'get',
    })
}

/**
 * 审核老师的文件
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function examineTeacherFile(data){
    return service({
        url:`${index}/leader/examineTeacherFile`,
        method:'post',
        data
    })
}

/**
 * 创建任务
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function createTask(data){
    return service({
        url:`${index}/leader/createTask`,
        method:'post',
        data
    })
}

/**
 * 添加老师信息
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function addTeacher(data){
    return service({
        url:`${index}/leader/addTeacher`,
        method:'post',
        data
    })
}

/**
 *添加学生信息
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function addStudent(data){
    return service({
        url:`${index}/leader/addStudent`,
        method:'post',
        data
    })
}

/**
 * 添加专业
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function addProfession(data){
    return service({
        url:`${index}/leader/addProfession`,
        method:'post',
        data
    })
}

/**
 * 新增班级
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function addClassGrade(data){
    return service({
        url:`${index}/leader/addClassGrade`,
        method:'post',
        data
    })
}

/**
 * 获取某个专业的班级
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getClassByProfession(data){
    return service({
        url:`${index}/leader/getClassByProfession?id=${data.id}`,
        method:'get',
        data
    })
}

/**
 * 修改学生的信息
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function updateStudent(data){
    return service({
        url:`${index}/leader/updateStudent`,
        method:'post',
        data
    })
}

