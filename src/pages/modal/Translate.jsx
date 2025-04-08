import React, { useState, useEffect } from "react"
import Transcription from "../../components/cardHeader/CardTranscription.jsx"
import TranslateItems from '../../pages/TranslateItems'
import { CRow, CCol, CButton } from '@coreui/react'
import { db } from '../../db/index.js'
import style from './style.module.css'

const Translate = ({value, setValue}) => {
  
  const api = db(`/documents/translate/lingvo/`)
  const { _id, key, uid } = value || {}
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const update = async () => {
    try {
      setLoading(true)
      setItems(await api.get(`id/${_id || key}`))
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    console.log(_id, key);
    
    (_id || key) && update()
  }, [_id || key])
  return <TranslateItems items={items} loading={loading}
  schema={ (item) => 
  <CRow className={style.card__edit___item}>
    <CCol xs={3} className={style.card__edit___item_id}>
      <CButton color="link" onClick={() => {
        setValue({...item, _id: _id || key, uid})
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