import axios from 'axios'
import { useCommonStore } from '../store'

export const CANCELER_KEY = Symbol('CANCELER_KEY')

const instance = axios.create({
  baseURL: '/api',
  timeout: 300000
})

instance.interceptors.request.use(config => {
  // 收集 get 请求
  if (config.method === 'get') {
    const commonStore = useCommonStore()

    /**
     * @example
     * axios.get('/api/xxx', {
     *   params: {
     *     [CANCELER_KEY]: 'Unique key',
     *     ... another params
     *   }
     * })
     */
    const key = config.params?.[CANCELER_KEY]

    if (key) {
      const cancelerList = commonStore.cancelers
      const canceler = cancelerList.get(key)
      
      if (canceler) {
        canceler()
      } else {
        config.cancelToken = new axios.CancelToken(c => {
          cancelerList.set(key, c)
        })
        commonStore.SET_CANCELERS(cancelerList)
      }
    }
  }
  return config
})

instance.interceptors.response.use(res => {
  const commonStore = useCommonStore()

  // 尝试清理已经被响应过的请求，如果它存在 canceler
  commonStore.cancelers.delete(res.config.params?.[CANCELER_KEY])

  if (res.status === 200) {
    return Promise.resolve(res.data)
  }

  return Promise.reject(res)
}, error => {
  return Promise.reject(error)
})

export default instance
