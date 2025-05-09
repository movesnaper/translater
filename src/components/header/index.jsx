import React, { useEffect, useContext  } from 'react'
import style from './style.module.css'
import { Context } from "../Provider"
import Logo from './logo'
import User from './user'
import jwt_decode from "jwt-decode"

// import Menu from './menu'
import DropDownBtn from '../dropDownBtn'
// import {CNavLink} from '@coreui/react'
// import { NavLink } from "react-router-dom"

const Header = ({state, setState}) => {
  const {info, menu, user} = state
  // const [{menu, user}] = useContext(Context)
  
  // const [{menu: value, user }] = useContext(Context)
  // const {title, menu} = value || {}
  // useEffect(() => {
  //   const jwt = localStorage.getItem('user_jwt')
  //   if (jwt) localStorage.setItem('user_jwt', jwt)
  //     const user = jwt && jwt_decode(jwt)
  //     setState({...state, user})
  //   // update.user()
  //   // update.pageText()
  //   // update.pagePraxis()
  //   // update.pageDictionary()
  // }, [])
  useEffect(() => {
    const jwt = localStorage.getItem('user_jwt')
    if (jwt) localStorage.setItem('user_jwt', jwt)
      const user = jwt && jwt_decode(jwt)
    
      setState({ user })
  }, [])
  
  return <div>
    <div className={style.header}>
    {Logo()}
      {<DropDownBtn  schema={() => {
        return {
          menu: menu,
          title: <div className={style.header__title}>{info?.title}</div>,
          // title: <NavLink to="/" >{title}</NavLink>,
          // style: {width: '100%'}
        }
      }}/>}

      <div className={style.header__user}>{User(user || {})}</div>
    </div>
  </div>
}

export default Header