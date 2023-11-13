import React from "react";
import { CFormCheck, CCol } from '@coreui/react'
import style from './Praxis.module.css'

const CardRandom = ({ card, next }) => {



  return  <CCol className={ style.card__values }>
  { card.random.map(({ _id, dst }, i) => {
    return <CFormCheck key={ i } label={ getValue(dst) }
    defaultChecked={ card.result === _id }
    disabled={ !!card.result }
    onChange={ () => next(_id) }
    />
  }) }
</CCol>
}

export default CardRandom