// 这里是对已经登录的状况 做 处理的中间件 已经登录时  就没必要 进入登录和注册页面
export default function ({store,redirect}) {
    const user = store.state.user;
    // 已经登录 跳转到首页
    if(user){
        return redirect('/')
    }
  }