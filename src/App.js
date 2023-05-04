
import React, { useState,useEffect,useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const[error,setError]=useState(null);
  

 const fetchMovieHandler=useCallback (async ()=> {
  setIsLoading(true);
  setError(null);
  try{
   const response= await fetch('https://react-demo-project-4d85f-default-rtdb.firebaseio.com/movies.json');
   if(!response.ok){
    throw new Error('Something went Wrong');
   }
     const data= await response.json();
     const loadedMovies=[];

     for(const key in data){
      loadedMovies.push({
        id: key,
        title :data[key].title,
        openingText :data[key].openingText,
        releaseDate: data[key].releaseDate,

      })
     }

     setMovies(loadedMovies);
        
      }
      catch(error){
      setError(error.message);
      }
      setIsLoading(false);
     
  },[]);

  useEffect(()=>{
    fetchMovieHandler();
  },[]);
  
  // if(error){
  //       setTimeout(()=>{
          
  //         fetchMovieHandler()
  //       },2000);
  //      }
  async function addMovieHandler(movie){
   const response=await fetch("https://react-demo-project-4d85f-default-rtdb.firebaseio.com/movies.json",{
      method :'POST',
      body : JSON.stringify(movie),
      headers :{
        'content-type' :'application/json'
      }
    });
    const data=response.json;
    console.log(data);


  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
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
