// import { get } from '../util/http' // eslint-disable-line
const { get } = require('../util/http')

const ADD = 'ADD'
const GET_TOPIC_LIST = 'GET_TOPIC_LIST'
const GET_TOPIC_DETAIL = 'GET_TOPIC_DETAIL'

const initialState = {
  count: 1,
  list: [],
  detail: {},
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD: {
      return { ...state, count: state.count + 1 }
    }
    case GET_TOPIC_LIST: {
      return { ...state, list: action.payload }
    }
    case GET_TOPIC_DETAIL: {
      return { ...state, detail: action.payload }
    }
    default: {
      return state
    }
  }
}

function add() {
  return { type: ADD }
}

function topicList(list) { // eslint-disable-line
  return { type: GET_TOPIC_LIST, payload: list }
}

function getTopicDetail(detail) {
  return { type: GET_TOPIC_DETAIL, payload: detail }
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
        console.log(resp.data) // eslint-disable-line
        dispatch(getTopicDetail(resp.data))
      })
  }
}
// eslint-enable

module.exports = {
  add,
  getTopicList,
  reducer,
  getTopicDetail,
  getTopicDetailAsync,
}
