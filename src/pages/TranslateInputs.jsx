import React from "react";
import { CRow, CCol, CFormInput, CFormTextarea } from '@coreui/react'
import style from './style.module.css'

const TranslateInputs = ({ value = {}, setValue }) => {

  return  <CRow>
  <CCol className={style.distanation__items__input_col}>
    <CFormInput value={value._id} onInput={({target}) => setValue({...value, _id: target.value})}/>
  </CCol>
  <CCol>
    <CFormTextarea rows={2} 
    value={value.dst}
    text=", || ; separated"
    onInput={({target}) => setValue({...value, dst: target.value})}/>
  </CCol>
</CRow>  
}

export default TranslateInputs