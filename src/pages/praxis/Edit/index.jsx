import React, {useState, useEffect} from "react";
import { CRow, CCol, CButton, CFormInput, CFormTextarea } from '@coreui/react'
import style from './style.module.css'

const CardEdit = ({value, setValue}) => {
  const { key, } = value || {}
  // const params = { api, url: `translate/${key}`}
  // const schema = [
  //   (v) => <CButton color="link" onClick={() => setValue(v)}> {v?._id} </CButton>,
  //   (v) => v?.dst
  // ]
  return <CRow>
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

export default CardEdit