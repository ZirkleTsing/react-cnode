import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import Dashboard from '../views/dashboard/dashboard'
// import User from '../views/user/user'
import TopicTabs from '../views/topic-tabs/topic-tabs'
import TopicDetail from '../views/topic-detail/topic-detail'

export default class MyRoute extends React.Component {
  render() {
    return [
      <Route path="/" exact render={() => <Redirect to="/dashboard" />} key="root" />,
      <Route path="/dashboard" exact component={TopicTabs} key="dashboard" />,
      <Route path="/topic/:id" exact component={TopicDetail} key="detail" />,
    ]
  }
}
