
import React from "react"
import { CFormCheck } from '@coreui/react'
import style from './style.module.css'

const CheckInput = ({ checked, onCheck }) => {
  
  const handleClick =(evt) => {
    evt.stopPropagation()
    onCheck(!checked)
  }

  return <div className={style.check_inputs} onClick={handleClick}>
    <CFormCheck defaultChecked={checked}/>      
  </div> 
}

export default CheckInput