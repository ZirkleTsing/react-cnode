import React from 'react'
// import { connect } from 'react-redux'
// import AppBar from '../layout/app-bar'
// import Container from '../layout/container'

/* eslint-disable */
class Dashboard extends React.Component {
  componentDidMount() {
    // some
    console.log(this.props)
  }

  render() {
    return (
      <section>
        Dashboard
        {/* <AppBar /> */}
        {/* <Container>
          hello
        </Container> */}
      </section>
    )
  }
}

export default Dashboard

// export default connect(
//   state => state,
//   null,
// )(Dashboard)
/* eslint-enable */
