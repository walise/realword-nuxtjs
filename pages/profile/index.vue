<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
           {{profile.bio}}
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn" v-if="isMine" @click="toSet(profile.username)">
            <i class="ion-gear-a"></i>
            &nbsp;
             Edit Profile Settings
          </button>
          <button class="btn btn-sm btn-outline-secondary action-btn" v-else @click="followEvent(profile.following,profile.username)">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{profile.following?`Unfollow ${profile.username}`:`Follow ${profile.username}`}}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" 
                         :class="{
                           active: tab ==='own'
                         }"
                         exact
                         :to="{
                           name:'profile',
                           params:{
                             username: profile.username
                           },
                           query:{
                             tab: 'own'
                           }
                         }"
                        >My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                         :class="{
                           active: tab ==='favorite'
                         }"
                         exact
                         :to="{
                           name:'profile',
                           params:{
                             username: profile.username
                           },
                           query:{
                             tab: 'favorite'
                           }
                         }"
                      >Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>
        <div v-if="articlesCount !== 0">
          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <a href="#"><img :src="article.author.image" /></a>
              <div class="info">
                <a href="#" class="author">{{article.author.username}}</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{ 
                      'btn-primary': article.favorited,
                       'disabled': article.favoriteDisable
                    }"
                      @click="favoriteEvent(article)"
              >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <Pagination :total="articlesCount" 
                    :pageCount="pageCount" 
                    :activePage="page"
                    linkTo="profile"
                    :tab="tab" />
        </div>
        <div v-else class="article-preview">No articles are here... yet.</div>
      </div>

    </div>
  </div>

</div>

</template>

<script>
import {mapState} from 'vuex'
import Pagination from '@/components/Pagination'
import {getProfile,addFollow,deleteFollow} from '@/api/user'
import {addFavorite,deleteFavorite,globalArticles} from '@/api/article'
export default {
    async asyncData ({query,params,redirect}) {
      // tab 用于tab 切换
      const tab = query.tab || 'own';
      // 用于分页查询的数据
      // 页码 
      const page = query.page || 1; // 没有传时，默认为1
      // 每页显示数量
      const limit = 2;
      // 开始从多少项查询 （page-1)*limit
      const offset = (page-1) * limit;
      // 获取个人信息
      const profileRes = await getProfile(params.username);
      const {profile} = profileRes.data;
      const exactData = tab !== 'own'?{favorited: params.username}:{author: params.username}
      // 获取这个人的文章及这个人喜欢的文章
      const favoriteRes = await globalArticles({
        limit,
        offset,
        ...exactData
      })
      const {articles,articlesCount} = favoriteRes.data;
      return {
        page: page,
        limit: limit,
        offset: offset,
        tab: tab,
        from: query.from,
        profile,
        articles: articles,
        articlesCount: articlesCount,
        redirect
      }
    },
    watchQuery: ['tab','page'], // 监听路由中相关参数的变化  更新页面数据
    computed: {
      ...mapState(['user']),
      isMine(){
        return this.from === 'mine'
      },
      pageCount(){
        return Math.ceil(this.articlesCount/this.limit)
      }
    },
    components: {
      Pagination
    },
    middleware: ['auth'], 
    
    name: 'profilePage',
    methods: {
      // 关注与取消
      followEvent (isFollow,username) {
        // 先判断当前是否关注该用户
        if(isFollow){
          // 如果已关注 则取消关注
          deleteFollow(username)
          this.profile.following = false;
        }else{
          // 没有关注 则关注该用户
          addFollow(username)
          this.profile.following = true;
        }
      },
      //  前往设置个人信息
      toSet(user){
        this.redirect({
          name: 'setting',
          params: {
            user: user
          }
        })
      },
      // 点赞与取消点赞
      async favoriteEvent(article){
        // 获取当前的点赞状态
        const status = article.favorited;
        article.favoriteDisable = true;
        if(status){
          // 取消点赞
          article.favoritesCount -= 1;
          article.favorited = false;
          deleteFavorite(article.slug)
        }else{
          // 点赞
          article.favoritesCount += 1;
          article.favorited = true;
          addFavorite(article.slug)
        }
        article.favoriteDisable = false;
      }
    },
}
</script>

<style>

</style>