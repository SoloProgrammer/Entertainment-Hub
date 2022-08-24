import React from 'react'
import '../Single_Card/Single_Card.css'

import { img_300 } from '../../Config/config'
import { Badge } from '@mui/material'
import {unavailable} from '../../Config/config'
import Content_Modal from '../../ContentModal/Content_Modal'

export default function SingleCard({ content, media_type }) {

  return (
    <Content_Modal media_type = {media_type} id={content.id}>
      <Badge badgeContent={content.vote_average} color={`${content.vote_average > 6 ? "primary" : "secondary" }`} />
      <img src={content.poster_path ? `${img_300}/${content.poster_path}` : `${unavailable}`} alt="" />
      
      <div className="Content_title">
        {content.original_name ? content.original_name : content.title}
      </div>
      <div className="card_bottom">
        <div className="Some_details">
          <span>{media_type}</span>
          <span>{content.release_date ? content.release_date : content.first_air_date}</span>
        </div>
      </div>
    </Content_Modal>
  )
}

