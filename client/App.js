import React, { Component } from 'react'
import AppBar from './views/layout/app-bar'
import Container from './views/layout/container'
import TopicTabs from './views/topic-tabs/topic-tabs'
// import { Link } from 'react-router-dom'
// import Router from './router/router'

export default class App extends Component {
  componentDidMount() {
    // some
  }

  render() {
    return (
      <section>
        <AppBar />
        <Container>
          <TopicTabs />
        </Container>
      </section>
    )
  }
}
