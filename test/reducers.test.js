import { describe, it } from 'mocha'
import { tweet,sentiments } from '../client/store.js'

describe('store.js', () => {
  describe('tweet', () => {
    it('Saves incoming live tweets from Socket and Twitter Streaming API', () => {
      expect(tweet([], { type: 'TWEET_RECEIVED', payload: { tweets: { Test: 'testing' } } })).to.be.an('array').with.length.above(0)
      expect(tweet([], { type: 'CLEAR_STATE' })).to.deep.equal([])
    })
  })
  describe('sentiments', () => {
    it('Saves the sentiment scores of incoming tweets', () => {
      expect(sentiments([{positive: 0}, {negative: 0}, {neutral: 0}], { type: 'POSITIVE_RECEIVED' }))
        .to.be.an('array').that.contains.something.like({positive: 1})
      expect(sentiments([{positive: 0}, {negative: 0}, {neutral: 0}], { type: 'NEGATIVE_RECEIVED' }))
        .to.be.an('array').that.contains.something.like({negative: 1})
      expect(sentiments([{positive: 0}, {negative: 0}, {neutral: 0}], { type: 'NEUTRAL_RECEIVED' }))
        .to.be.an('array').that.contains.something.like({neutral: 1})
      expect(sentiments([{positive: 2}, {negative: 2}, {neutral: 2}], { type: 'DELETE_SENTIMENT' }))
        .to.be.an('array').that.deep.equal([{positive: 0}, {negative: 0}, {neutral: 0}])
    })
  })
})
