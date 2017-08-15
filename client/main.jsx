import React from 'react'
import ReactDOM from 'react-dom'
import Search from './search.jsx'
import App from './application.jsx'
import Store from './store'
import { Provider } from 'react-redux'
import io from 'socket.io-client'

function emitSentiment(sentiment, movie) {
  if (sentiment > 0) {
    Store.dispatch({ type: 'POSITIVE_RECEIVED', payload: { sentiment: sentiment } })
    fetch('/movies', {
      method: 'POST',
      body: JSON.stringify({ movie }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      getTopMovies()
        .then(data => {
          Store.dispatch({ type: 'MOVIES_UPDATED', payload: { movies: data } })
        })
    })
  }
  else if (sentiment < 0) return Store.dispatch({ type:'NEGATIVE_RECEIVED', payload: { sentiment: sentiment } })
  else return Store.dispatch({ type: 'NEUTRAL_RECEIVED', payload: { payload: sentiment } })
}

const socket = io.connect('/')

socket.on('sendTweet', tweet => {
  Store.dispatch({ type: 'TWEET_RECEIVED', payload: { tweets: tweet } })
  emitSentiment(tweet.tweet.sentiment.score, tweet.movie)
})

function render() {
  ReactDOM.render(
    <div>
      <Search socket={ socket }/>
      <Provider store={Store}>
        <App />
      </Provider>
    </div>,
    document.querySelector('#app')
  )
}

render()

function getTopMovies() {
  return fetch('/movies/top').then(res => res.json())
}
