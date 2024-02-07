import React from "react"
import style from './style.module.css'

const CardInfo = ({ value }) => {
  const keys = ['keys', 'results', 'total']

  return <div className={style.card__info}>
    { keys.map((key, index) => {
      return <div key={index}>{key} <span className={style.card__info__value}>{value[key]}</span></div>
    })}
  </div>
}

export default CardInfo