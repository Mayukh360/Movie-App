
import React, { useState,useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const[error,setError]=useState(null);
  useEffect(()=>{
    fetchMovieHandler();
  },[]);

 async function fetchMovieHandler() {
  setIsLoading(true);
  setError(null);
  try{
   const response= await fetch('https://swapi.dev/api/films');
   if(!response.ok){
    throw new Error('Something went Wrong');
   }
 
      
      const data= await response.json();
       const transformedData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedData);
        
      }
      catch(error){
      setError(error.message);
      }
      setIsLoading(false);
     
  }
  // if(error){
  //       setTimeout(()=>{
          
  //         fetchMovieHandler()
  //       },2000);
  //      }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length >0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length ===0 && !error &&<p>No Movies To Show</p> }
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
