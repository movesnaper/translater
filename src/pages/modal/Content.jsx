import { CRow, CCol } from '@coreui/react'
// import style from './style.module.css'

const Content = ({ schema }) => {

  return <> 
  { schema.map(({ component, sx}, index) =>
    <CRow key={index}>
      <CCol sx={sx}>{component}</CCol>
    </CRow>)}
</>
}

export default Content