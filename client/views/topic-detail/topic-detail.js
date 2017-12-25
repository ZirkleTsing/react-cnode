import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import marked from 'marked'
import dateFormat from 'dateformat'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { getTopicDetailAsync } from '../../store/redux'
import styles from './styles'

/* eslint-disable */
class TopicDetail extends React.Component {
  componentDidMount() {
    this.props.getTopicDetailAsync(this.props.match.params.id)
  }

  render() {
    console.log('detail', this.props)
    const { detail, classes } = this.props
    return (
      <div>
        {
        detail.content
        ?
          (
            <div>
              <div className={classes.header}>
                <div className={classes.title}><span className={classes.tab}>{detail.top ? '置顶' : null}</span>{detail.title}</div>
                <div className={classes.extra}>
                  <span className={classes.blank}>发布于{dateFormat(detail.create_at, "yyyy-mm-dd")}</span>
                  <span className={classes.blank}>作者 {detail.author.loginname}</span>
                  <span className={classes.blank}>{detail.visit_count}次浏览</span>
                </div>
              </div>
              <div className={classes.content} dangerouslySetInnerHTML={{__html: marked(detail.content)}}></div>
              {
              detail.replies
                ?
                  <div className={classes.replies}>
                    <div className="repliesbar">{detail.replies.length} 回复</div>
                    <List>
                      {
                        detail.replies.map((reply) => (
                          <ListItem key={reply.create_at} button>
                            <ListItemAvatar>
                              <Avatar className={classes.avatar} src={reply.author.avatar_url} alt="头像" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={<p style={{ margin: 7 }}><span>{reply.author.loginname}</span></p>}
                              secondary={<span dangerouslySetInnerHTML={{__html: reply.content }}></span>}
                            />
                          </ListItem>
                        ))
                      }
                    </List>
                  </div>
                :
                  null
              }
            </div>
          )
        :
          null
        }
      </div>
    )
  }
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  // getTopicDetail: PropTypes.func.isRequired,
}

// export default TopicDetail

export default withStyles(styles)(
  connect(
    state => state,
    { getTopicDetailAsync }
  )(TopicDetail)
)
/* eslint-enable */
