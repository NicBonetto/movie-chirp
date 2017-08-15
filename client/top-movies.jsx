import React from 'react'
import { connect } from 'react-redux'

class TopMovies extends React.Component {
  componentDidMount() {
    fetch('/movies/top')
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({ type: 'MOVIES_UPDATED', payload: { movies: data } })
      })
  }

  render() {
    return (
      <section className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <ul>
              {
                this.props.topMovies.map((movie, i) => {
                  return <li key={ i }>{ movie.movie_title }</li>
                })
              }
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return { topMovies: state.topMovies }
}

export default connect(mapStateToProps)(TopMovies)
