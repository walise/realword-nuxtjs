// 基于axios 封装的请求
import axios from 'axios'
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io/'
})
// 添加请求拦截器 统一设置 请求时的用户token
// 任何请求都要经过拦截器
// context 是上下文对象
export default ({ store,redirect }) => {
    request.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        // 判断用户是否登录 拿到用户的token
        const { user } = store.state
        // 如果用户登录且有token 将token 设置到请求头里面
        if(user && user.token){
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
    
}
