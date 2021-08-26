import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 定义拦截器接口
interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  // responseInterceptors?: (res: AxiosResponse) => AxiosResponse
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

// 继承AxiosRequestConfig接口并作为axios实例的类型，再把拦截器接口加入到里面
interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T> //拦截器接口
  showLoading?: boolean
}
export { HYRequestInterceptors, HYRequestConfig }
