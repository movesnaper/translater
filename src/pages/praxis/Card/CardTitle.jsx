import React from "react";
import { CBadge } from '@coreui/react'
import style from './style.module.css'

  const CardTitle = ({ value }) => {
    const { key, _id, result } = value || {}

  const info = result < 10 && 'info'

  return <h3 className={ style.card__title }> 
    { key || _id }
    <CBadge color={info || 'success'} position="top-end" shape="rounded-pill">
      { result } 
    </CBadge>
  </h3>
}


export default CardTitle