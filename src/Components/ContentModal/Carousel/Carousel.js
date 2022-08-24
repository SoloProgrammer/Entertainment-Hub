import axios from 'axios';
import React, { useEffect,useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../Config/config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({media_type,id}) => {

    const [credits,setCredits] = useState();

     const items = credits?.map(c =>{
      return (
         <div className='carousel_Item'>
            <img 
            onDragStart={handleDragStart} 
            className='Carousel_image' 
            src = {c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} 
            alt="Cast by" />
            <b>{c?.name}</b>
        </div>
     )});

     const responsive = {
      0:{
          items:3,
      },
      512:{
          items:5
      },
      1024:{
          items:7
      }
     }
    const fetchCredits = async () =>{
        media_type = media_type === "Movie" ? "movie" : "tv"
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        
        setCredits(data.cast)
    }

    useEffect(()=>{
        fetchCredits()
    },[id])

  return (
    <>
   {credits && credits.length > 0 && <p className='cast_'>Directors and Producers</p>}
    <AliceCarousel responsive={responsive} autoPlay infinite disableButtonsControls disableDotsControls mouseTracking items={items} />
    </>
  );
}
export default Carousel