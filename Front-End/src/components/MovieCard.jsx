import React from 'react'


export default function MovieCard({movieObj , watchlist , poster_path , handleAddtoWatchList , handleRemoveFromWatchList , watchList}) {
  

  function doesContain(movieObj){
    for(let i=0 ; i<watchlist.length ; i++){
         if(watchlist[i].id == movieObj.id){
          return true
         }
    }

    return false;
  }
  
  return (
    <div className='h-[40vh] w-[200px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer mt-5 flex flex-col justify-between items-end'
         style={{backgroundImage : `url(https://image.tmdb.org/t/p/original${poster_path})`}}>

          {
            doesContain(movieObj) ? 
            (<div onClick={() => handleRemoveFromWatchList(movieObj)} 
                className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60'>
                &#10060;
              </div>
            ) : 
            (<div onClick={() => handleAddtoWatchList(movieObj)} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60'>
            &#128525;
          </div>) 
          }
        
        

        <div className='overflow-hidden text-white text-l w-full text-center p-2 bg-gray-900/60 mt-32'>
          {movieObj.original_title}
        </div>

    </div>
  )
}


