import React from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import TopicList from '../topic-list/index'
import { tabs } from '../../util/utils'

const TabContainer = ({ children }) => (
  <Typography>
    {children}
  </Typography>
)

class TopicTabs extends React.Component {
  state = {
    tabIndex: 'all',
  }

  componentDidMount() {
    const { history } = this.props
    history.push('dashboard?tab=all')
  }

  onTopicIndexChange = (event, value) => {
    const { history } = this.props
    // console.log(value) // eslint-disable-line
    history.push(`dashboard?tab=${value}`)
    this.setState({
      tabIndex: value,
    })
  }

  render() {
    console.log(`TopicTabs:`, this.props) // eslint-disable-line
    console.log('state:', this.state.tabIndex) // eslint-disable-line
    return (
      <div>
        <Tabs
          value={this.state.tabIndex}
          onChange={this.onTopicIndexChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          {
            Object.keys(tabs).map(key => (
              <Tab key={key} label={tabs[key]} value={key} />
            ))
          }
        </Tabs>
        <TopicList />
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

TopicTabs.propTypes = {
  history: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
}

export default TopicTabs
