import React from "react";
import style from './style.module.css'
import Badge from "./Badge"

  const CardTitle = ({ value }) => {
    const { key, _id } = value || {}
    

  return <div className={style.card__title}>
    <h3>{key || _id}</h3>
    {value && Badge({value})}
  </div>

}


export default CardTitle