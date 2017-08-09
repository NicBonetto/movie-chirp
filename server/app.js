import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import http from 'http'
import Twitter from 'twit'

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

io.on('connection', (socket) => {
  console.log('New Socket Connection')
  socket.on('search', (payload) => {
    const twitStream = twitter.stream('statuses/filter', { language: 'en', track: payload.keyword })

    twitStream.on('tweet', (tweet) => {
      socket.emit('sendTweet', { tweet })
    })

    socket.once('disconnect', () => {
      socket.disconnect()
      twitStream.stop()
    })
  })
})
