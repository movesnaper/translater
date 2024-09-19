import React from "react";
import { AiFillHome } from "react-icons/ai"
import { NavLink } from "react-router-dom"
// import style from './style.module.css'

const HeaderLogo = () => {
    return <NavLink to='/'><AiFillHome size={25}/></NavLink>
}

export default HeaderLogo