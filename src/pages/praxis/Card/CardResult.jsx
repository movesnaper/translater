import React from "react";
import { CRow, CCol, CCardText } from '@coreui/react'
import style from './style.module.css'

const CardResult = ({ value, success }) => {
  const {dst, exm, pos } = value || {}
  const green = success && '#a9eba94a'

  return <div className={style.card__result}
    style={{ background: green || '#efbbbb9e' }}>
      <CRow>
        <CCol><CCardText> { pos } </CCardText></CCol>
      </CRow>
      <CRow>
        <CCol><CCardText> { dst } </CCardText></CCol>
      </CRow>
      <CRow card__result__exemple_row>
      <CCol>
      <div className={style.card__result__exemple_div}>{exm}</div>
      </CCol>
      </CRow>
    
  </div>
}

export default CardResult