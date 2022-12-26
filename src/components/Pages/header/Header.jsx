import React from 'react'
import {Link} from 'react'

const Header = () => {
  return (
    <div className='header_parent_div'>
      <div className="header_div">
        <li className="link_li">
        <Link to="">Login</Link>
        <Link to="">Add User</Link>
        <Link to="">Table</Link>
        </li>
       
      </div>
    </div>
  )
}

export default Header
