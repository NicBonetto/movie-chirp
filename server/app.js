import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import http from 'http'
import Twitter from 'twit'
import Sentiment from 'sentiment'

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

server.listen(process.env.PORT || 3000)

const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

app.use(express.static(__dirname + '/public/'))

io.on('connect', socket => {
  let hasSearched = false
  let twitStream

  socket.on('search', payload => {

    if (hasSearched) twitStream.stop()
    else hasSearched = true

    twitStream = twitter.stream('statuses/filter', { language: 'en', track: payload.keyword })

    twitStream.on('tweet', tweet => {
      const opinion = Sentiment(tweet.text)
      tweet['sentiment'] = opinion
      socket.emit('sendTweet', { tweet })
    })

    socket.once('disconnect', () => {
      socket.disconnect()
      twitStream.stop()
    })
  })
})
