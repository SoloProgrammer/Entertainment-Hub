import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { trending_icon } from '../../Config/config'
import CustomPagination from '../../Pagination/CustomPagination'
import SingleCard from '../Single_Card/SingleCard'

function Trending() {

  const [trendings, setTrendings] = useState([])
  const [page, setPage] = useState(1)

  const fetchTrendings = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)

    setTrendings(data.results)
    
  }
  
  useEffect(() => {
    window.scroll(0,0)
    fetchTrendings()
    // eslint-disable-next-line
  }, [page])

  return (
    <div>
     
      <span className='page_title'> 
        <span> <img className='trending_image' src={trending_icon} alt="photo" /> </span> 
          Trending now
        <span> <img className='trending_image' src={trending_icon} alt="photo" /> </span>
      </span>

      <div className='Cards_container'>
        {
          trendings.map((trending, ind) => {
            return <SingleCard media_type={trending.media_type === "tv" ? "TV Series" : "Movie"} key={trending.id} content = { trending } />
        })
        }
      </div>
      <CustomPagination setPage={setPage} totalpages={50}/>
    </div>
  )
}

export default Trending
