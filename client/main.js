import React from 'react'
import ReactDOM from 'react-dom'
import App from './application'
import Store from './store'
import io from 'socket.io-client'

const socket = io.connect('/')

socket.on('sendTweet', tweet => {
  Store.dispatch({ type: 'TWEET_RECEIVED', payload: { tweets: tweet } })
})

function render() {
  ReactDOM.render(
    < App socket = { socket }/>,
    document.querySelector('#app')
  )
}

render()
