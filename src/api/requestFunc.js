/*
封装 axios 的get 和post 请求
* */
import request from '../../http'

const GET = (url, data) => request.get(url, {
  params: data
})
const POST = (url, data) => request.post(url, data)

export  {
  GET, POST
}
