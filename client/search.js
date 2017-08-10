import React from 'react'

export default class Search extends React.Component {
  search(e) {
    e.preventDefault()
    const search = this.refs.keyword.value
    const keyword = search.replace(/\s/g, '')
    this.props.socket.emit('search', { keyword: keyword })
  }

  render() {
    return (
      <section className="container-fluid" id="search-page">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="text-center text-style" id="title-header">Movie Chirp</h1>
          </div>
          <div className="col-sm-12">
            <h4 className="text-style text-center">See what people are saying about the movies.</h4>
          </div>
          <div className="col-sm-12">
            <p className="text-center text-style">Search for a movie, get live opinions.</p>
          </div>
          <div className="col-sm-3" id="movie-search">
            <form onSubmit={ this.search.bind(this) } className="form-group" id="search-bar">
              <div className="input-group">
                <input type="text" ref="keyword" className="form-control" placeholder="Movie Title" autoFocus="autofocus"/>
                <span className="input-group-btn">
                  <button id="search-button" className="btn btn-default" type="submit">Search</button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
