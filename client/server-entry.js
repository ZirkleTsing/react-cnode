import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HeadCollector } from 'react-head'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider } from 'material-ui/styles'
import App from './App'

export default <App />

export const ServerSideRender = (location, context, store, headTags, sheetsRegistry, jss, theme) => ( // eslint-disable-line
  <Provider store={store}>
    <StaticRouter location={location} context={context}>
      <HeadCollector headTags={headTags}>
        <JssProvider registry={sheetsRegistry} jss={jss}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </HeadCollector>
    </StaticRouter>
  </Provider>
)

