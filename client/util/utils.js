import React from 'react'

const wrapComponent = (Component) => {
  class WrapperApp extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <Component />
    }
  }
  return WrapperApp
}

export default wrapComponent
