import React from 'react'
// import List from 'material-ui/List'
import TopicListItem from './list-item'
/* eslint-disable */
class TopicList extends React.Component {
  state = {
    topic: {
      tab: '置顶',
      title: '2017，我们来聊聊 Node.js',
      comment_count: '23',
      read_count: '217',
    }
  }

  render() {
    return (
      <div>
        <TopicListItem topic={this.state.topic} />
        <TopicListItem topic={this.state.topic} />
        <TopicListItem topic={this.state.topic} />
        <TopicListItem topic={this.state.topic} />
      </div>
    )
  }
}

export default TopicList
/* eslint-enable */
