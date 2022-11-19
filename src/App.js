// Main Utama React HTML
import './App.css'
import { getMovieList, searchMovie } from "./api.js"
import { useEffect, useState } from "react"
const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() =>{
    getMovieList().then((result) =>{
      setPopularMovies(result)
    })
  }, [])

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
          <div className="Movie-wrapper" key={i}>
              <div className="Movie-title">{movie.title}</div>
              <img className="Movie-image" src={`${process.env.REACT_APP_BASIMGURL}/${movie.poster_path}`} alt="" />
              <div className="Movie-date">Release: {movie.release_date}</div>
              <div className="Movie-rate">{movie.vote_average}</div>
          </div>
      )
    })
  } 

  const search = async (q) => {
    if (q.length > 3){
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>The Movie</h1>
          <input placeholder="Cari Film ........" className="Movie-search" onChange={({target}) => search(target.value)}
          />
          <div className="Movie-container">
          <PopularMoviesList />
          </div>
        
      </header>
    </div>
  );
}

export default App;
