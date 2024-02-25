import React from "react"
import { db } from '../../db/index.js'
import style from './style.module.css'
const api = db(`/documents`)

const ComponentPage =  ({ children }) => {

  const setResult = async ({index, value }) => {
    try {
      return api.post(`/results`, {index, value })
    } catch(e) {
      console.log(e);
    }
  }

  return <div className={style.component__page}>{
    children(setResult)
  }</div>
}

export default ComponentPage