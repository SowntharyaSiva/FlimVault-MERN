import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import Pagination from './Pagination';
import axios from "axios";


export default function Movies({watchlist , handleAddtoWatchList , handleRemoveFromWatchList}) {
 
  const [movies , setMovies] =useState([])

  const [pageNo ,setPageNo] =useState(1)

  const handlePrev = () =>{
    if(pageNo == 1){
      setPageNo(1)
    }
    else{
      setPageNo(pageNo-1)
    }
  }

  const handleNext = () => {
    setPageNo(pageNo+1)
  }

  useEffect(() =>
  {
    axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=229d47193ea18a0163ad6f56b961fa87&language=en-US&page=${pageNo}`
    )

    .then((res) =>{
      setMovies(res.data.results)
      console.log(movies)
    })
  
  },[pageNo])



  return (
    <div className='p-3'>
      <div className='text-2xl m-5 text-center font-bold'>
        Trending Movies
      </div>

      <div className='flex flex-row flex-wrap justify-around '>
           { 
            movies.map((movieObj) =>{
            return <MovieCard key={movieObj.id} movieObj={movieObj} watchlist={watchlist} poster_path={movieObj.poster_path} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}  />
           })
           }
           
      </div>

      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev}/>
    </div>
  )
}

// https://api.themoviedb.org/3/movie/popular?api_key=229d47193ea18a0163ad6f56b961fa87&language=en-US&page=1