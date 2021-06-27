// 标签接口
// 处理用户相关的接口
import { request } from '@/plugins/request'
const getTags = () => {
    return  new request({
        method: 'get',
        url: '/api/tags',
    })
}
export {
    getTags
}