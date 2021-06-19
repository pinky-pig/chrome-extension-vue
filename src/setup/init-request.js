import Vue from 'vue'
import { default as request, userServerRequest,provinceServerRequest,experimentServerRequest  } from '@/modules/request'
import router from '@/router'
import store from '@/store'
import { getToken } from '@/modules/ruoyi-auth/utils'

Vue.prototype.$request = request

// 携带 token 请求拦截器
const withTokenInterceptor = (config) => {
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}

// 401 认证失败响应拦截器
const unauthInterceptor = async (response) => {
  const { data } = response
  if(data.code) {
    if(data.code === 401) {
      await store.dispatch('FedLogOut')
      router.push('/login')
      // 避免调用接口的页面继续执行 -> 报错
      return new Promise(() => {})
    }
  }
  return response
}

// request拦截器
request.interceptors.request.use(
  withTokenInterceptor,
  error => Promise.reject(error)
)

// 401
request.interceptors.response.use(
  unauthInterceptor,
  error => Promise.reject(error)
)

/**
 * userServerRequest
 */
// request拦截器
userServerRequest.interceptors.request.use(
  withTokenInterceptor,
  error => Promise.reject(error)
)
// 401
userServerRequest.interceptors.response.use(
  unauthInterceptor,
  error => Promise.reject(error)
)
/**
 * experimentServerRequest
 */
// request拦截器
experimentServerRequest.interceptors.request.use(
  withTokenInterceptor,
  error => Promise.reject(error)
)
// 401
experimentServerRequest.interceptors.response.use(
  unauthInterceptor,
  error => Promise.reject(error)
)

/**
 * provinceServerRequest
 */
// request拦截器
// provinceServerRequest.interceptors.request.use(
//   withTokenInterceptor,
//   error => Promise.reject(error)
// )
// // 401
// provinceServerRequest.interceptors.response.use(
//   unauthInterceptor,
//   error => Promise.reject(error)
// )
