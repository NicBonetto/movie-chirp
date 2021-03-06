import React from 'react'
import ReactDOM from 'react-dom'
import App from './application.jsx'
import Store from './store'
import io from 'socket.io-client'

function emitSentiment(sentiment, movie) {
  if (sentiment > 0) {
    Store.dispatch({ type: 'POSITIVE_RECEIVED', payload: { sentiment: sentiment } })
    fetch('/movies', {
      method: 'POST',
      body: JSON.stringify({ movie }),
      headers: { 'Content-Type': 'application/json' }
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
    < App socket = { socket }/>,
    document.querySelector('#app')
  )
}

render()
