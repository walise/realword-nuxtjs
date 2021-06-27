import { request } from '@/plugins/request'

// 获取公共的文章列表 参数项可选 未填参数 是所有列表
// 参数包括{
//     ?tags: '',
//     ?author: '',
//     ?favorited: '',
//     ?offset: '',
//     ?limit: '',
// }
const globalArticles = params => {
    return  new request({
        method: 'get',
        url: '/api/articles',
        params
    })
}
// 文章详情
const articleDetail = slug => {
    return  new request({
        method: 'get',
        url: `/api/articles/${slug}`
    })
}
// 获取个人喜欢的文章列表
const getYourFeedArticles = params => {
    return  new request({
        method: 'get',
        url: '/api/articles/feed',
        params
    })
}
// 文章点赞 /api/articles/:slug/favorite
const addFavorite = slug => {
    return  new request({
        method: 'post',
        url: `/api/articles/${slug}/favorite`,
        slug
    })
}
// 取消文章点赞 /api/articles/:slug/favorite
const deleteFavorite = slug => {
    return  new request({
        method: 'delete',
        url: `/api/articles/${slug}/favorite`,
        slug
    })
}
// 获取文章的评论列表
const getComments = slug => {
    return  new request({
        method: 'get',
        url: `/api/articles/${slug}/comments`,
        slug
    })
}
// 发布评论
const addComments = (slug,params) => {
    return  new request({
        method: 'post',
        url: `/api/articles/${slug}/comments`,
        slug,
        params
    })
}
// 删除评论
const deleteComments = slug => {
    return  new request({
        method: 'delete',
        url: `/api/articles/${slug}/comments`,
        slug
    })
}
export {
    globalArticles,
    articleDetail,
    getYourFeedArticles,
    addFavorite,
    deleteFavorite,
    getComments,
    addComments,
    deleteComments
}