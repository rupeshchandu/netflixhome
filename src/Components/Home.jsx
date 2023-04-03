import React, { useEffect, useState } from 'react'
import "./Home.scss";
import "./media.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import { AiOutlinePlus } from 'react-icons/ai';

const url = "https://api.themoviedb.org/3";
const api_key = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowplaying = "now_playing";
const popular = "popular";
const toprated = "top_rated";


const Card = ({img})=>(

    <img className='card' src={img} alt = "cover"/>
);



const Row = ({title,arr = []   })=>(
    <div className='row'>

        <h2>{title}</h2>

        <div>
            {
                arr.map((i,index)=>(
                    <Card img = {`${imgUrl}/${i.poster_path}`} key = {index}/>
                ))
            }
        </div>
    </div>
);




const Home = () => {

    const [upcomingmovies,setupcomingmovies] = useState([]);
    const [nowplayingmovies,setnowplayingmovies] = useState([]);
    const [popularmovies,setpopularmovies] = useState([]);
    const [topratedmovies,settopratedmovies] = useState([]);
    const [genreall,setgenreall] = useState([]);

    useEffect(()=>{

        const fetchupcoming = async()=>{
            const {
                data :{results}
            } = await axios.get(`${url}/movie/${upcoming}?api_key=${api_key}&page=8`);
            setupcomingmovies(results);
        

        };

        const fetchnowplaying = async()=>{
            const {
                data : {results}
            } = await axios.get (`${url}/movie/${nowplaying}?api_key=${api_key}&page=4`);
            setnowplayingmovies(results);

        };


        const fetchpopularmovies = async()=>{
            const{
                data : {results}
            } = await axios.get(`${url}/movie/${popular}?api_key=${api_key}`);
            setpopularmovies(results);
        };

        const fetchtopratedmovies = async()=>{
            const {
                data : {results}
            } = await axios.get(`${url}/movie/${toprated}?api_key=${api_key}&page=2`);
            settopratedmovies(results);
        };

        const fetchgenre = async()=>{
            const {data : {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${api_key}`);
            setgenreall(genres);
        };


        fetchpopularmovies();
        fetchnowplaying();
        fetchupcoming();
        fetchtopratedmovies();
        fetchgenre();
    


    },[]);


   return (
    <section className="home">
        <div className="banner" style = {{
            backgroundImage: popularmovies[0]? `url(${`${imgUrl}/${popularmovies[0].poster_path}`})` : "none"
        }}>
            {
                popularmovies[0] && (

                    <h1>{popularmovies[0].original_title}</h1>
                )
            }

            {
                popularmovies[0] &&(
                    <p>{popularmovies[0].overview}</p>
                )
            }

            <div>
                <button><BiPlay/>Play</button>
                <button>My List <AiOutlinePlus/></button>
            </div>
            
        </div>
        
        <Row title={"Upcoming "} arr = {upcomingmovies} />
        <Row title={"Now Playing"} arr = {nowplayingmovies} />
        <Row title={"Top Rated"} arr = {topratedmovies} />
        <Row title={"Popular"} arr = {popularmovies} />

        <div className="genrebox">
            {

                genreall.map((i)=>(
                    <Link key = {i.id} to = {`/genre/${i.id}`} >{i.name}</Link>
                ))
            }
        </div>

    </section>
  )
}

export default Home