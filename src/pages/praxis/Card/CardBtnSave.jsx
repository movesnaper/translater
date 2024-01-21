import React from "react";
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import style from './style.module.css'


const CardBtnSave = ({ value, onClick }) => {
  const { _id, dst } = value || {}
  return <div className={style.card__btn_save}>
    <CButton disabled={!_id || !dst} onClick={onClick}>
    <CIcon icon={cilSave} size="xl"/>
  </CButton>
  </div>
}

export default CardBtnSave