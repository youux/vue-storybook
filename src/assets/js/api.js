import axios from 'axios'
import Utils from './utils.js'

const Http = axios.create({
  baseURL: Utils.baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
Http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

// 响应拦截器
Http.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export default Http
