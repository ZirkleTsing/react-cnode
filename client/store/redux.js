// import { get } from '../util/http' // eslint-disable-line
const { get, post } = require('../util/http')

const LOGIN = 'LOGIN'
const GET_TOPIC_LIST = 'GET_TOPIC_LIST'
const GET_TOPIC_DETAIL = 'GET_TOPIC_DETAIL'
const GET_USER_INFO = 'GET_USER_INFO'
const GET_USER_COLLECTION = 'GET_USER_COLLECTION'
const LOGIN_MODAL = 'LOGIN_MODAL'

const initialState = {
  count: 1,
  list: [],
  detail: {},
  user: {},
  collect: [],
  loginOpen: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, user: action.payload }
    }
    case LOGIN_MODAL: {
      return { ...state, loginOpen: action.payload }
    }
    case GET_TOPIC_LIST: {
      return { ...state, list: action.payload }
    }
    case GET_TOPIC_DETAIL: {
      return { ...state, detail: action.payload }
    }
    case GET_USER_INFO: {
      return { ...state, user: Object.assign({}, state.user, action.payload) }
    }
    case GET_USER_COLLECTION: {
      return { ...state, collect: action.payload }
    }
    default: {
      return state
    }
  }
}

function login(loginInfo) {
  return { type: LOGIN, payload: loginInfo }
}

function loginModal(isOpen) {
  return { type: LOGIN_MODAL, payload: isOpen }
}

function topicList(list) { // eslint-disable-line
  return { type: GET_TOPIC_LIST, payload: list }
}

function getTopicDetail(detail) {
  return { type: GET_TOPIC_DETAIL, payload: detail }
}

function userInfo(userinfo) {
  return { type: GET_USER_INFO, payload: userinfo }
}

function userCollection(collect) {
  return { type: GET_USER_COLLECTION, payload: collect }
}


function getTopicList(tab) {
  return (dispatch) => {
    get('/api/topics', {
      mdrender: false,
      tab,
    })
      .then((resp) => {
        dispatch(topicList(resp.data))
      })
  }
}
// eslint-disabled
function getTopicDetailAsync(id) {
  return (dispatch) => {
    get(`/api/topic/${id}`)
      .then((resp) => {
        dispatch(getTopicDetail(resp.data))
      })
  }
}

function getUserInfo(loginname) {
  return (dispatch) => {
    get(`/api/user/${loginname}`)
      .then((resp) => {
        dispatch(userInfo(resp.data))
      })
  }
}

function getUserCollection(loginname) {
  return (dispatch) => {
    get(`/api/topic_collect/${loginname}`)
      .then((resp) => {
        dispatch(userCollection(resp.data))
      })
  }
}

function postLogin(accesstoken) {
  return (dispatch, getState) => {
    post('/api/user/login', {}, {
      accessToken: accesstoken,
    })
      .then((resp) => {
        dispatch(login(resp.data))
      })
      .then(() => {
        const { loginname } = getState().user
        get(`/api/user/${loginname}`)
          .then((resp) => {
            dispatch(userInfo(resp.data))
          })
        get(`/api/topic_collect/${loginname}`)
          .then((resp) => {
            dispatch(userCollection(resp.data))
          })
      })
  }
}

function postComment(topicId, content) {
  return () => {
    post(`/api/topic/${topicId}/replies`, {
      needAccessToken: true,
    }, {
      content,
    })
      .then(() => {
        getTopicDetailAsync(topicId)
      })
  }
}

// eslint-enable

module.exports = {
  login,
  getTopicList,
  reducer,
  getTopicDetail,
  getTopicDetailAsync,
  postLogin,
  getUserInfo,
  getUserCollection,
  postComment,
  loginModal,
}
