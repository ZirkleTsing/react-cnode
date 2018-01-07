import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import { withStyles } from 'material-ui/styles'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { postLogin, loginModal } from '../../store/redux'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  buttonMargin: {
    marginRight: 10,
  },
  dialog: {
    width: 400,
    maxWidth: 800,
  },
  username: {
    padding: '6px 4px',

    '&:hover': {
      cursor: 'pointer',
    },
  },
}

class MainAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  // constructor(props) {
  //   super(props)
  //   // this.closeModal = this.closeModal.bind(this)
  // }

  state = {
    // open: false,
    token: '',
  }

  onClickUserInfo = () => {
    this.props.history.push('/user/info')
  }

  /* eslint-disable */
  onHomeIconClick = () => {
  }

  createButtonClick = () => {

  }

  loginButtonClick = () => {
    this.props.loginModal(true)
  }

  closeModal = () => {
    this.props.loginModal(false)
  }

  register = () => {
    this.props.postLogin(this.state.token)
    this.props.loginModal(false)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
    console.log(event.target.value)
  }

  /* eslint-enable */
  render() {
    const { classes } = this.props
    return (
      <section className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton color="contrast" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              CNode
            </Typography>
            <Button
              raised
              color="accent"
              onClick={this.createButtonClick}
              className={classes.buttonMargin}
            >
              新建话题
            </Button>
            {
                this.props.user && this.props.user.loginname ?
                  (
                    <span
                      className={classes.username}
                      onClick={this.onClickUserInfo}
                    >
                      {this.props.user.loginname}
                    </span>
                  )
                :
                  (
                    <Button raised color="accent" onClick={this.loginButtonClick}>
                      登录
                    </Button>
                  )
              }

          </Toolbar>
        </AppBar>
        <Dialog
          open={this.props.loginOpen}
          onClose={this.closeModal}
          aria-labelledby="form-dialog-title"
          classes={{ paperWidthSm: classes.dialog }}
        >
          <DialogTitle id="form-dialog-title">登录</DialogTitle>
          <DialogContent>
            <DialogContentText>
              user token
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="token"
              label="输入用户token"
              type="text"
              fullWidth
              value={this.state.token}
              onChange={this.handleChange('token')}
              className={classes.textField}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              取消
            </Button>
            <Button onClick={this.register} color="primary">
              登录
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    )
  }
}

MainAppBar.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  postLogin: PropTypes.func.isRequired,
  loginModal: PropTypes.func.isRequired,
  loginOpen: PropTypes.bool.isRequired,
}

/* eslint-disable */
export default withRouter(withStyles(styles)(
  connect(
    state => state,
    { postLogin, loginModal },
  )(MainAppBar),
))
/* eslint-enable */
