import { CRow, CCol } from '@coreui/react'
import React from "react";

const Content = ({ schema }) => {

  return <> 
  { schema.map(({ component, sx}, index) =>
    <CRow key={index}>
      <CCol sx={sx}>{component}</CCol>
    </CRow>)}
</>
}

export default Content