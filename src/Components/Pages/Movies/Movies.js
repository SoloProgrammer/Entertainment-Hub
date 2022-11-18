
import axios from 'axios'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useGenre from '../../../Hooks/useGenre'
import { movie_icon } from '../../Config/config'
import Genres from '../../Genres/Genres'
import CustomPagination from '../../Pagination/CustomPagination'
import SingleCard from '../Single_Card/SingleCard'


function Movies() {
  const [movies, setMovies] = useState([])
  
  const [page,setPage] = useState(1)
  
  const [selectedGenres,setSelectedGenres] = useState([])
  
  const [genres,setGenres] = useState([])
  
  const genreforURL = useGenre(selectedGenres)

  const [totalpages,setTotalpages] = useState(0)

  const [not_found,setNot_found] = useState(false)

  const card_container = useRef()

  const fetchMovies = async () => {
    window.scroll(0,0)
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)

    setMovies(data.results)
    setTotalpages(data.total_pages)
    
    if(data.results.length > 0){
      setNot_found(false)
    }
    else{
      setNot_found(true)
    }

  }
  console.log(totalpages)
  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line
  }, [page,genreforURL])

  return (
    <div >
      <span className='page_title'>
        <span><img className='trending_image' src={movie_icon} alt="movie" /></span>
        <span className='mx-2'>Discover Movies</span>
        <span><img className='trending_image' src={movie_icon} alt="movie" /></span>
      </span>
      <Genres 
      selectedGenres={selectedGenres} 
      genres={genres} 
      setGenres={setGenres} 
      setSelectedGenres={setSelectedGenres}
      setPage={setPage}
       type='movie'
       />
      {
        not_found && <p className='not_found'>Movies not Found</p>
      }
      <div ref={card_container} className={`${totalpages > 1 ? "Cards_container" : "Cards_container pad_bott_4"}`}>
        {
          movies.map((movie, ind) => {
            return <SingleCard key={movie.id} media_type='Movie' content = { movie } />
        })
        }
      </div>
      {
        totalpages > 1 && <CustomPagination setPage={setPage} totalpages={totalpages}/>
      }
    </div>
  )
}

export default Movies
