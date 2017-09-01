import { describe, it } from 'mocha'
import io from 'socket.io-client'


describe('app.js', () => {
  describe('socket.on(search)', () => {
    it('Sends a keyword to the Twitter Streaming API to search, and responds with live tweets', done => {
      const socket = io.connect('http://localhost:3000')
      socket.emit('search', { keyword: 'Nike' })
      socket.on('sendTweet', tweet => {
        expect(tweet).to.be.an('object')
        expect(tweet.tweet).to.have.property('sentiment')
        socket.emit('disconnect')
      })
      done()
    })
  })
})
