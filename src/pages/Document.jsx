import React, { useState, useEffect} from "react"
import style from './style.module.css'
import { CContainer } from '@coreui/react'
import { db } from '../db/index.js'
import DocumentHeader from './DocumentHeader.jsx'

const Document =  ({ id, children }) => {
  
  const [document, setDocument] = useState({})

  const update = async () => {
    setDocument(await db(`/documents`).get(`/${id}`))
  }

  const addResult = async (key, value) => {
    try {
      await db(`/documents/${id}`).post(`/result/${key}`, {value})
      update()
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => { !!id && update() }, [id])

  return <CContainer className={style.Praxis}>
    <DocumentHeader document={document}/>
    {children({...document, addResult })}
  </CContainer>
}

export default Document