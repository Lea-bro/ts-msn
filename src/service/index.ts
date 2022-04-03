// service 统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

// console.log(BASE_URL)
const hyRequest = new HYRequest({
  // 传入axios实例中的
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 实例中的拦截
    requestInterceptors: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('实例请求的拦截')
      return config
    },
    requestInterceptorsCatch: (error) => {
      console.log('实例请求失败的拦截')
      return error
    },
    responseInterceptors: (res) => {
      // console.log('实例响应的拦截')
      return res
    },
    responseInterceptorsCatch: (error) => {
      console.log('实例响应失败的拦截')
      return error
    }
  }
})
// export const hyRequest2 = new HYRequest({})

export default hyRequest
