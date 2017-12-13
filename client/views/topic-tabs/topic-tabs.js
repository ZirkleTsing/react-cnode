import React from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import TopicList from '../topic-list/index'

const TabContainer = ({ children }) => (
  <Typography>
    {children}
  </Typography>
)

class TopicTabs extends React.Component {
  state = {
    topicIndex: 0,
  }

  onTopicIndexChange = (event, value) => {
    this.setState({
      topicIndex: value,
    })
  }

  render() {
    const { topicIndex } = this.state
    return (
      <div>
        <Tabs
          value={topicIndex}
          onChange={this.onTopicIndexChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="全部" />
          <Tab label="精华" />
          <Tab label="分享" />
          <Tab label="问答" />
          <Tab label="招聘" />
          <Tab label="客户端测试" />
        </Tabs>
        { topicIndex === 0 && <TopicList /> }
        { topicIndex === 1 && <TopicList /> }
        { topicIndex === 2 && <TopicList /> }
        { topicIndex === 3 && <TopicList /> }
        { topicIndex === 4 && <TopicList /> }
        { topicIndex === 5 && <TopicList /> }
      </div>
    )
  }
}

TabContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
}

export default TopicTabs
