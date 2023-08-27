import React from "react";
import style from './SideMenu.module.css'
import { AiOutlineClose } from "react-icons/ai"
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as coreUi from '@coreui/icons'
import { NavLink } from "react-router-dom"

const SideMenu = ({active, hide}) => {
  return  <div className={[style.SideMenu, active && style.active].join(' ')}>
  <div className="d-md-flex justify-content-md-end p-3">
    <CButton  color="light" variant="outline" onClick={hide}>
      <AiOutlineClose size={25}></AiOutlineClose>
    </CButton>
  </div>
  <ul className={style.menu}>

    {[
      { to: '/', text: 'Ru-En словарь'}, 
      { to: '/favorit', text: 'Избранное', icon: 'cibApacheSpark'}, 
      { to: '/dictionary', text: 'словарь', icon: 'cibApacheSpark'}, 
      { to: '/story', text: 'история', icon: 'cilHistory'}, 
      { to: '/praxis', text: 'упражнения', icon: 'cibGooglesCholar'}, 
      { to: '/settings', text: 'настройки', icon: 'cilCog'}, 

      
    ].map(({ to, text, icon, color}, i) => {
      return <li key={i} className={style.menu__li} >
          {<NavLink to={to} onClick={hide} className={({isActive}) => isActive ? style.activeLink : ''}>
            <div className="gap-5 d-md-flex items-center" >
              {<CIcon className={color} size='xxl' icon={coreUi[icon]}/>}
              {text}
            </div>
          </NavLink>}
      </li>
    })}
  </ul>
</div>
}

export default SideMenu