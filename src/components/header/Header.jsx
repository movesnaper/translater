import React, { useState, useContext  } from 'react'
import style from './Header.module.css'
import { AiOutlineMenu } from "react-icons/ai"
import SideMenu from '../sideMenu/SideMenu.jsx'
import { CButton } from '@coreui/react'
import User from '../user/User'
import { UserContext } from "../UserProvider"
import { NavLink, useLocation } from "react-router-dom"

const Header = () => {
  const [active, setActive] = useState(false)
  const user = useContext(UserContext)
  const { pathname } = useLocation();
  return <>
    <div className={style.header}>
      <div className={style.header_menu_burger}>
        <CButton  color="light" variant="outline" onClick={() => setActive(true)}>
          <AiOutlineMenu size={25}/>
        </CButton>
      </div>
    { user ? <User user={user}></User>  
      : pathname !== '/login' && <div className={style.login}>
          <NavLink to='login'>
          login
          </NavLink>
      </div>
    }
    </div>
    <SideMenu active={active} hide={() => setActive(false)}></SideMenu>
  </>
}

export default Header