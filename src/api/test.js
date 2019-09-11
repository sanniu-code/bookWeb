import service from '@/utils/request'
import { index } from '@/api/url'

export function test(data){
    return service({
        url:`${index}/test`,
        method:'post',
        data,
    })
}