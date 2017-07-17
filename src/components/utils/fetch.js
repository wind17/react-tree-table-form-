import axios from 'axios'

let fetcher = axios.create({
  method: 'post',
  baseURL: '',
  withCredentials: true,
  headers: {
    'Acces-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
})

fetcher.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response.use(function (response) {
  if (response.data.code === 89001 || response.data.code === 81001) {
    location.href = '/login'
  }
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default fetcher.post
