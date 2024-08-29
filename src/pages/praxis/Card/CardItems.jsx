import React from "react";
import style from './style.module.css'
import { CFormCheck } from '@coreui/react'

const CardItems = ({ checked, items, addResult, disabled }) => {

  const schema = ({ _id, dst }) => {
    return {
      label: dst,
      checked: checked === _id,
      select: () => !checked && addResult(_id)
    }
  }
  return <div className={style.card__items}>
{items && items.map((value, index) => {
    const { select, label, checked } = schema(value)
    return  <div className={ style.FormCheckItem } key={index} 
    onClick={select}>
      {<CFormCheck id={`form_check_${index}`} label={label} 
      className={ style.card__random__values__form_check }
      defaultChecked={checked }
      disabled={disabled || !!checked}/>}
    </div>
  })    }
  </div>

}


export default CardItems