import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable */
export default class TopicDetail extends React.Component {
  render() {
    console.log('detail', this.props)
    return (
      <div>
        topic detail, id: {this.props.match.params.id}
      </div>
    )
  }
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired
}
/* eslint-enable */
