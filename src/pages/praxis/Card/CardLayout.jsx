import React from "react"
import { CRow, CCard, CCardBody, CCardFooter } from '@coreui/react'
import style from './style.module.css'

const CardLayout = ({ header, body, footer }) => {

  return <CCard className={style.card__layout}>
    <CCardBody className={style.card__body}>
        {header}
        {body()}
    </CCardBody>
    <CCardFooter>{footer}</CCardFooter>
  </CCard>
}

export default CardLayout