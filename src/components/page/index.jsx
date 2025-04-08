import React, {useContext, useState, useEffect} from "react"
import Header from './header'
import { Context } from "../Provider"
import { db } from '../../db/index.js'
import style from './style.module.css'
const api = db(`/documents`)

const ComponentPage =  ({ schema, menu = () => {} }) => {

  const [state, setState] = useState({})

  const [{ doc_id: id, user }, { menu: setMenu }] = useContext(Context)


  const update = async () => {
    try {
      const info = await api.get(`/info/${id}`)
      setState({...state, info, id})
      setMenu({...info, menu: menu(id)})
    }catch (err) {
      console.error(err);
    }
  }
  useEffect(() => { id && update() }, [id])

  const {header, content, footer} = schema({...state, id, update}, (value) => {
    // setState({...state, [key]: value})
    setState(Object.assign(state, value))
  })
  
  return <div className={style.component__page}>
    <div className={style.component__page__header}>
      {state.info && <Header schema={{...state.info }} settings={header}/>}
    </div>
    <div className={style.component__page__content}>{state.info && content}</div>
    <div className={style.component__page__footer}>{state.info && footer}</div>
  </div>
}

export default ComponentPage