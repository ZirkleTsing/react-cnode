const axios = require('axios')
const querystring = require('query-string')
const BASE_URL = require('./config').baseUrl

module.exports = (req, res, next) => {
  const path = req.path
  const user = req.session.user || {} // 从session中取
  const needAccessToken = req.query.needAccessToken
  if (needAccessToken && !user.accessToken) { // 需要并且session中没有accessToken
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete user.needAccessToken // 代理后不需要needAccessToken字段

  axios(`${BASE_URL}${path}`, {
    method: req.method,
    params: query,
    // https://github.com/axios/axios
    // By default, axios serializes JavaScript objects to JSON.
    // To send data in the application/x-www-form-urlencoded format instead,
    // you can use one of the following options.
    // In a browser, you can use the URLSearchParams API or  using the qs library
    // In node.js, you can use the querystring module, instead, you can also use the qs library.
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 1 * 10 * 1000
  })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        res.send(resp.data)
      } else {
        res.status(resp.status).send(resp.data)
      }
    })
    .catch(err => {
      if(err.response) {
        res.status(500).send(err.response.data)
      } else {
        res.status(500).send({
          success: false,
          msg: '未知错误'
        })
      }
    })
}
