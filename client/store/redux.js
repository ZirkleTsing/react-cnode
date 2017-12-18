// import { get } from '../util/http' // eslint-disable-line
const { get } = require('../util/http')

const ADD = 'ADD'
const GET_TOPIC_LIST = 'GET_TOPIC_LIST'

const initialState = {
  count: 1,
  list: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD: {
      return { ...state, count: state.count + 1 }
    }
    case GET_TOPIC_LIST: {
      return { ...state, list: action.payload }
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

module.exports = {
  add,
  getTopicList,
  reducer,
}
