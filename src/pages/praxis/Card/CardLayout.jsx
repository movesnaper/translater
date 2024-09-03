import React from "react"
import { CRow, CCard, CCardBody, CCardFooter } from '@coreui/react'
import style from './style.module.css'

const CardLayout = ({ header, body, footer }) => {

  return <CCard>
    <CCardBody >
        {header}
        {body()}
    </CCardBody>
    <CCardFooter>{footer}</CCardFooter>
  </CCard>
}

export default CardLayout