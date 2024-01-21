import React from "react";
import { CRow } from '@coreui/react'
import style from './style.module.css'

const CardResult = ({ value, success }) => {
  const {dst, exm, pos } = value || {}
  const green = success && '#a9eba94a'

  return <div className={style.card__result}
    style={{ background: green || '#efbbbb9e' }}>
    <div className={style.card__result__pos}> {pos} </div>
    <div className={style.card__result__dst}> <h5>{dst}</h5> </div>
    <div className={style.card__result__exm}>{exm}</div>
  </div>
}

export default CardResult