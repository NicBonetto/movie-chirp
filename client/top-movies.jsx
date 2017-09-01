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
      <section className="container-fluid" id="top-movies-page">
        <div className="row">
          <div className="col-sm-4 offset-sm-4" id="top-movies">
            <h1 className="text-center">Top Movies</h1>
            {
              this.props.topMovies.map((movie, i) => {
                return <h5 className="text-center" key={ i }>{ capitalize(movie.movie_title) }</h5>
              })
            }
          </div>
        </div>
      </section>
    )
  }
}

function capitalize(movie) {
  const words = movie.split(' ')
  return words.map(word => {
    const arr = word.split('')
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
  }).join(' ')
}

function mapStateToProps(state) {
  return { topMovies: state.topMovies }
}

export default connect(mapStateToProps)(TopMovies)
