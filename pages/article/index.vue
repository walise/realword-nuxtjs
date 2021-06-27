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
      <div class="col-md-12">
        <p>
        {{article.body}}
        </p>
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-mata :article="article"/>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form" v-if="user">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body" required></textarea>
          </div>
          <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" @click="addComment">
             Post Comment
            </button>
          </div>
        </form>
        <p show-authed="false" style="display: inherit;" v-else>
          <a ui-sref="app.login" href="#/login">Sign in</a> or <a ui-sref="app.register" href="#/register">sign up</a> to add comments on this article.
        </p>
        <div class="card" v-for="comment in comms" :key="comment">
          <div class="card-block">
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="" class="comment-author">Jacob Schmidt</a>
            <span class="date-posted">Dec 29th</span>
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
export default {
    name: 'articlePage',
    async asyncData({params}){
      // 获取文章详情及文章的评论列表
      const { data } = await articleDetail(params.slug)
      const { comments } = await getComments(params.slug)
      return {
        article: data.article,
        comms: comments
      }
    },
    data: function () {
      return {
        body: ''
      }
    },
    computed: {
      ...mapState(['user'])
    },
    components: {
      ArticleMata
    },
    methods: {
      addComment(body){
        addComments(body)
      }
    }
}
</script>

<style>

</style>