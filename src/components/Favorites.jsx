import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";

const Favorites = () => {

    let[fav , setFav] = useState(null);

    useEffect( ()=>{
     setFav( JSON.parse(localStorage.getItem("fav")) );
    } , [])

    return(
        <div className="fav-movies">
            {fav && <Movieslist movies={fav} title="Favorites"/>  }
        </div>
    )
}
 
export default Favorites;