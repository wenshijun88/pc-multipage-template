import axios from 'axios'
import {getUrlPrefix} from '@/utils/index'
import {
  Message
} from 'element-ui'

import store from '@/store'
const successCode = ['200', 200]
const baseUrl = `/${getUrlPrefix()}`
// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 38000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    config.params = {
      ...config.params
    }
    if (config.showLoading) {
      store.commit('app/PLUS_LOADING_NUMBER')
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { data, code, message } = response.data
    if (response.config.showLoading) {
      store.dispatch('app/setLoading')
    }

    // console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (successCode.includes(code)) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return data
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      Message({
        message: `${message}`,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(message || 'Error'))
    }
  },
  error => {
    let {config} = error
    if (config.showLoading) {
      store.dispatch('app/setLoading')
    }
    let tip = error.message
    Message({
      message: tip,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export const $api = 'ur'
export const $apiE = 'ure'

export default service
