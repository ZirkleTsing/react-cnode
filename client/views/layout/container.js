import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    marginTop: 75,
    marginRight: 10,
    marginBottom: 30,
    marginLeft: 10,
  },
}

const Container = ({ children, classes }) => (
  <Paper elevation={4} className={classes.root}>
    {children}
  </Paper>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
}

export default withStyles(styles)(Container)
