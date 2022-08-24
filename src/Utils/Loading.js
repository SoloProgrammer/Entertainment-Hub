import React from 'react'
import loading from '../Utils/loading2.gif'


export default function Loading() {
  return (
    <div>
      
      <h3 id='Loading_txt' style={{fontSize:"5em"}}>
        {/* <img src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif" alt=""/> */}
      <img src={loading} alt="" />

      </h3>
    </div>
    
  )
}

