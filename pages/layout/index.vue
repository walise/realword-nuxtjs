<template>
  <div>
      <!-- 存放项目的页面公共部分 -->
      <!-- 顶部 -->
      <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/insertOrEditArticle">
              <i class="ion-compose"></i>&nbsp;New Post
            </nuxt-link>
          </li>
          <!-- 如果用户已登录 显示用户名及头像 -->
          <ul v-if="user" class="nav navbar-nav pull-xs-right" style="margin-left:1em">
            <li class="nav-item" >
              <nuxt-link class="nav-link" :to="{name: 'profile', params: {username: user.username },query:{from: 'mine'}}">
                <img class="user-pic" :src="user.image" />
                {{user.username}}
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="setting">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
          </ul>
          <!-- 用户没有登录 显示登录 -->
          <li class="nav-item" v-else>
            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
      <!-- 子路由出口 -->
      <nuxt-child/>
      <!-- 底部 -->
      <footer>
      <div class="container">
        <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'layoutPage',
  computed: {
    routerName () {
      return this.$route.name
    },
    ...mapState(['user'])
  }
}
</script>

<style>
  .user-pic{
    display: inline-block;
    height: 26px;
    border-radius: 50px;
    float: left;
    margin-right: 5px;
  }
</style>