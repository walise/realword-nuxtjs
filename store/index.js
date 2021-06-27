const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
    user: null
  })
  
  export const mutations = {
    setUser(state,payload) {
      state.user = payload
    }
  }
  export const actions = {
    // 会在服务端渲染期间自动运行 
    // 作用：初始化数据，传递数据给客户端
    nuxtServerInit ({ commit }, { req }) {
      let user = null
      // 判断请求头是否有cookie
      if (req.headers.cookie) {
        // 将cookie字符串转为js字符串
        const parsed = cookieparser.parse(req.headers.cookie)
        try {
          user = JSON.parse(parsed.user)
        } catch (err) {
          // No valid cookie found
        }
      }
      commit('setUser', user)
    }
  }