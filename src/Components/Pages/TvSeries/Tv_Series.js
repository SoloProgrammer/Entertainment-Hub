import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CustomPagination from '../../Pagination/CustomPagination'
import SingleCard from '../Single_Card/SingleCard'
import useGenre from '../../../Hooks/useGenre'
import Genres from '../../Genres/Genres'
import { Tv_series_icon } from '../../Config/config'


function Tv_Series() {
  const [series, setSeries] = useState([])

  const [page, setPage] = useState(1)

  const [selectedGenres, setSelectedGenres] = useState([])

  const [genres, setGenres] = useState([])

  const genreforURL = useGenre(selectedGenres)

  const [totalpages, setTotalpages] = useState(0)

  const [not_found, setNot_found] = useState(false)
  
  const fetchSeries = async () => {
    window.scroll(0, 0)
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)

    setSeries(data.results)
    setTotalpages(data.total_pages)

    if (data.results.length > 0) {
      setNot_found(false)
    }
    else {
      setNot_found(true)
    }

  }
  useEffect(() => {
    fetchSeries()
    // eslint-disable-next-line
  }, [page, genreforURL])

  return (
    <div>
      <span className='page_title'>
        <span><img className='trending_image' src={Tv_series_icon} alt="series" /></span>
         <span className='mx-2'>Discover Series</span>
        <span><img className='trending_image' src={Tv_series_icon} alt="series" /></span>
      </span>

      <Genres
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
        type='tv'
      />

      {
        not_found && <p className='not_found'>Tv Series not Found</p>
      }

      <div className={`${totalpages > 1 ? "Cards_container" : "Cards_container pad_bott_4"}`}>
        {
          series.map((serie, ind) => {
            return <SingleCard key={serie.id} media_type='TV Series' content={serie} />
          })
        }
      </div>
      {
        totalpages > 1 && <CustomPagination setPage={setPage} totalpages={totalpages} />
      }
    </div>
  )
}

export default Tv_Series
