import { CRow, CCol } from '@coreui/react'
import style from './style.module.css'

const CardHeader = ({ schema }) => {

  return <CRow className={style.card__header}> 
  { schema.map(({ xs, component}, index) =>
    <CCol xs={xs} key={index}>{component}</CCol>)}
</CRow>
}

export default CardHeader