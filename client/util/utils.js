import React from 'react'
import App from '../App'

// const wrapComponent = (Component) => {
//   class WrapperApp extends React.Component {
//     // Remove the server-side injected CSS.
//     componentDidMount() {
//       const jssStyles = document.getElementById('jss-server-side');
//       if (jssStyles && jssStyles.parentNode) {
//         jssStyles.parentNode.removeChild(jssStyles);
//       }
//     }

//     render() {
//       return <Component />
//     }
//   }
//   return WrapperApp
// }

export const tabs = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
}

class WrapComponent extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />
  }
}

export default WrapComponent
