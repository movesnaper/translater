import React, { useContext  } from 'react'
import style from './style.module.css'
import { AiFillHome } from "react-icons/ai"
import DocTitle from '../docTitle'
import { Context } from "../Provider"
import { NavLink } from "react-router-dom"

const Header = () => {
  const [{user}] = useContext(Context)

  const userTitle = () => {
    return user ? user.email : <NavLink to='auth/login'>login</NavLink> 
  }

  return <>
    <div className={style.header}>
      <div className={style.header_menu_burger}>
      <NavLink to='/'>
        <AiFillHome size={25}/>
      </NavLink> 
      </div>
      {DocTitle({title: userTitle(), menu: [
      user ? {title: 'logout', href: `/auth/logout`} : 
      {title: 'register', href: `/auth/register`}
    ]})}

    </div>
  </>
}

export default Header