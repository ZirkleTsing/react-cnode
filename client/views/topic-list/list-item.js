import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import {
  ListItem,
  ListItemAvatar,
  // ListItemIcon,
  ListItemText,
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
// import HomeIcon from 'material-ui-icons/Avatar'
import styles from './styles'
import { tabs } from '../../util/utils'

/* eslint-disable */
const Primary = ({ topic, classes }) => {
  const cx = classNames({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <span className={classes.primaryWrapper}>
      <span className={cx}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span>{topic.title}</span>
    </span>
  )
}

const Secondary = ({ topic, classes }) => (
  <span className={classes.secondaryWrapper}>
    <span className={classes.author}>{ topic.author.loginname }</span>
    <span className={classes.comment}>{ topic.reply_count }</span>
    <span>/</span>
    <span className={classes.read}>{ topic.visit_count }</span>
  </span>
)

const StyledPrimary = withStyles(styles)(Primary)
const StyledSecondary = withStyles(styles)(Secondary)

const TopicListItem = ({ topic, onClickListItem }) => (
  <ListItem onClick={onClickListItem} button>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} alt="头像" />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

Primary.propTypes = {
  topic: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
}

Secondary.propTypes = {
  topic: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
}

TopicListItem.propTypes = {
  topic: PropTypes.any.isRequired,
  onClickListItem: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicListItem)
/* eslint-enable */
