// 中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前 以此来实现路由拦截的效果
// 这里是判断用户是否登录的中间件
// 传参不加大括号 时 就是上下文 加了大括号就是解构
export default function ({store,redirect,route}) {
    const username = route.query.username;
    const user = store.state.user;
    // 没有登录 跳转到登录页面
    if(!user){
        return redirect('/login')
    }
  }