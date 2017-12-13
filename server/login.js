const Router = require('express').Router
const axios = require('axios')
const BASE_URL = require('./config').baseUrl

const router = Router()

router.post('/login', (req, res, next) => {
  axios.post(`${BASE_URL}/accesstoken`, {
    accesstoken: req.body.accessToken
    // accesstoken: 'b132e78f-2192-47eb-8f6e-e99f68473a48'
  })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          loginName: resp.data.loginname,
          avatarUrl: resp.data.avatar_url,
          id: resp.data.id,
          accessToken: req.body.accessToken
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      //  response:{data: { success: false, error_msg: '错误的accessToken' }}}
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        next(err)
      }
    })
})

module.exports = router
