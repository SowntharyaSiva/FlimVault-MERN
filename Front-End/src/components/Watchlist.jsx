import React, { useEffect } from 'react'
import { useState } from 'react'
import genreids from '../utility/genere'


export default function Watchlist({watchlist , setWatchList, handleRemoveFromWatchlist }) {
   const [search , setSearch] = useState('')
   const [genreList , setGenreList] = useState(['All Genre'])
   const [currGenre , setCurrGenre] = useState('All Genres')

   let handleSearch = (e) => {
      setSearch(e.target.value)
   }

   let handleFilter = (genre) =>{
    setCurrGenre(genre);
   }

   let sortIncreasing = () => {
    let sortedIncreasing = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList(sortedIncreasing);
  };
  
  let sortDecreasing = () => {
    let sortedDecreasing = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList(sortedDecreasing);
  };

  useEffect(() =>{
    let temp = watchlist.map((movieObj) =>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGenreList(['All Genres' , ...temp])
    console.log(temp)
  }, [watchlist])
  
 
  return (
    <>

    <div className='flex justify-center flex-wrap m-4'>
        {genreList.map((genre) =>{
          return <div onClick ={() => handleFilter(genre)} className={ currGenre==genre?'flex justify-center items-center h-[2rem] w-[7rem] bg-blue-400 rounded-xl text-white font-bold mx-4'
            :'flex justify-center items-center h-[2rem] w-[7rem] bg-gray-400/70 rounded-xl text-white font-bold mx-4'}>
            {genre}
          </div>
  
        })

        }
    
      </div>


    <div className='flex justify-center my-4'>
      <input type='text' onChange={handleSearch} value={search} placeholder='Search Movies' className='h-[3rem] w-[18rem] p-3 bg-gray-200 outline-none'/>
    </div>

    <div className='overflow-hidden rounded-lg border border-grey200 m-8'>
      <table className='w-full text-gray-500 text-center'>
        <thead className='border-b-2'>
            <tr>
              <th>Names</th>
              <th className='flex justify-center'>
                <div className='p-2'><i onClick={sortIncreasing} class="fa-solid fa-arrow-up"></i></div>
                <div className='p-2'>Rating</div>
                <div className='p-2'><i onClick={sortDecreasing}  class="fa-solid fa-arrow-down"></i></div>
              </th>
              
              <th>Popular</th>
              <th>Genre</th>
            </tr>
        </thead>

        <tbody>

          {
            watchlist.filter((movieObj) =>{
              if(currGenre == 'All Genres'){
                return true
              }
              else{
                return genreids[movieObj.genre_ids[0]] == currGenre
              }
            }).filter((movieObj) =>{
              return movieObj.title.toLowerCase().includes(search.toLowerCase())
            }).map((movieObj)=>{
              return <tr className='border-b-2'>
              <td className='flex items-center px-6 py-4'> 
                <img className='h-[6rem] w-[6rem]' src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} alt="img" />
                 <div className='mx-10'> {movieObj.title} </div>
              </td>
  
              <td>{movieObj.vote_average}</td>
              <td>{movieObj.popularity}</td>
              <td>{genreids[movieObj.genre_ids[0]]}</td>
              <td onClick={() => handleRemoveFromWatchlist(movieObj)} className='text-red-800'> Delete</td>
  
            </tr>
            })
          }

        </tbody>
      </table>
    </div>
    
    </>
  )
}
