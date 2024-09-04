import React, { useState, useContext  } from 'react'
import style from './style.module.css'
import { AiOutlineMenu } from "react-icons/ai"
import SideMenu from '../sideMenu'
import { CButton } from '@coreui/react'
import User from '../user'
import { Context } from "../Provider"
import { NavLink, useNavigate } from "react-router-dom"

const Header = () => {
  const [active, setActive] = useState(false)
  const [{user}, {user: setUser}] = useContext(Context)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('user_jwt')
    setUser()
    navigate('/auth/login')
  }

  return <>
    <div className={style.header}>
      <div className={style.header_menu_burger}>
        <CButton  color="light" variant="outline" onClick={() => setActive(true)}>
          <AiOutlineMenu size={25}/>
        </CButton>
      </div>
    { user ? <User user={user} logout={logout}></User> :
    <NavLink to='auth/login'>login</NavLink> 
    }
    </div>
    <SideMenu active={active} hide={() => setActive(false)}></SideMenu>
  </>
}

export default Header