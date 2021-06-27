<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="updateFrom">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" 
                       type="text" 
                       v-model="curUser.image"
                       :placeholder="user.image?user.image:'URL of profile picture'">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" 
                       type="text" 
                       v-model="curUser.username"
                       :placeholder="user.username?user.username:'Your Name'">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" 
                          rows="8" 
                          v-model="curUser.bio"
                          :placeholder="user.bio?user.bio:'Short bio about you'"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" 
                       type="text" 
                       v-model="curUser.email"
                       :placeholder="user.email?user.email:'Email'">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" 
                       type="password" 
                       v-model="curUser.password"
                       placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" >
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import {getUser,update} from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
import {mapState} from 'vuex'
export default {
    middleware: 'auth', //渲染页面前先调用中间间 判断用户是否登录 实现拦截
    name: 'settingPage',
    async asyncData ({redirect}) {
      return {
        redirect
      }
    },
    data: function () {
      return {
        curUser: {
          image: '',
          username: '',
          bio: '',
          email: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      // 修改个人信息
      async updateFrom () {
        try{
          // 判断密码有没有输入 没有输入 则这里不需要传入密码
          if(this.curUser.password === ''){
            delete this.curUser.password;
          }
          const res = await update({user:this.curUser});
          const {user} = res.data;
          // 更新缓存的用户数据
           Cookie.set('user',user)
           this.$store.commit('setUser',user)
           this.redirect({
             name: 'profile',
             params: {
               username: user.username
             },
             query: {
               from: 'mine'
             }
           })
        }catch(err){
          console.log(err)
        }
        
      }
    },
    mounted () {
      this.curUser.image = this.user.image;
      this.curUser.username = this.user.username;
      this.curUser.bio = this.user.bio;
      this.curUser.email = this.user.email;
    }
}
</script>

<style>

</style>