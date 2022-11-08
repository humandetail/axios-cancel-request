import axios, { CANCELER_KEY } from '../libs/axios'

type ResponseType<T = any> = {
  code: number;
  message: string;
  data: T
}

export const getRecords = <T = any>(type: number) => {
  return axios.get<ResponseType<T>, ResponseType<T>>('/records', {
    params: {
      type,
      [CANCELER_KEY]: 'getRecords'
    }
  })
}

export const getHomeData = () => {
  return axios.get<any, ResponseType<any>>('/home', {
    params: {
      [CANCELER_KEY]: 'getHomeData'
    }
  })
}

export const getAboutData = () => {
  return axios.get<any, ResponseType<any>>('/about', {
    params: {
      [CANCELER_KEY]: 'getHomeData'
    }
  })
}
