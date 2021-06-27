import Vue from 'vue'
import dayjs from 'dayjs'

// 使用方法 {{ 表达式 | 过滤器 }}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})