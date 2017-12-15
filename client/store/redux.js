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

function getTopicList() {
  return (dispatch) => { // eslint-disable-line
    get('/api/topics')
      .then((data) => {
        console.log(data)  // eslint-disable-line
        // dispatch(topicList(data))
      })
  }
}

module.exports = {
  add,
  getTopicList,
  reducer,
}
