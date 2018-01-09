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
        // 存储session信息
        // The middleware will automatically add a Set-Cookie header to the response
        // if the contents of req.session were altered.
        // Note that no Set-Cookie header will be in the response
        // (and thus no session created for a specific user) unless there are contents in the session,
        // so be sure to add something to req.
        // session as soon as you have identifying information to store for the session.
        req.session.user = {
          success: true,
          loginname: resp.data.loginname,
          avatar_url: resp.data.avatar_url,
          id: resp.data.id
          // accessToken: req.body.accessToken
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
