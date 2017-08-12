import { createStore, combineReducers } from 'redux'

function tweet(state = [], action) {
  switch (action.type) {
    case 'TWEET_RECEIVED':
      return state.concat(action.payload.tweets)
    case 'CLEAR_STATE':
      return []
    default:
      return state
  }
}

function sentiments(state = [{positive: 0}, {negative: 0}, {neutral: 0}], action) {
  switch (action.type) {
    case 'POSITIVE_RECEIVED':
      const pos = state[0].positive
      const sliced = state.slice(1)
      return [
        {positive: pos + 1},
        ...sliced
      ]

    case 'NEGATIVE_RECEIVED':
      const neg = state[1].negative
      return [
        ...state.slice(0, 1),
        {negative: neg + 1},
        ...state.slice(2)
      ]

      case 'NEUTRAL_RECEIVED':
        const neut = state[2]. neutral
        return [
          ...state.slice(0, 2),
          {neutral: neut + 1}
        ]

      case 'DELETE_SENTIMENT':
        return [{positive: 0}, {negative: 0}, {neutral: 0}]

      default:
        return state
  }
}

const reducer = combineReducers({
  tweet,
  sentiments
})

let store = createStore(reducer)

export default store
