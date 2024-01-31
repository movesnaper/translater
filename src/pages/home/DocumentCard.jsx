import React from "react"
import { CCard, CCardBody, CButton, CSpinner } from '@coreui/react'
import { CRow, CCol } from '@coreui/react'
import { NavLink } from "react-router-dom"

const DocumentCard =  ({ doc, loading, upload, save }) => {
  const { _id, title, file, btn } = doc || {}
  const uploadBtn = btn && <CButton disabled={loading} onClick={upload}>{btn}</CButton>
  const saveBtn = file && <CButton disabled={loading} onClick={() => save(file)}>Save</CButton>
  const titleLinck = title && <NavLink component="span" to={`/dictionary/${_id}`}> {title} </NavLink>
  return <CCard>
  <CCardBody>
    <CRow>{ uploadBtn || titleLinck || file.name }</CRow>
    <CRow>{ saveBtn }</CRow>
    {/* <CSpinner component="span" size="sm" aria-hidden="true"/> */}
  </CCardBody>
</CCard>
}

export default DocumentCard