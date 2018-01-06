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
import { getUserInfo, getUserCollection } from '../../store/redux'
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
    itemTitle: {
    },
    listItemText: {
    },
  }
  return style
}

const UserListItem = ({ reply, classes, onClickListItem }) => (
  <ListItem onClick={onClickListItem(reply.id)} button>
    <ListItemAvatar>
      <Avatar src={reply.author.avatar_url} alt="头像" />
    </ListItemAvatar>
    <ListItemText
      primary={<span className={classes.itemTitle} >{reply.title}</span>}
      secondary={<span>最后回复: { dateFormat(reply.last_reply_at) }</span>}
    />
  </ListItem>
)

const UserCollectionItem = ({ collect, classes, onClickListItem }) => (
  <ListItem onClick={onClickListItem(collect.id)} button>
    <ListItemAvatar>
      <Avatar src={collect.author.avatar_url} alt="头像" />
    </ListItemAvatar>
    <ListItemText
      primary={<span className={classes.itemTitle} >{collect.title}</span>}
      secondary={
        <span>最后回复: { collect.author.loginname } - { dateFormat(collect.last_reply_at) }</span>
      }
      classes={{ root: classes.listItemText, text: classes.listItemPrimary }}
    />
  </ListItem>
)

const StyledUserListItem = withStyles(styles)(UserListItem)
const StyledUserCollectionItem = withStyles(styles)(UserCollectionItem)

class User extends React.Component {
  componentDidMount() {
    if (this.props.user && this.props.user.loginname) {
      this.props.getUserInfo(this.props.user.loginname)
      this.props.getUserCollection(this.props.user.loginname)
    }
  }
  /* eslint-disable */
  onClickListItem = (id) => () => {
    this.props.history.push(`/topic/${id}`)
  }
  /* eslint-enable */

  generateRecentRepliesList = (replies, onClickListItem) => {
    return replies.map((reply) => {
      return (
        <StyledUserListItem
          reply={reply}
          key={reply.id}
          onClickListItem={onClickListItem}
        />
      )
    })
  }

  generateRecentCollectionsList = (collections, onClickListItem) => {
    return collections.map((collect) => {
      return (<StyledUserCollectionItem
        collect={collect}
        key={collect.id}
        onClickListItem={onClickListItem}
      />
      )
    })
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
                  this.props.user &&
                  this.props.user.recent_topics &&
                  this.props.user.recent_topics.length ?
                    (
                      <List>
                        {
                          this.generateRecentRepliesList(
                            this.props.user.recent_topics,
                            this.onClickListItem,
                          )
                        }
                      </List>
                    ) :
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
                  this.props.user &&
                  this.props.user.recent_replies &&
                  this.props.user.recent_replies.length ?
                    (
                      <List>
                        {
                          this.generateRecentRepliesList(
                            this.props.user.recent_replies,
                            this.onClickListItem,
                          )
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
                {
                  this.props.collect &&
                  this.props.collect.length ?
                    (
                      <List>
                        {
                          this.generateRecentCollectionsList(
                            this.props.collect,
                            this.onClickListItem,
                            )
                        }
                      </List>
                    )
                    :
                      <div className={classes.listEmpty}>您还没有任何回复历史哟</div>
                }
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
  getUserCollection: PropTypes.func.isRequired,
  collect: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
}

UserListItem.propTypes = {
  reply: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  onClickListItem: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
}

UserCollectionItem.propTypes = {
  collect: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onClickListItem: PropTypes.func.isRequired,
}

export default withStyles(styles)(connect(
  state => state,
  { getUserInfo, getUserCollection },
)(User))
