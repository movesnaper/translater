import React from "react"
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

  return <div>{children(setResult)}</div>
}

export default Document