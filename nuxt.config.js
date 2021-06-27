// nuxt.js 的配置文件
export default {
    // 我们自行配置路由表，不要nuxt 自动生成的路由表
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 现将原有的路由表清空
            routes.splice(0)
            // 重新配置
            routes.push({
              path: '/',
              component: resolve(__dirname, 'pages/layout/'),
              children: [
                  {
                    name: 'home',
                    path: '',
                    component: resolve(__dirname, 'pages/home/'),
                  },
                  {
                    name: 'login',
                    path: '/login',
                    component: resolve(__dirname, 'pages/login/'),
                  },
                  {
                    name: 'register',
                    path: '/register',
                    component: resolve(__dirname, 'pages/login/'),
                  },
                  {
                    name: 'profile',
                    path: '/profile/:username', //这里要创建动态路由 ，否则 nuxt-link 中params 值 在刷新后 就会消失
                    component: resolve(__dirname, 'pages/profile/'),
                  },
                  {
                    name: 'setting',
                    path: '/setting',
                    component: resolve(__dirname, 'pages/setting/'),
                  },
                  {
                    name: 'insertOrEditArticle',
                    path: '/insertOrEditArticle',
                    component: resolve(__dirname, 'pages/insertOrEditArticle/'),
                  },
                  {
                    name: 'article',
                    path: '/article/:slug',
                    component: resolve(__dirname, 'pages/article/'),
                  }
              ]
            })
        }
    },
    // 注册插件
    plugins: [
      {src: '~/plugins/request.js'},
      {src: '~/plugins/date.js'}
    ],
    server: {
      host: '0.0.0.0',
      port: 3000
    }
}