import React from "react";
import { CRow, CCol, CFormInput, CFormTextarea, CCardText, CButton } from '@coreui/react'
import DropDownBtn from '../../DropDownBtn'
import style from './style.module.css'
import TranslateItems from '../../TranslateItems.jsx'
import { db } from '../../../db'

const CardEdit = ({ card, schema }) => {
  const { key, value = {}, setCard } = card || {}

  const url = value._id ? `id/${value._id}` : `key/${key}`

  const setValue = (value) => {
    const {_id: item} = value
    return setCard({...card, value, item})
  }

  return <div className={style.card__edit}>
    <CRow>
      <CCol className={style.card__edit__input}>
        <CFormInput value={ value._id } 
          onInput={({target}) => setValue({...value, _id: target.value})}/>
        <div className={style.card__edit__input__btn}>
          <DropDownBtn  schema={schema}/>
        </div>

      </CCol>
      <CCol>
        <CFormTextarea rows={2} value={value.dst}
          onInput={({target}) => setValue({...value, dst: target.value})}/>
      </CCol>
    </CRow>
    <CRow className="mt-2">
    <TranslateItems api={db(`/documents/translate/`)} url={url} schema={[
      (value) => <CButton color="link" onClick={() => setValue(value)}> {value._id } </CButton>,
      ({pos}) => pos && <CCardText> { pos } </CCardText>,
      ({trc}) => trc && <CCardText> { trc } </CCardText>,
      (value) => <CCardText> { value.dst } </CCardText>
    ]}/>
    </CRow>
  </div>
}

export default CardEdit