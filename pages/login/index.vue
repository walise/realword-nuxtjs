<template>
  <div class="auth-page">
    <div class="container page">
        <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">{{isLogin ?'Sign in':'Sign up'}}</h1>
            <p class="text-xs-center">
            <nuxt-link to='/login' v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to='/register' v-if="isLogin">Need an account?</nuxt-link>
            </p>

            <ul class="error-messages" v-if="errors">
                <template v-for="(messages,field) in errors">
                    <li v-for="(message,index) in messages" :key="index">{{field}} {{" "+message}}</li>
                </template>
            </ul>

            <form @submit.prevent="handler">
            <fieldset class="form-group" v-if="!isLogin">
                <input class="form-control form-control-lg" 
                       type="text" 
                       placeholder="Your Name"
                       v-model="user.username"
                       >
            </fieldset>
            <fieldset class="form-group">
                <input class="form-control form-control-lg" 
                       type="email" 
                       placeholder="Email"
                       required="required"
                       v-model="user.email">
            </fieldset>
            <fieldset class="form-group">
                <input class="form-control form-control-lg" 
                       type="password" 
                       placeholder="Password"
                       required="required"
                       minlength="8"
                       v-model="user.password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
                {{isLogin ?'Sign in':'Sign up'}}
            </button>
            </form>
        </div>

        </div>
    </div>
</div>
</template>

<script>
// 只有客户端才使用 将用户数据存储到本地 实现登录状态持久化
// 注意：这里为什么不使用loacalStorage 本地缓存
const Cookie = process.client ? require('js-cookie') : undefined
import {login,regist} from '@/api/user'
export default {
    middleware: 'state', 
    name: 'loginPage',
    data: function(){
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            errors: {

            }
        }
    },
    // 异步获取获取数据
    computed: {
        // 我们这里的登录和注册共用一个页面 所以 ，我需要通过路由判断当前页面 以显示页面内容
        // 为登录时 只显示登录页面信息；注册时 ，只显示注册页面信息
        // 判断是否为登录页面
        isLogin(){
            return this.$route.name === 'login'
        },
    },
    methods: {
        async handler(){
            // 表单提交事件
             try{
                // 响应数据
                const {data} = this.isLogin ? await login({user:this.user}) : await regist({user:this.user})
                // 获取用户token 存储用户信息 跳转页面
                // 保存用户的登录状态
                Cookie.set('user',data.user)
                this.$store.commit('setUser',data.user)
                this.$router.push('/')
            }catch(err){
                // 请求异常时的处理
                this.errors = err.response.data.errors
            }
        }
    }
}
</script>

<style>

</style>