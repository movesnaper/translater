import React from "react"
import { CRow, CCol, CCard, CCardBody, CCardFooter } from '@coreui/react'
import style from './style.module.css'


const CardLayout = ({ header, right, left, edit, footer }) => {

  return <CRow>
  <CCol>
    <CCard>
      <CCardBody className={style.card__body}>
        <CRow className={style.card__body__row}>
          <CRow className={style.card__body__value}> 
            {header.map((value, index) => <CCol key={index}>{value}</CCol>)}
          </CRow>
          { edit || <CRow>
            { <CCol className={style.card__body__left}> { left } </CCol>}
            { <CCol> { right } </CCol> }
          </CRow>}
        </CRow>
      </CCardBody>
      <CCardFooter> {footer} </CCardFooter>
      </CCard>
  </CCol>
</CRow>
}

export default CardLayout