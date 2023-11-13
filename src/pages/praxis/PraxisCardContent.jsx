import React, { useState } from "react";
import Timer from "./Timer"
import style from './Praxis.module.css'
import { CRow, CCol, CCardText, CButton } from '@coreui/react'
import CardRandom from './CardRandom'

const PraxisCardContent = ({ card, next }) => {
  const [active, setActive] = useState(false)


  return  <CRow className={style.card__body__row}>
  <CRow className={style.card__body__value}>
    <CCol><h2>{ card._id || card.key }</h2></CCol>
    <CCol className="d-flex justify-content-end">
    <CButton className={style.timer_btn} onClick={() => setActive(!active)}>
      <Timer active={active} next={() => next(-1)}></Timer>
    </CButton>
    </CCol>
  </CRow>
 <CCol style={!card.result ? {} : card.result === card._id ? {
   background: '#a9eba94a' } : { background: '#efbbbb9e' }}
 className={style.card__body__left}>
   { card.result && <CCardText className={style.card__translate}>
      {card.dst }
    </CCardText> }
 </CCol>
 <CardRandom card={card} next={next}/>
</CRow>

}

export default PraxisCardContent