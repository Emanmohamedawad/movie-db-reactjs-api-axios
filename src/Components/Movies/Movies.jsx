// 

import React , {useState , useEffect} from 'react'
import axios from 'axios';
import './Movies.css'
// import $ from "jquery";
import { Link } from 'react-router-dom';


export default function Movies() {
    //Data
    const [movieList, setMovieList] = useState([]);
    // const [currentCategory , setCategory] = useState("popular");
    let pageNumber= new Array(10).fill("x").map((el ,i)=> i+1)

    async function getMovies(pageNum=1,type='popular')
    {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=dedb89745106639a2d878fb0c3f3dc20&language=en-US&page=${pageNum}`)
        setMovieList(data.results);
    }
    useEffect( () => { 
        // callApi
        getMovies();
    } , []);

    function changePageNumber(page){
        getMovies(page );
    }
    // function changeType(e){
    //     let type= e.target.id;
    //     setCategory(type);
    //     getMovies(1,type);
    // }
    // async function Search(e){
    //     let value = e.target.value;
    //     if(value != null){
    //         let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=dedb89745106639a2d878fb0c3f3dc20&query=${value}&page=1&include_adult=false`);
    //         setMovieList(data.results);
    //     } else{
    //         getMovies();
    //     }

    // }
return <>
    <div className="movies mt-5">
            <div className="container">
                {/* page */}
                <nav aria-label="..." className='d-flex justify-content-center bg-transparent'>
                <ul className="pagination pagination-sm">
                    {pageNumber.map((el)=> <li key={el} className="page-item" onClick={()=> changePageNumber(el)}><button className="page-link" >{el}</button></li> )}
                    {/* <li className="page-item"><a className="page-link" href="#">2</a></li> */}
                    
                </ul>
                </nav>
            {/* movies */}
            {/* <input type="text" onChange={Search} className='form-control bg-transparent text-white m-75 mx-auto my-4' placeholder='search...' /> */}
                <div className="row g-3">
                    {/* <div className='col-md-2 bg-info border bg-transparent border-1 rounded p-3'>
                        <p id='popular' onClick={changeType} className='text-info'>Popular</p>
                        <p id='top_rated' onClick={changeType} className='text-info'>Top Rate</p>
                        <p id='upcoming' onClick={changeType} className='text-info'>UpComing</p>
                        <p id='new_playing' onClick={changeType} className='text-info'>Now Playing</p>
                        
                    </div> */}
                    <div className='col-md-12'>
                        <div className='row'>
                        {
                        movieList.map( (movie , idx) => {
                                return <>
                                <div key={idx} className="col-lg-3 col-md-4">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="movieData m-2 my-sm-3">
                                            <div className="movieImage position-relative">
                                                <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} alt="" className='img-fluid'/>
                                                <div className="rateBox position-absolute top-0 text-white">
                                                    <p className='fs-6 m-0 p-2'>{movie.vote_average.toFixed(1)}</p>
                                                </div>
                                            </div>
                                            <p className='fw-bolder mt-2'> {movie.original_title} </p>
                                        </div>
                                    </Link>
                                </div>
                                </>
                            
                        })
                    }
                        </div>
                    </div>


                </div>
            </div>
    </div>
</>
}

