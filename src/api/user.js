import service from '@/utils/request'
import { index } from '@/api/url'

export function login(data){
    return service({
        url:`${index}/user/login`,
        method:'post',
        data
    })
}

export function getCode(){
    return service({
        url:`${index}/user/createImg`,
        responseType: 'arraybuffer',
        method:'get',
    })
}