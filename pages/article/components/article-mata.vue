<template>
    <!-- 文章详情 作者信息栏 -->
    <div class="article-meta">
    <nuxt-link :to="{
        name: 'profile',
        params: {
            username: article.author.username
        },
        query: {
            from: 'other'
        }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
        <nuxt-link :to="{
                        name: 'profile',
                        params: {
                            username: article.author.username
                        },
                        query: {
                            from: 'other'
                        }
                    }" class="author">{{article.author.username}}</nuxt-link>
        <span class="date">{{article.createdAt|date('MMM DD')}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow Eric Simons <span class="counter">({{article.favoritesCount}})</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
    </div>
</template>

<script>
export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true // 必填
        }
    }
}
</script>

<style>

</style>