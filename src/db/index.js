import axios from 'axios'
import jwt_decode from "jwt-decode"
// require('dotenv').config()

axios.interceptors.response.use((response) => {
  const {user_jwt} = response.headers
  user_jwt ? 
  localStorage.setItem('user_jwt', user_jwt) 
  : localStorage.removeItem('user_jwt')

  return response
}, async (error) => {
  if (error.response && error.response.status === 401) {
    window.location = '/auth/logout';
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
  setHeaders('user_jwt', localStorage.getItem('user_jwt'))
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
    const token = localStorage.getItem('user_jwt')
    return token && jwt_decode(token).name
  }
}

export const db = (name = '') => {
  const baseUrl = 'http://94.241.143.112:5000' + name
  // const baseUrl = 'http://localhost:5000' + name
  return {
    get: (url = '', params) => query('get', `${baseUrl}${url}`, {params}),
    post: (url, body) => query('post', `${baseUrl}${url}`, body),
    update: (url, body) => query('put', `${baseUrl}${url}`, body),
    remove: (url, data) => query('delete', `${baseUrl}${url}`, {data}),
    upload: async (formData) => (await axios.post(baseUrl, formData)).data,
  }
} 