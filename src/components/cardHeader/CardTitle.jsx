import React from "react";
import Badge from "./Badge"
import style from './style.module.css'

  const CardTitle = ({ value }) => {
    const { key, _id } = value || {}

  return <div className={style.card__title}>
    <div >{key || _id}</div>
    {value && <Badge  value={value}></Badge>}
  </div>

}


export default CardTitle