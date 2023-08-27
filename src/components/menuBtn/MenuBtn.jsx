import React, {useState} from "react";
import style from './MenuBtn.module.css'
import { AiOutlineMenu } from "react-icons/ai";


const MenuBtn = () => {
  const [nav, setNav] = useState(false)
  return <div className={style.menu_btn} onClick={() => setNav(!nav)}>
    { !nav && <AiOutlineMenu/>}
  </div>
}

export default MenuBtn