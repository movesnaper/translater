import React, {useState} from "react";
import style from './Header.module.css'
import { AiOutlineMenu } from "react-icons/ai";
import SideMenu from '../sideMenu/SideMenu.jsx';
import { CButton } from '@coreui/react';

const Header = () => {
  const [active, setActive] = useState(false)
  return <>
    <div className={style.header}>
      <div className="p-3">
        <CButton  color="light" variant="outline" onClick={() => setActive(true)}>
          <AiOutlineMenu size={25}/>
        </CButton>
      </div>      
      <ul className={style.menu}>
        <li> test </li>
        <li> test </li>
      </ul>
    </div>
    <SideMenu active={active} hide={() => setActive(false)}></SideMenu>
  </>
}

export default Header