import React, { useContext  } from 'react'
import style from './style.module.css'
import { Context } from "../Provider"
import Logo from './logo'
import User from './user'
// import Menu from './menu'
import DropDownBtn from '../dropDownBtn'
// import {CNavLink} from '@coreui/react'
import { NavLink } from "react-router-dom"

const Header = () => {
  const [{menu: value, user }] = useContext(Context)
  const {title, menu} = value || {}


  return <div className={style.header}>
      {menu ? <DropDownBtn schema={[{ title: <NavLink to="/" >{title}</NavLink>, menu}]}/>
      : Logo()}
      <div className={style.header__user}>{User(user || {})}</div>
    </div>
}

export default Header