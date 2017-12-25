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
  // state = {
  //   topic: {
  //     tab: '置顶',
  //     title: '2017，我们来聊聊 Node.js',
  //     comment_count: '23',
  //     read_count: '215',
  //     author: 'heisenberg',
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    const { search } = this.props.location
    if (search !== nextProps.location.search) {
      const query = queryString.parse(location.search) || {tab: 'all'}
      this.props.getTopicList(query.tab ? query.tab : 'all')
    }
  }
  // componentWillMount() {
  //   // console.log('生命周期')
  //   this.props.getTopicList()
  // }

  componentDidMount() {
    const { location } = this.props
    const query = queryString.parse(location.search) || {tab: 'all'}
    this.props.getTopicList(query.tab)
  }

  onClickListItem = (ele) => () => {
    // 跳转至detail
    this.props.getTopicDetail(ele)
    this.props.history.push(`/detail/${ele.id}`)
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
}

export default withRouter(
  connect(
    state => state,
    { getTopicList, getTopicDetail }
  )(TopicList)
)
/* eslint-enable */
