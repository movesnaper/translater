import React from "react";
import DropDownBtn from '../dropDownBtn'
import style from './style.module.css'

const DocTitle = ({title, menu}) => {
  return <div className={style.components__doc__title}>
    <div>{title}</div>
    <div><DropDownBtn schema={[{ menu }]}/></div>
  </div>
}

export default DocTitle