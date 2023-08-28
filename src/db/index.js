import axios from 'axios'
// import { router } from '@/setup'
import jwt_decode from "jwt-decode"

axios.interceptors.response.use((response) => {
  const {jwt} = response.headers
  jwt ? localStorage.setItem('jwt', jwt) : localStorage.removeItem('jwt')
  return response
}, async (error) => {
  if (error.response && error.response.status === 401) {
    // router.push('/logout')
  }
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data)
  }
  return Promise.reject(error.message)
})
const config = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
}
const query = (method, url, params) => {
  setHeaders('jwt', localStorage.getItem('jwt'))
  return axios[method](url, params, config)
    .then(res => res.data)
}

const setHeaders = (name, value) => {
  const headers = axios.defaults.headers.common
  if (value) headers[name] = value
  else delete headers[name]
}


export const user = {
  get name()  {
    const token = localStorage.getItem('jwt')
    return token && jwt_decode(token).name
  }
}


export const db = (name = '') => {
  const baseUrl = 'http://localhost:5000' + name
  return {
    get: (url = '', params) => query('get', `${baseUrl}${url}`, params),
    post: (url, body) => query('post', `${baseUrl}${url}`, body),
    remove: (url, data) => query('delete', `${baseUrl}${url}`, {data}),
    upload: async (formData) => {
      const {data} = await axios.post(baseUrl, formData)
      return data
    }
  }
}
