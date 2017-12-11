const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const serverDevRender = require('./util/server-development')
const serverRender = require('./util/server-render').serverRender

// 业务依赖
const bodyParser = require('body-parser') // https://www.npmjs.com/package/body-parser
const cookieSession = require('cookie-session') // https://www.npmjs.com/package/cookie-session

const isDev = process.env.NODE_ENV === 'development'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  // type: 'application/x-www-form-urlencoded',
  extended: false
}))
app.use(cookieSession({
  name: 'user-token',
  secret: 'ZirkleTsing^&*(%$#Secret_key!##@!@!',
  maxAge: 10 * 60 * 1000,
  resave: false,
  saveUninitialized: false
}))

app.use('/api/user', require('./login'))

app.use(favicon(path.join(path.join(__dirname, '../favicon.ico'))))

if(!isDev) {
  app.use( '/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    const serverEntry = require('../dist/server-entry').ServerSideRender
    let template = fs.readFileSync(path.join(__dirname, '../dist/index.server.html'), 'utf-8')
    serverRender(serverEntry, template, req, res)
  })
} else {
  serverDevRender(app)
}


app.listen(3333, ()=> {
  console.log('server listening on 3333')
})
