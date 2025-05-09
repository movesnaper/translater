import React from "react";
import { CBadge } from '@coreui/react'
import style from './style.module.css'

const Badge = ({value}) => {
  const {result} = value || {}
  const info = result < 10 && 'info'

  return <div className={style.card__header__bage}>
    <CBadge color={info || 'success'} >
  { result } 
</CBadge>
  </div>
}

export default Badge