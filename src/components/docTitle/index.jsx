import React from "react";
import DropDownBtn from '../dropDownBtn'
import style from './style.module.css'

const DocTitle = ({title, action, menu}) => {
  return <div className={style.components__doc__title}>
    {/* <div>{title}</div> */}
    <div><DropDownBtn schema={[{ title, action, menu }]}/></div>
  </div>
}

export default DocTitle