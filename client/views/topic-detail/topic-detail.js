import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import marked from 'marked'

/* eslint-disable */
class TopicDetail extends React.Component {
  // componentDidMount() {
  //   this.props.getTopicDetail(this.props.)
  // }

  render() {
    console.log('detail', this.props)
    return (
      <div>
        {/* topic detail, id: {this.props.match.params.id} */}
        <div dangerouslySetInnerHTML={{__html: marked(this.props.detail.content)}}></div>
      </div>
    )
  }
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  // getTopicDetail: PropTypes.func.isRequired,
}

// export default TopicDetail

export default connect(
  state => state,
  null
)(TopicDetail)
/* eslint-enable */
