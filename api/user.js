// 处理用户相关的接口
import { request } from '@/plugins/request'
// 登录
const login = data => {
    return  new request({
        method: 'post',
        url: '/api/users/login',
        data
    })
}
// 注册
const regist = data => {
    return new request({
        method: 'post',
        url: '/api/users',
        data
    })
}
// 获取当前登录的用户信息
const getUser = () => {
    return  new request({
        method: 'get',
        url: `/api/user`
    })
}
// 修改用户信息
const update = user => {
    return  new request({
        method: 'put',
        url: `/api/user`,
        data: user
    })
}
// 获取用户信息
const getProfile = username => {
    return  new request({
        method: 'get',
        url: `/api/profiles/${username}`,
        username
    })
}
// 关注
const addFollow = username => {
    return  new request({
        method: 'post',
        url: `/api/profiles/${username}/follow`,
        username
    })
}
// 取消关注
const deleteFollow = username => {
    return  new request({
        method: 'delete',
        url: `/api/profiles/${username}/follow`,
        username
    })
}
export {
    login,
    regist,
    update,
    getProfile,
    addFollow,
    deleteFollow
}