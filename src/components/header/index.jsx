import React, { useState, useContext  } from 'react'
import style from './style.module.css'
import { AiOutlineMenu } from "react-icons/ai"
import SideMenu from '../sideMenu'
import { CButton } from '@coreui/react'
import User from '../user'
import { UserContext } from "../UserProvider.jsx"
import { NavLink, useParams, useNavigate } from "react-router-dom"

const Header = () => {
  const [active, setActive] = useState(false)
  const [user, setUser] = useContext(UserContext)
  const {action} = useParams()
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
    { user ? <User user={user} logout={logout}></User>  
      : <div className={style.auth}>
          { action === 'login' ? <NavLink to='auth/register'> register </NavLink>
          : <NavLink to='auth/login'> login </NavLink> }
      </div>
    }
    </div>
    <SideMenu active={active} hide={() => setActive(false)}></SideMenu>
  </>
}

export default Header