import React from "react";
import { NavLink } from 'react-router-dom'
import { CRow, CCol, CProgress, CProgressBar, CProgressStacked } from '@coreui/react'

const PraxisCardHeader = ({schema}) => {
  const {id, title, keys, results, total} = document

  return  <CRow>
  <CCol>
    <NavLink color="light" to={`/dictionary/${id}`}>{title}</NavLink>
  </CCol>
  <CCol>
  <CProgressStacked>
    <CProgress color="secondary" value={50}> keys: {keys} </CProgress>
    <CProgress color="primary" value={50}> results: {results} </CProgress>
  </CProgressStacked>
    {/* keys: {keys} Results: {results} */}
  </CCol>
  <CCol>
    <CProgress color={ total < 75 ? 'info' : 'success'} value={+ total}>
      <CProgressBar className="text-dark">{total}%</CProgressBar>
    </CProgress>
  </CCol>
</CRow>
}

export default PraxisCardHeader