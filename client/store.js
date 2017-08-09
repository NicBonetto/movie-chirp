import { createStore } from 'redux'

function reducer(state, action) {
  switch (action.type) {
    case 'TWEET_RECEIVED':
      return state.concat(action.payload.tweet)
    case 'CLEAR_STATE':
      return []
    default:
      return state
  }
}

let store = createStore(reducer, [])

export default store
