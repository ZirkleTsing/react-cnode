import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import { withStyles } from 'material-ui/styles'

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
}

class MainAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  /* eslint-disable */
  onHomeIconClick = () => {
  }

  createButtonClick = () => {

  }

  loginButtonClick = () => {

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
            <Button raised color="accent" onClick={this.createButtonClick} className={classes.buttonMargin}>
              新建话题
            </Button>
            <Button raised color="accent" onClick={this.loginButtonClick}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </section>
    )
  }
}

export default withStyles(styles)(MainAppBar)
