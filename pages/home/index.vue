<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" 
                        :class="{
                          active: tab === 'your_feed'
                        }" 
                        exact
                        :to="{
                          name: 'home',
                          query: {
                            tab: 'your_feed',
                            favorited: user?user.username:''
                          }
                        }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" 
                         :class="{
                           active: tab === 'global_feed'
                          }" 
                          exact
                         to="/"
                         >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-show="tag">
              <nuxt-link class="nav-link ng-binding "
                         :class="{
                           active: tab === 'tag'
                          }"
                         to="" 
                         exact>
                <i class="ion-pound"></i> {{tag}}
              </nuxt-link>
            </li>
          </ul>
        </div>
      <div v-if="articles.length>0">
        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{name:'profile',
                            params:{
                              username:article.author.username},
                            query: {
                            from: 'other'
                        }}"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link :to="{name:'profile',params:{username:article.author.username},query: {
                            from: 'other'
                        }}" class="author">{{article.author.username}}</nuxt-link>
              <span class="date">{{article.createdAt|date('MMM DD,YYYY')}}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right"
                    @click="favoriteEvent(article)"
                    :class="{ 
                      'btn-primary': article.favorited,
                       'disabled': article.favoriteDisable
                    }">
              <i class="ion-heart" ></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{name:'article',params:{slug:article.slug}}"  class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline ng-binding ng-scope"
                  v-for="tag in article.tagList"
                  :key="tag"
              >
                {{tag}}
              </li>
          </ul>
          </nuxt-link>
        </div>
         <!-- 分页按钮 -->
         <!-- <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav> -->
        <Pagination :total="articlesCount" 
                    :pageCount="totalPage" 
                    :activePage="page"
                    linkTo="home"
                    :tag="$route.query.tag"
                    :tab="tab">
        </Pagination>
      </div>
      <div v-else class="article-preview">No articles are here... yet.</div>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="{
                        name: 'home',
                        query: {
                          tag: item,
                          tab: 'tag'
                        }
                      }" 
                       class="tag-pill tag-default"
                       v-for="item in tags"
                       :key="item"
                       >
                       <span >{{item}}</span>
                       </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>

</template>

<script>
import {mapState} from 'vuex'
import {globalArticles,getYourFeedArticles,addFavorite,deleteFavorite} from '@/api/article'
import {getTags} from '@/api/tag'
import Pagination from '@/components/Pagination'
export default {
    name: 'homePage',
    // {query} 就是我们要传入的查询文章的参数
    async asyncData ({query,redirect}) {
      // 页码 没有传 就是第一页
      const page = Number.parseInt(query.page|| 1);
      // 每页显示文章数量
      const limit = 20;
      // 文章标签
      const tag = query.tag || '';
      // 全部文章还是个人喜欢文章
      const tab = query.tab || 'global_feed'
      const loadArticles = tab === 'global_feed'||tab === 'tag'
      ? globalArticles
      : getYourFeedArticles
      const [ articlesRes, tagsRes] = await Promise.all([
        loadArticles({
          limit,
          offset: (page-1) * limit,
          tag: tag
        }),
        getTags()
      ])
      // 获取全部的文章列表 首页数据写在这里 有助于提升渲染速速 和seo
      const {articles,articlesCount} = articlesRes.data
      articles.forEach( item => {
        // 这里用于点赞时 的交互
        item.favoriteDisable = false
      })
      const { tags } = tagsRes.data
      return {
        articles,
        articlesCount,
        page,
        limit,
        tab,
        tag,
        tags,
        redirect
      }
    },
    watchQuery: ['page','tag','favorited'],// 监听路由参数的改变
    computed: {
      ...mapState(['user']),
      totalPage () {
        return Math.ceil(this.articlesCount/this.limit)
      }
    },
    components: {
      Pagination
    },
    methods: {
      // 点赞与取消点赞
      favoriteEvent(article){
        if(this.user){
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
        }else{
          this.$router.push({
            name:'login'
          })
        }
      }
    },
}
</script>

<style>

</style>