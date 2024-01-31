
import React from "react"
import { CFormCheck } from '@coreui/react'
import style from './style.module.css'

const TableResult = ({ value, addResult }) => {
  const { result = 0 } = value || {}
  const button = { color: 'primary', variant: 'outline' }
  const checked = + result >= 10
  
  const handleClick =(evt) => {
    evt.stopPropagation()
    addResult({...value, result: + result < 10 ? 10 : 0 })
  }

  return <div className={style.table__result} onClick={handleClick}>
    <CFormCheck button={button} label={result + ""} defaultChecked={checked}/>      
  </div> 

}

export default TableResult