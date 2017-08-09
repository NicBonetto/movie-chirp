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
      <form onSubmit={ this.search.bind(this) } className="form-group" id="search-bar">
        <div className="input-group">
          <input type="text" ref="keyword" className="form-control" placeholder="Movie Title" autoFocus="autofocus"/>
          <span className="input-group-btn">
            <button id="search-button" className="btn btn-default" type="submit">Search</button>
          </span>
        </div>
      </form>
    )
  }
}
