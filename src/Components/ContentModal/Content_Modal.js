import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './Content_Modal.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import YouTubeIcon from '@material-ui/icons/YouTube';

import './Content_Modal.css'

import Carousel from './Carousel/Carousel'

import { img_500, unavailableLandscape, unavailable } from '../Config/config'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "84%",
    backgroundColor: "#39445a",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: '.6rem',
    color: "#fff",
    boxShadow: 24,
    padding: 1,
};

export default function Content_Modal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [content, setContent] = useState("")
    const [video, setVideo] = useState("")

    const fetchcontent = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type == "Movie" ? "movie" : "tv"}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setContent(data)

    }
    const fetchvideo = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type == "Movie" ? "movie" : "tv"}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setVideo(data.results[0]?.key) // optional chaining

    }
    useEffect(() => {
        fetchcontent();
        fetchvideo();
    }, [id])
    return (
        <>
            <div className='Single_Content_Card' onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {content &&
                            (<div className="ContentModal_div">

                                <img className='Content_portrait' src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} />

                                <img className='ContentModal_landscape' src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} />

                                <div className="ContentModal_about">
                                    <span className='ContentModal_title'>
                                        {content.title || content.name}
                                        ({(content.release_date ||
                                            content.first_air_date ||
                                            "----").slice(0, 4)})

                                    </span>

                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}

                                    <div className='ContentModal_description'>
                                        {
                                            content.overview ?  content.overview : "Description not avilable"
                                        }
                                    </div>

                                    <div className="ContentModal_carousal">
                                        <Carousel media_type={media_type} id={id}/>
                                    </div>

                                    <Button
                                        className='video_btn'
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>

                                </div>

                            </div>)}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
