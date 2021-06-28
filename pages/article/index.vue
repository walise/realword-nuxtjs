<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">
      <h1>{{article.title}}</h1>
      <!-- author-mata -->
      <article-mata :article="article"/>
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-mata :article="article"/>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form" v-if="user" @submit.prevent="addComment">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body" required></textarea>
          </div>
          <div class="card-footer">
            <img :src="user.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" >
             Post Comment
            </button>
          </div>
        </form>
        <p show-authed="false" style="display: inherit;" v-else>
          <a ui-sref="app.login" href="#/login">Sign in</a> or <a ui-sref="app.register" href="#/register">sign up</a> to add comments on this article.
        </p>
        <div class="card" v-for="(comment,index) in comms" :key="index">
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img :src="user.image" class="comment-author-img" />
            </a>
            &nbsp;
            <nuxt-link :to="{
              name: 'profile',
              params: {
                username: user.username
              }
            }" class="comment-author">{{user.username}}</nuxt-link>
            <span class="date-posted">{{comment.createdAt|date('MMM DD,YYYY')}}</span>
          </div>
        </div>        
      </div>

    </div>

  </div>

</div>

</template>

<script>
import { mapState } from 'vuex'
import { articleDetail,getComments,addComments } from '@/api/article'
import ArticleMata from './components/article-mata.vue'
// 处理markdwon 文本内容
import MarkdownIt from 'markdown-it'
export default {
    name: 'articlePage',
    async asyncData({params}){
      // 获取文章详情及文章的评论列表
      const { data } = await articleDetail(params.slug)
      const {article } = data
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      return {
        article: article,
        
      }
    },
    head() {
      // 设置头部meata 有助于seo
      return {
        title: this.article.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    },
    data: function () {
      return {
        body: '',
        comms: []
      }
    },
    computed: {
      ...mapState(['user'])
    },
    components: {
      ArticleMata
    },
    mounted(){
      this.getComment();
    },
    methods: {
      async getComment(){
        const commentRes  = await getComments(this.article.slug)
        const {comments} = commentRes.data;
        this.comms = comments;
      },
      addComment(){
        try{
          addComments(this.article.slug,{
            body: this.body
          })
          this.getComment();
        }catch(err){
          console.log(err)
        }
      }
    }
}
</script>

<style>

</style>