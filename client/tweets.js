import React from 'react'
import { connect } from 'react-redux'

class Tweets extends React.Component {
  render() {
    const stream = this.props.tweets.map((element, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="media">
            <img className="d-flex align-self-start mr-3" id="tweet-image" src={element.tweet.user.profile_image_url_https}/>
            <div className="media-body">
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
      <section className="container-fluid" id="stream-page">
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <div className="card" id="live-stream">
                <div className="card-header" id="card-head">
                  Live Twitter Feed
                </div>
                <div id="twitter-stream">
                  <ul className="list-group list-group-flush">
                    {stream}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {tweets: state}
}

export default connect(mapStateToProps)(Tweets)
