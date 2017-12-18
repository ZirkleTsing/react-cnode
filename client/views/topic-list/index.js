import React from 'react'
import { connect } from 'react-redux'
import List from 'material-ui/List'
import TopicListItem from './list-item'
import { getTopicList } from '../../store/redux'
/* eslint-disable */
class TopicList extends React.Component {
  state = {
    topic: {
      tab: '置顶',
      title: '2017，我们来聊聊 Node.js',
      comment_count: '23',
      read_count: '215',
      author: 'heisenberg',
    }
  }

  componentWillMount() {
    console.log('生命周期')
    this.props.getTopicList()
  }

  componentDidMount() {
    this.props.getTopicList()
  }

  render() {
    const topic = this.props.list
    return (
      <div>
        <List>
          {
            topic.map((ele, index) => (
              <TopicListItem
                key={ele.create_at}
                topic={ele} />
            ))
          }
        </List>
      </div>
    )
  }
}

export default connect(
  state => state,
  { getTopicList }
)(TopicList)
/* eslint-enable */
