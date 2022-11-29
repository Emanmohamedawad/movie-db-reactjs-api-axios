import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Peaple() {
    //Data
    const [peapleList, setPeapleList] = useState([]);

    useEffect( () => { 
        // callApi
        async function getPeaple()
        {
            let { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=dedb89745106639a2d878fb0c3f3dc20`)
            setPeapleList(data.results);
        }
        getPeaple();
    } , []);
return <>
    <div className="tvs mt-5">
            <div className="container">
                <div className="row">
                    {
                        peapleList.map( (person , idx) => {
                                return <>
                                <div key={idx} className="col-lg-3 col-md-4">
                                    <Link to={`/moviedetails/${person.id}`}>
                                        <div className="personData m-2 my-sm-3">
                                            <div className="personImage position-relative">
                                                <img src={`https://image.tmdb.org/t/p/w500` + person.profile_path} alt="" className='img-fluid'/>
                                                {/* <div className="rateBox position-absolute top-0 text-white">
                                                    <p className='fs-6 m-0 p-2'>{person.vote_average.toFixed(1)}</p>
                                                </div> */}
                                            </div>
                                            <p className='fw-bolder mt-2'> {person.name} </p>
                                        </div>
                                    </Link>
                                </div>
                                </>
                            
                        })
                    }

                </div>
            </div>
    </div>
</>
}
