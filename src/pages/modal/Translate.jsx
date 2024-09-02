import React from "react"
import Transcription from "../../components/cardHeader/CardTranscription.jsx"
import TranslateItems from '../../pages/TranslateItems'
import { CRow, CCol, CButton } from '@coreui/react'
import { db } from '../../db/index.js'
import style from './style.module.css'

const Translate = (service) => ({value, setValue}) => {
  
  const api = db(`/documents/translate/${service}/`)
  const { _id, key } = value || {}

  return <TranslateItems api={api} url={`id/${_id || key}`} 
  schema={ (item) => 
  <CRow className={style.card__edit___item}>
    <CCol xs={3} className={style.card__edit___item_id}>
      <CButton color="link" onClick={() => {
        setValue({...item, _id: _id || key})
      }}>{ _id || key }</CButton>
    </CCol>
    <CCol xs={5} className={style.card__edit___item_pos}>
      <span>{ item.pos}</span> 
      <Transcription value={item}/>
    </CCol>
    <CCol className={style.card__edit___item_dst}> { item.dst } </CCol>
  </CRow>
    }/>
}

export default Translate