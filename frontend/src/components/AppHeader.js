import React from 'react'
import { NavLink } from 'react-router-dom'
import '../scss/navbar.css'
const AppHeader = () => {
  
  return (
    <div className="navbar">
     <div className="header">
      <div className='header-icon'>

      </div>
      <div className='header-name' style={{fontFamily :"sen"}}>
       myRetail
      </div>
     </div>
     <div className="navbar-items">
      <div className="nav-item">
      UserName
      </div>
      <div className='nav-item'>
      
      </div>
     </div>
    </div>
  )
}

export default AppHeader
