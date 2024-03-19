// import React from 'react'
import './CSS.css'
import { Link } from 'react-scroll'

function Navbar() {
  return (
<div className='nav-bar'>
<nav className="navbar navbar-expand-lg ">
<a className="navbar-brand text-light" href="#">Book Recommendation App</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav">
    <li className="nav-item active">
      <Link to='body' className="nav-link text-light" href="#"
      smooth={true} spy={true} duration={500} >Home </Link>
    </li>

    <li className="nav-item active">
    <Link to='recommend' className="nav-link text-light" href="#"
    smooth={true} spy={true} duration={500}>Recommend Form </Link>
   </li>
   
  </ul>
</div>
</nav>
</div>
  )
}

export default Navbar
