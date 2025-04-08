import React, { useState, useEffect } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { CRow, CCol, CFormInput } from '@coreui/react'
import { NavLink } from "react-router-dom"
import CardBtn from './CardBtn'
import CardInfo from './CardInfo'
import style from './style.module.css'

const DocumentCard =  ({ doc, loading }) => {
  const [title, setTitle] = useState('')
  const { id, info, upload, save } = doc || {}
  // const { id, info, upload, save } = doc || {}
  console.log(id);
  
  const titleLinck = id &&
    <NavLink className={style.document__card__title} to={`/text/${id}`}>{title}</NavLink>
  
    const btnUpload = upload && <CardBtn loading={loading} 
      schema={{title: 'Add', onClick: upload}}/>

  useEffect(() => { 
    doc.title && setTitle(doc.title) 
  }, [doc.title])

 return <CCard className={style.document__card}>
  <CCardBody>
    <CRow>{ 
    titleLinck || !upload && <CFormInput value={title} onInput={({target}) => setTitle(target.value)}/>
    }</CRow>
    <CRow>{ info && <CardInfo value={info}/>}</CRow>
    <CRow>{ btnUpload || !id && <CardBtn loading={loading} 
      schema={{title: 'Save', onClick:() => save({...doc, title })}}/>}</CRow>
  </CCardBody>
</CCard>
}

export default DocumentCard