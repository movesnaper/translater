import React, { useContext  } from 'react'
import style from './style.module.css'
import { Context } from "../Provider"
import Logo from './logo'
import User from './user'
import Menu from './menu'

const Header = () => {
  const [{menu, user }] = useContext(Context)



  return <div className={style.header}>
      <div className={style.header__logo}>{Logo()}</div>
      {menu && <div className={style.header__menu}>{Menu(menu)}</div>}
      <div className={style.header__user}>{User(user || {})}</div>
    </div>
}

export default Header