
import React, { useState } from "react"
import { CFormCheck } from '@coreui/react'
import style from './style.module.css'

const TableResult = ({ value, addResult }) => {
  const [loading, setLoading] = useState(false)
  const { result = 0, dst, exclude } = value || {}
  const resultValue = + result < 10 ? 10 : 0
  
  const button = { color: 'primary', variant: 'outline' }
  const checked = (+ result >= 10) || !!exclude
  
  const handleClick = async(evt) => {
    evt.stopPropagation()
    setLoading(true)

    !dst || exclude ? await addResult({...value, active: !exclude, exclude:  !exclude }) :
     await addResult({...value, result:  resultValue})
    setLoading(false)
  }
  const label = dst ? result + "" : 'ex'
  
  return <div className={style.table__result} onClick={handleClick}>
    <CFormCheck disabled={loading} button={button} label={label} defaultChecked={checked}/>      
  </div> 

}

export default TableResult