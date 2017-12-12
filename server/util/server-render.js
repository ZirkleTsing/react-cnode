const ReactSSR = require('react-dom/server')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const createStore = require('redux').createStore
const SheetsRegistry = require('react-jss/lib/jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('material-ui/styles').createMuiTheme
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default
const color = require('material-ui/colors')
const reducer = require('../../client/store/redux').reducer
const add = require('../../client/store/redux').add

function serverRender(bundle, template, req, res) {
  const path = req.path
  const serverContext = {}
  const headTags = [] // usage: https://github.com/tizmagik/react-head
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry()
  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: color.blue, // Purple and green play nicely together.
    },
  })
  // Configure JSS
  const jss = create(preset())
  jss.options.createGenerateClassName = createGenerateClassName
  const store = createStore(reducer)
  // console.log('store:', store.getState())
  const HtmlTemplate = template // template
  store.dispatch(add())
  // console.log('after dispatch:', store.getState())
  const ssrApp = bundle(path, serverContext, store, headTags, sheetsRegistry, jss, theme)
  // 这里进行异步state操作
  // TODO
  const renderString = ReactSSR.renderToString(ssrApp)
  if (serverContext.url) {
    // res.redirect(301, 'http://example.com')
    // http://expressjs.jser.us/3x_zh-cn/api.html#res.redirect
    // res.writeHead(301, {
    //   Location: serverContext.url
    // })
    res.redirect(301, serverContext.url)
    res.end()
    return
  } else {
    // console.log(template)
    // <%- Outputs the unescaped value into the template
    // <%% Outputs a literal '<%'
    // %%> Outputs a literal '%>'// Grab the CSS from our sheetsRegistry.
    const html = ejs.render(template, {
      content: renderString,
      initialState: serialize(store.getState()),
      tags: ReactSSR.renderToString(headTags),
      style: sheetsRegistry.toString()
    })
    res.send(html)
  }
}

module.exports = {
  serverRender
}
