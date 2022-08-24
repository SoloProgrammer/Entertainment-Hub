import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip } from '@material-ui/core'
import './Genres.css'

function Genres({
    selectedGenres,
    genres,
    setGenres,
    setSelectedGenres,
    setPage,
    type
}) {

    const HandleSelect_Genre = (genre) =>{
        setGenres(genres.filter(ge => ge.id !== genre.id))
        setSelectedGenres([...selectedGenres,genre])
        setPage(1)
    }

    const fetchGenres = async () =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        
        setGenres(data.genres)
    }
    
    useEffect(()=>{
        fetchGenres()
        return () => setGenres([])
        // eslint-disable-next-line
    },[])

    const HandleRemoveGenre = (genre) =>{
        setGenres([...genres,genre])
        setSelectedGenres(selectedGenres.filter(sge => sge.id !== genre.id))
    }

    return (
        <div className='Genres_box'>
            {
                selectedGenres && selectedGenres.map(genre => {
                    return <Chip 
                    key={genre.id}  
                    color='primary'
                    label={genre.name} clickable 
                    size='small'
                    onDelete ={()=>{HandleRemoveGenre(genre)}}/>
                    
                })
            }
            {
                genres && genres.map(genre => {
                    return <Chip 
                    key={genre.id}  
                    label={genre.name} clickable 
                    size='small'
                    onClick={()=>{HandleSelect_Genre(genre)}}/>
                    
                })
            }
        </div>
    )
}

export default Genres
