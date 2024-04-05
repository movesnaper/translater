import React from "react"
import { CRow, CCol, CCard, CCardBody, CCardFooter } from '@coreui/react'
import style from './style.module.css'

const CardLayout = ({ header, right, left, footer }) => {

  return <CCard className={style.card__layout}>
    <CCardBody className={style.card__body}>
      <CRow className={style.card__body__row}>{header}
        <CRow className={style.card__body__content}>
          { <CCol className={style.card__body__left}> { left } </CCol>}
          { <CCol> { right } </CCol> }
        </CRow>
      </CRow>
    </CCardBody>
    <CCardFooter>{footer}</CCardFooter>
  </CCard>
}

export default CardLayout