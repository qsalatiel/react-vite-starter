import axios, { AxiosInstance } from 'axios'

export const getRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_GET_URL,
})

export const postRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_POST_URL,
})

getRequest.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

postRequest.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
