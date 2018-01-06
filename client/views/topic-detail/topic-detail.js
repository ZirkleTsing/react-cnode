import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SimpleMDE from 'react-simplemde-editor'
import marked from 'marked'
import dateFormat from 'dateformat'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import { getTopicDetailAsync, postComment } from '../../store/redux'
import styles from './styles'

/* eslint-disable */
class TopicDetail extends React.Component {
  state = {
    textValue: ''
  }

  componentDidMount() {
    this.props.getTopicDetailAsync(this.props.match.params.id)
  }

  handleTextValueChange = (textValue) => {
    console.log(textValue)
    this.setState({
      textValue
    })
  }

  handleClickComment = () => {
    if (!this.state.textValue.trim().length) {
      console.log('空的评论非法')
      return
    }
    this.props.postComment(this.props.detail.id, this.state.textValue)
  }

  render() {
    const { detail, classes } = this.props
    return (
      <div>
        {
        detail.content
        ?
          (
            <section>
              <section className={classes.header}>
                {
                  detail.top
                    ?
                      <div className={classes.title}><span className={classes.tab}>置顶</span>{detail.title}</div>
                    :
                      <div className={classes.title}>{detail.title}</div>
                }
                <div className={classes.extra}>
                  <span className={classes.blank}>发布于{dateFormat(detail.create_at, "yyyy-mm-dd")}</span>
                  <span className={classes.blank}>作者 {detail.author.loginname}</span>
                  <span className={classes.blank}>{detail.visit_count}次浏览</span>
                </div>
              </section>
              <section className={classes.content} dangerouslySetInnerHTML={{__html: marked(detail.content)}}></section>
              {
                this.props.user && this.props.user.loginname ?
                  (
                    <section className={classes.editor}>
                      <div className="repliesbar">添加回复</div>
                      <SimpleMDE
                        value={this.state.textValue}
                        onChange={this.handleTextValueChange}
                        options={{
                          spellChecker: false,
                        }}
                      />
                      <Button
                        onClick={this.handleClickComment}
                        className="commentButton"
                        raised
                        color="accent"
                        disabled={!this.state.textValue.trim().length}
                      >
                          { this.state.textValue.trim().length ? '输入回复信息' : '点击回复'}
                      </Button>
                    </section>
                  ) :
                  (
                    <section className={classes.needLogin}>
                      <Button className="loginButton" raised color="accent">登录并回复</Button>
                    </section>
                  )
              }

              {
              detail.replies
                ?
                  <section className={classes.replies}>
                    <div className="repliesbar">{detail.replies.length} 回复</div>
                    <List className="list">
                      {
                        detail.replies.map((reply) => (
                          <ListItem key={reply.create_at} button>
                            <ListItemAvatar>
                              <Avatar className={classes.avatar} src={reply.author.avatar_url} alt="头像" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={<p style={{ marginBottom: 7, marginTop: 7 }}><span>{reply.author.loginname}</span></p>}
                              secondary={<span dangerouslySetInnerHTML={{__html: reply.content }}></span>}
                            />
                          </ListItem>
                        ))
                      }
                    </List>
                  </section>
                :
                  null
              }
            </section>
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
  user: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  // getTopicDetail: PropTypes.func.isRequired,
}

// export default TopicDetail

export default withStyles(styles)(
  connect(
    state => state,
    { getTopicDetailAsync, postComment }
  )(TopicDetail)
)
/* eslint-enable */
