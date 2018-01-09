import React from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TopicList from '../topic-list/index'
import { tabs } from '../../util/utils'
import { changeTopicIndex } from '../../store/redux'


const TabContainer = ({ children }) => (
  <Typography>
    {children}
  </Typography>
)

class TopicTabs extends React.Component {
  // state = {
  //   tabIndex: 'all',
  //   // open: true,
  // }

  componentWillMount() {
    // const { history } = this.props
    // const { search, pathname } = this.props.location
    // const { history } = this.props
    // console.log(this.props.location) // eslint-disable-line
    // console.log(`pathname:${pathname}, search:${search}`) // eslint-disable-line
    // if (pathname === '/dashboard' && search === '') {
    //   console.log('需要在服务端 redirect，在客户端看不到此条信息') // eslint-disable-line
    //   history.push(`${pathname}?tab=all`)
    // }
    if (typeof window !== 'undefined') {
      const { search } = this.props.location
      const query = queryString.parse(search)
      console.log(query) // eslint-disable-line
      // this.setState({
      //   tabIndex: query.tab,
      // })
      this.props.changeTopicIndex(query.tab)
    }
  }

  componentDidMount() {

  }

  onTopicIndexChange = (event, value) => {
    const { history } = this.props
    // console.log(value) // eslint-disable-line
    history.push(`dashboard?tab=${value}`)
    // this.setState({
    //   tabIndex: value,
    // })
    this.props.changeTopicIndex(value)
  }

  render() {
    // console.log(`TopicTabs:`, this.props) // eslint-disable-line
    // console.log('state:', this.state.tabIndex) // eslint-disable-line
    return (
      <div>
        <Tabs
          value={this.props.topicIndex}
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
        <TopicList tab={this.props.topicIndex} />
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
  location: PropTypes.object.isRequired,
  topicIndex: PropTypes.string.isRequired,
  changeTopicIndex: PropTypes.func.isRequired,
}

export default connect(
  state => state,
  { changeTopicIndex },
)(TopicTabs)
