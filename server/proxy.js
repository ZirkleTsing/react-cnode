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
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
