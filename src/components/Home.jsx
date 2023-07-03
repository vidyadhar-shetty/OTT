import { useEffect, useState } from "react";
import Movieslist from "./Movieslist.jsx";

const Home = () => {

    let [movies , setMovies] = useState([]);
    let [error , setError] = useState(null);
    let [pending , setPending] = useState(true);
    

    useEffect(()=>{

        if( localStorage.getItem("fav")==null )
        {
            localStorage.setItem("fav" , "[]")
        }

        setTimeout(()=>{
            // fetch("http://localhost:4000/movies")
            fetch("https://ott-4f0aa-default-rtdb.firebaseio.com/movies.json")
            .then((res)=>{ return res.json() })
            .then((data)=>{ 
                console.log(data);
                setMovies(data || []);
                setPending(false);
                })
            .catch((err)=>{
                setError("404 Network issue !!! please try again later");
                setPending(false);
            })
        } , 100)
    } , [])


    return ( 
        <div className="home">  
          <h1>Movie List</h1> 

        {pending==true  && <div className="loading"></div> }

        {error && <h1> {error} </h1>}

        {movies && <Movieslist movies={movies} title="All movies"/>}

        {movies && <Movieslist movies={movies} title="Action movies"/>}

        {movies && <Movieslist movies={movies.filter((m)=>{return m.rating>=9.7})} title="Top movies"/>}

        {movies && <Movieslist movies={movies} title="Drama movies"/>}

      

        </div>
     );
}
export default Home;