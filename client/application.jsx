import React from 'react'
import Tweets from './tweets.jsx'
import TopMovies from './top-movies.jsx'
import Store from './store'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TopMovies />
        <Tweets />
      </div>
    )
  }
}
