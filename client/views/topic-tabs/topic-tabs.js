import React from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'

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
        { topicIndex === 0 && <TabContainer>全部</TabContainer> }
        { topicIndex === 1 && <TabContainer>精华</TabContainer> }
        { topicIndex === 2 && <TabContainer>分享</TabContainer> }
        { topicIndex === 3 && <TabContainer>问答</TabContainer> }
        { topicIndex === 4 && <TabContainer>招聘</TabContainer> }
        { topicIndex === 5 && <TabContainer>客户端测试</TabContainer> }
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
