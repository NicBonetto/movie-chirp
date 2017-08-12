import React from 'react'
import { connect } from 'react-redux'
import Chart from './chart.jsx'

class Tweets extends React.Component {
  findSentiment(sentiment) {
    if (sentiment > 0) return 'positive fa fa-chevron-up pull-right'
    else if (sentiment < 0) return 'negative fa fa-chevron-down pull-right'
    else return 'neutral fa fa-circle pull-right'
  }

  isLoading() {
    if (this.props.tweets.length < 1) {
      return (
         <li className="list-group-item">
          <div className="loader"></div>
        </li>
      )
    }
  }

  render() {
    const stream = this.props.tweets.map((element, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="media">
            <img className="d-flex align-self-start mr-3" id="tweet-image" src={element.tweet.user.profile_image_url_https}/>
            <div className="media-body">
              <span className={this.findSentiment(element.tweet.sentiment.score)}></span>
              <h4 className="mt-0 mb-1">
                {element.tweet.user.name}
              </h4>
              {element.tweet.text}
            </div>
          </div>
        </li>
      )
    })
    return (
      <section className="container-fluid" id="stream-page" name="stream">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="card" id="live-stream">
                <div className="card-header" id="card-head">
                  Live Twitter Feed
                </div>
                <div id="twitter-stream">
                  <ul className='list-group list-group-flush'>
                    {this.isLoading()}
                    {stream}
                  </ul>
                </div>
              </div>
            </div>
            <Chart/>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {tweets: state.tweet}
}

export default connect(mapStateToProps)(Tweets)
