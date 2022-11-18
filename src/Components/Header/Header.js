import React from 'react'
import '../Header/Header.css'
const Header = () => {
  return (
    <div>
     <header onClick={()=>{window.scroll(0,0)}} className='header'>🎬 Entertainment Hub 🎥</header>
    </div>
  )
}

export default Header
