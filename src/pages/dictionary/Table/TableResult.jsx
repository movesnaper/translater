
import React from "react"
import { CFormCheck } from '@coreui/react'

const TableResult = ({ value, addResult }) => {
  const {_id, result} = value || {}
  const label = (result || 0).toString()
  const button = { color: 'primary', variant: 'outline' }
  const checked = result >= 10
  
  const setResult =(evt) => {
    evt.stopPropagation()
    addResult({...value, result: result < 10 ? 10 : 0 })
  }

  return !!_id && <div onClick={setResult}>
    <CFormCheck button={button} label={label} defaultChecked={checked}/>      
  </div> 
}

export default TableResult