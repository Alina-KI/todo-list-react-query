import axios from 'axios'

const API_PATH = 'https://todolistreactquery-default-rtdb.firebaseio.com/'

export const api = axios.create({
  baseURL: API_PATH
})

api.interceptors.request.use((config) => {
  return config
})

export const EMPTY_LIST = []