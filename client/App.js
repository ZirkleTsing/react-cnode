import React, { Component } from 'react'
import AppBar from './views/layout/app-bar'
import Container from './views/layout/container'
// import { Link } from 'react-router-dom'
import Router from './router/router'

export default class App extends Component {
  componentDidMount() {
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
  }

  render() {
    return (
      <section>
        <AppBar />
        <Container>
          <Router />
        </Container>
      </section>
    )
  }
}
