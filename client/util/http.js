const axios = require('axios')

/**
 * 如果是client端启动,就把 ''作为前缀，通过devServer代理,
 * 如果是server端启动(3333端口),就把 http://127.0.0.1:3333
 * (这个前缀后期可以和devServer一块改为另一个端口,后端无跨域问题)
 */
const baseUrl = process.env.API_BASE || '' // http://127.0.0.1:3333 || ''

/**
 * url: 相对路径 例如: /api/topics
 * params: query字符串 例如: /api/topics?name='chang'&age=12
 */
const parseUrl = (url, params) => {
  params = params || {} // eslint-disable-line
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`  // eslint-disable-line
    return result // name='chang'&property='shuaiB'&
  }, '')
  return `${baseUrl}${url}?${str.substr(0, str.length - 1)}`
}

/**
 * 前后端同构
 * 由于dev:client请求都是经过server端3333端口代理转发至cnode API的,
 * 所以在webpack dev:client环境中需要把baseUrl置为127.0.0.1:3333,
 * 而server端服务端渲染时候获取数据需要直接请求相对路径,例如 /api/topics
 * server端会将以 /api为前缀的请求进行转发,
 * app.use('/api', require('./proxy')),
 * app.use('/api/user', require('./login'))
*/
const get = (url, params) => (
  new Promise((resolve, reject) => {
    console.log('请求') // eslint-disable-line
    axios.get(parseUrl(url, params))
      .then((resp) => {
        const { data } = resp
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
)

/**
 * url: 相对路径 例如: /api/topics
 * params: query字符串 例如: /api/topics?name='chang'&age=12
 * postdata: post请求的body 例如: axios(path, obj)中的obj 参考 https://github.com/axios/axios
 */
const post = (url, params, postdata) => (
  new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params, postdata))
      .then((resp) => {
        const { data } = resp
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
)

module.exports = {
  get,
  post,
}

