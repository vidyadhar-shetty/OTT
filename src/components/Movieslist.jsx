import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movieslist = ({movies , title}) => 
{
    let[favId , setFavId] = useState([]);
    let[altered , setAltered] = useState(0);

    useEffect(()=>{
        let fav = JSON.parse(localStorage.getItem("fav"));
        setFavId(fav.map((m)=>{return m.id}));
    } , [altered]);

    let add = (movie)=>{ 
       let fav =  JSON.parse(localStorage.getItem("fav"));
       fav.push(movie);
       localStorage.setItem("fav" , JSON.stringify(fav));
       setAltered(altered+1);
    }

    let removeMovie = (id)=>{ 
        let fav =  JSON.parse(localStorage.getItem("fav"));
        fav = fav.filter((m)=>{return m.id!=id })
        localStorage.setItem("fav" , JSON.stringify(fav));
        setAltered(altered+1);
     }

    return ( 
    <div className="movies-list">
        <h1 id="title">{title}</h1>

        <div className="movies">
                    {movies.map((movie)=>{
                        return(
                            <div className="movie">
                                <Link to={`/moviedetails/${movie.id}`}>
                                   
                                    <img src={movie.poster} alt="poster" width="200px" height="250px" />
                                    <h2>{movie.moviename}</h2>
                                    <p>{movie.genre}</p>

                                </Link>
                                {favId.includes(movie.id) ?
                                <button className="remove-btn" onClick={ ()=>{removeMovie(movie.id)} }> <i class='bx bxs-heart' ></i></button> 
                                :
                                <button className="add-btn" onClick={ ()=>{add(movie)} }><i class='bx bx-heart' ></i></button>}
                            </div>
                        )
                    })}
        </div>

    </div> );
}
 
export default Movieslist;