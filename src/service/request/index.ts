import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './type'

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    // 1.创建axios实例
    this.instance = axios.create(config)

    // 2.保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器,因为是从外部传入的，每个实例都是独立的
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 2.全局、添加所有实例都有的拦截器,因为创建实例都是通过此类创建的
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例拦截器：请求成功')

        if (this.showLoading) {
          // loading返回的实例
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (error) => {
        console.log('所有的实例拦截器：请求失败')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例拦截器：响应成功')

        // 移除loading
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例拦截器：响应失败')
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对config的处理
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors?.requestInterceptors(config)
      }

      // 2.判断是否需要掩饰londinf
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }

          // 2.初始化showLoading，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果通过resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
