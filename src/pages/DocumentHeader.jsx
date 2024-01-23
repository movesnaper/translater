import React from "react";
import { NavLink } from 'react-router-dom'
import style from './style.module.css'
import { CRow, CCol, CProgress, CProgressBar, CProgressStacked } from '@coreui/react'

const DocumentHeader = ({ document }) => {
  const {id, title = '', keys, results, total} = document || {}

  const cardTitle = title.length < 10 ? title : `...${title.substr(title.length - 10)}`

  const totalValue = total > 15 ? total : 15

  return <CRow className={style.document__header__title}>
  <CCol xs={2}>
    <NavLink color="light" to={`/dictionary/${id}`}>{cardTitle}</NavLink>
  </CCol>
  <CCol>
  <CProgressStacked>
    <CProgress color="secondary" value={50}> keys: {keys} </CProgress>
    <CProgress color="primary" value={50}> results: {results} </CProgress>
  </CProgressStacked>
  </CCol>
  <CCol>
    <CProgress color={ total < 75 ? 'info' : 'success'} value={totalValue}>
      <CProgressBar className="text-dark">{total} %</CProgressBar>
    </CProgress>
  </CCol>
</CRow>
}

export default DocumentHeader