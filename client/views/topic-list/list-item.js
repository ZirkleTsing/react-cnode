import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {
  ListItem,
  ListItemAvatar,
  // ListItemIcon,
  ListItemText,
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import HomeIcon from 'material-ui-icons/Home'
import styles from './styles'

const Primary = ({ topic, classes }) => (
  <span className={classes.primaryWrapper}>
    <span className={classes.tab}>{topic.tab}</span>
    <span>{topic.title}</span>
  </span>
)

const Secondary = ({ topic, classes }) => (
  <span className={classes.secondaryWrapper}>
    <span className={classes.author}>{ topic.author }</span>
    <span className={classes.comment}>{ topic.comment_count }</span>
    <span>/</span>
    <span className={classes.read}>{ topic.read_count }</span>
  </span>
)

const StyledPrimary = withStyles(styles)(Primary)
const StyledSecondary = withStyles(styles)(Secondary)

const TopicListItem = ({ topic }) => (
  <ListItem button>
    <ListItemAvatar>
      <Avatar>
        <HomeIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicListItem)

