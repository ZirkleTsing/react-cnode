import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import List from 'material-ui/List'
import TopicListItem from './list-item'
import { getTopicList, getTopicDetail } from '../../store/redux'
/* eslint-disable */
class TopicList extends React.Component {
  asyncBootstrap = () => {
    return new Promise((resolve, reject) => {
      const { search } = this.props.location
      console.log('search:', search)
      const query = queryString.parse(search).tab || {tab: 'all'}
      console.log('query:', query)
      this.props.getTopicList(query ? query  : 'all')
        .then(() => {
          resolve(true)
        })
    })
  }

  componentWillReceiveProps(nextProps) {
    const { search } = this.props.location
    if (search !== nextProps.location.search) {
      const query = queryString.parse(location.search).tab || {tab: 'all'}
      this.props.getTopicList(query ? query : 'all')
    }
  }

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getTopicList(this.props.tab)
    }
  }

  onClickListItem = (ele) => () => {
    // 跳转至detail
    this.props.getTopicDetail(ele)
    this.props.history.push(`/topic/${ele.id}`)
  }

  render() {
    // console.log(this.props)
    const topic = this.props.list
    return (
      <div>
        <List>
          {
            topic.map((ele, index) => (
              <TopicListItem
                key={ele.create_at}
                topic={ele}
                onClickListItem={this.onClickListItem(ele)}
              />
            ))
          }
        </List>
      </div>
    )
  }
}

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getTopicDetail: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
}

export default withRouter(
  connect(
    state => state,
    { getTopicList, getTopicDetail }
  )(TopicList)
)
/* eslint-enable */
