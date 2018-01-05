import React from 'react'
import PropTypes from 'prop-types'
import HeadTag from 'react-head'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Account from 'material-ui-icons/AccountBox'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import List, {
  ListItem,
  ListItemAvatar,
  // ListItemIcon,
  ListItemText,
} from 'material-ui/List'
import { getUserInfo } from '../../store/redux'
import dateFormat from '../../util/date'

const styles = (theme) => {
  const style = {
    avatar: {
      width: 100,
      height: 100,
    },
    userinfo: {
      paddingTop: 80,
      paddingBottom: 30,
      paddingLeft: 24,
      paddingRight: 24,
    },
    avatarWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 30,
      // marginTop: 80,
    },
    paper: {
      padding: 0,
      textAlign: 'center',
    },
    itemHeader: {
      padding: '8px 0',
      backgroundColor: theme.palette.secondary[400],
      color: '#ffffff',
    },
    listEmpty: {
      padding: '10px 0',
      color: 'rgba(0, 0, 0, .7)',
    },
  }
  return style
}

const UserListItem = ({ reply }) => (
  <ListItem button>
    <ListItemAvatar>
      <Avatar src={reply.author.avatar_url} alt="头像" />
    </ListItemAvatar>
    <ListItemText
      primary={<span>{reply.title}</span>}
      secondary={<span>最后回复: { dateFormat(reply.last_reply_at) }</span>}
    />
  </ListItem>
)

class User extends React.Component {
  componentDidMount() {
    // some
    if (this.props.user && this.props.user.loginname) {
      this.props.getUserInfo(this.props.user.loginname)
    }
  }
/* eslint-disable */
  generateRecentRepliesList = (replies) => {
    return replies.map((reply) => (
        <UserListItem reply={reply} key={reply.id} />
    ))
  }

  render() {
    const { classes, user } = this.props

    return (
      <div className={classes.userinfo}>
        <div>
          <HeadTag tag="title">User</HeadTag>
          <HeadTag tag="meta" name="example" content="whatever" />
        </div>
        <section className={classes.avatarWrapper}>
          {
            user && user.avatar_url ?
              <Avatar alt="avatar" src={user.avatar_url} className={classes.avatar} />
            :
              <Avatar className={classes.avatar}>
                <Account style={{ width: 80, height: 80 }} />
              </Avatar>
          }
        </section>
        <section>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <div className={classes.itemHeader}>
                  最近浏览
                </div>
                {
                  this.props.user && this.props.user.recent_topics && this.props.user.recent_topics.length?
                    <div>有</div> :
                    <div className={classes.listEmpty}>您还没有浏览记录哟</div>
                }
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <div className={classes.itemHeader}>
                  最近回复
                </div>
                {
                  this.props.user && this.props.user.recent_replies && this.props.user.recent_replies.length ?
                    (
                      <List>
                        {
                          this.generateRecentRepliesList(this.props.user.recent_replies)
                        }
                      </List>
                    )
                    :
                      <div className={classes.listEmpty}>您还没有任何回复历史哟</div>
                }
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <div className={classes.itemHeader}>
                  我的收藏
                </div>
              </Paper>
            </Grid>
          </Grid>
        </section>
      </div>
    )
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
}

UserListItem.propTypes = {
  reply: PropTypes.any.isRequired,
  // onClickListItem: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
  state => state,
  { getUserInfo },
)(User))
