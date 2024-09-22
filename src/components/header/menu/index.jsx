import React from "react";
// import DocTitle from "../../docTitle";
import DropDownBtn from '../../dropDownBtn'

// import style from './style.module.css'

const Menu = ({title, menu}) => {
    return [
        <div key='header__menu__title'>{title}</div>,
        <div key='header__menu__drop_down_btn'><DropDownBtn schema={[{ title, menu }]}/></div>
    ]
}

export default Menu