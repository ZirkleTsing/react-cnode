import React from 'react'
import { connect } from 'react-redux'
import HeadTag from 'react-head'
import Button from 'material-ui/Button'

/* eslint-disable */
class Dashboard extends React.Component {
  componentDidMount() {
    // some
    console.log(this.props)
  }

  render() {
    return (
      <section>
        <HeadTag tag="title">Dashboard</HeadTag>
        <HeadTag tag="meta" name="example" content="whatever" />
        <div>dashboard view{this.props.count}</div>
        <Button raised color="primary">
          Primary
        </Button>
      </section>
    )
  }
}

export default connect(
  state => state,
  null,
)(Dashboard)
/* eslint-enable */
