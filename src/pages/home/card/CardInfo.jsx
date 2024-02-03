import React from "react"
import style from './style.module.css'

const CardInfo = ({ value }) => {
  const keys = ['keys', 'results', 'total']

  return <div className={style.card__info}>
    { keys.map((key) => {
      return <div>{key} <span className={style.card__info__value}>{value[key]}</span></div>
    })}
  </div>
}

export default CardInfo