import React from "react";
import { CRow, CCol, CFormTextarea, CButton } from '@coreui/react'
import Transcription from "./CardTranscription"
import Autocomplete from '../../Autocomplete'
import style from './style.module.css'
import TranslateItems from '../../TranslateItems.jsx'
import { db } from '../../../db'

const CardEdit = ({ card }) => {
  const { key, value = {}, setCard } = card || {}
  const api = db(`/documents/translate/`)

  const setValue = (value) => {
    const {_id: item} = value
    return setCard({...card, value, item})
  }

  return <div className={style.card__edit}>
    <CRow>
      <CCol className={style.card__edit__input}>
        <Autocomplete api={api} url={`key/${value._id || key}`}
        value={value._id || key}
        setValue={({ value: target, _id }) => setValue({...value, _id: target ||_id })}
        schema={ (item) => <div className={style.card__edit__autocomplete_item}
        onClick={() => setValue(item)}> { item._id } { item.dst } </div> }/>
      </CCol>
      <CCol>
        <CFormTextarea rows={2} value={value.dst}
          onInput={({target}) => setValue({...value, dst: target.value})}/>
      </CCol>
    </CRow>
    <CRow className="mt-2">
      <CCol>
        <TranslateItems api={api} url={`id/${value._id || key}`} schema={ (item) => <CRow>
          <CCol xs={3}>
            <CButton color="link" onClick={() => setValue(item)}> {item._id } </CButton>
          </CCol>
          <CCol xs={4} className={style.card__edit___item_pos}>
            <span>{ item.pos}</span> 
            <Transcription value={item}/>
          </CCol>
          <CCol> { item.dst } </CCol>
        </CRow>
          }/>
      </CCol>
    </CRow>
  </div>
}

export default CardEdit