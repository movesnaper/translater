import React from "react"
import style from './style.module.css'
import { CContainer } from '@coreui/react'
import { db } from '../db/index.js'
const api = db(`/documents`)

const Document =  ({ children }) => {

  const setResult = async (items) => {
    try {
    const results = items.reduce((cur, { doc_id, key, value }) => {
      return {...cur, [doc_id]: [...cur[doc_id] || [], {key, value}]}
    }, {})
      await api.post(`/results`, results)
    } catch(e) {
      console.log(e);
    }
  }

  return <CContainer className={style.Praxis}>{children(setResult)}</CContainer>
}

export default Document