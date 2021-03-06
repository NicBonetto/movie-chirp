import React from 'react'
import Search from './search.jsx'
import Tweets from './tweets.jsx'
import Store from './store'
import { Provider } from 'react-redux'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Search socket={this.props.socket}/>
        <Provider store={Store}>
          <Tweets/>
        </Provider>
      </div>
    )
  }
}
