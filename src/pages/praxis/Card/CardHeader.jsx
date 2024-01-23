import { CRow, CCol } from '@coreui/react'


const CardHeader = ({ schema }) => {

  return <CRow> 
  { schema.map((value, index) => <CCol key={index}>{value}</CCol>)}
</CRow>
}

export default CardHeader