import React from "react";
import { CFormCheck, CCol } from '@coreui/react'
import style from './Praxis.module.css'

const CardRandom = ({ card, next }) => {

  const getValue = (str = '') => {
    const random = () => 0.5 - Math.random()
    const [dst] = str.split(/,|;/).sort(random)
    return dst.trim()
  }

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