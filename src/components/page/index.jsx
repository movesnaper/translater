import React, { useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useOutletContext } from "react-router-dom";

import { CSpinner } from '@coreui/react'
import ShowModal from '../modal'
import Modal from '../../pages/modal'
import Header from './header'
import { db } from '../../db/index.js'
import style from './style.module.css'
const api = db(`/documents`)

const ComponentPage =  ({ schema }) => {
  const { id = '' } = useParams()
  const [state, setState ] = useOutletContext({})
  const page = state[id] || {}

  const setPage = (key, value) => {
    const obj = value || JSON.parse(localStorage.getItem(key))
    if (obj) localStorage.setItem(key, JSON.stringify(obj))
      setState({ [key]: obj })
  }

  const setModal = (modal) => {
    setState({ modal })
  }

  const update = async () => {
    try {
      const info = await api.get(`/info/${id}`)
      setState({ info, menu: menu(id) })
    } catch (err) {
      console.error(err);
    } 
  }
  const setResult = async ({ key, ref: value, values }) => {
      const activeUid = values.filter(({ uid, active }) => uid || active !== undefined)
        .map((v) => ({...v, _id: value || key}))
    try {
      return api.post(`/text/${id}`, { key, value, values:  activeUid})
      .then(update)
    } catch(e) {
      console.error(e);
    }
  }


  const {header, content, footer, menu} = schema({...state, page, setResult, setModal, setPage: (key, value) => {
    return setPage(id, {...page, [key]: value})
    
  } })

  useEffect(() => {
    if (id) {
      setPage(id)
      update()
    }
  }, [id])
  
  return <div className={style.component__page}>
    <div className={style.component__page__header}>
      {!state.loading && <Header schema={state.info} settings={header}/>}
    </div>
    <div className={style.component__page__content}>{
    state.info ? content : <div className={style.component__spiner}>
      <CSpinner aria-hidden="true"></CSpinner>
    </div>
      }</div>
    <div className={style.component__page__footer}>{state.info && footer}</div>
    { ShowModal({ schema: Modal, modal: state.modal, setModal })}
  </div>
}

export default ComponentPage