import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import http from 'http'
import Twitter from 'twit'
import Sentiment from 'sentiment'
import bodyParser from 'body-parser'

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

const knex = require('knex')({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

server.listen(process.env.PORT || 3000)

const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

app.use(express.static(__dirname + '/public/'))
app.use(bodyParser.json())

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
      socket.emit('sendTweet', {
        tweet,
        movie: payload.keyword
      })
    })

    socket.once('disconnect', () => {
      socket.disconnect()
      twitStream.stop()
    })
  })
})

app.post('/movies', (req, res) => {
  const movie = req.body.movie.toLowerCase()
  const movieData = {
    movie_title: movie,
    sentiment: 1
  }
  findMovie(movie)
    .then(data => {
      if (!data.length) {
        addMovie(movieData).then(() => res.sendStatus(201))
      }
      else {
        let num = data[0].sentiment + 1
        updateMovie(movie, num).then(() => res.sendStatus(200))
      }
    })
})

app.get('/movies/top', (req, res) => {
  topMovies().then(movies => res.json(movies))
})

function findMovie(movie) {
  return knex('movies')
    .where('movie_title', movie)
    .limit(1)
}

function addMovie(movie) {
  return knex('movies')
    .insert(movie)
    .returning('*')
}

function updateMovie(movie, sentiment) {
  return knex('movies')
    .where('movie_title', movie)
    .update('sentiment', sentiment)
}

function topMovies() {
  return knex('movies')
    .orderBy('sentiment', 'desc')
    .limit(3)
}
