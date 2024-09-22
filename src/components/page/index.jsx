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
      setState({...info, id})
      setMenu({...info, menu: menu(id)})
    }catch (err) {
      console.error(err);
    }
  }
  useEffect(() => { id && update() }, [id])

  const {content, settings = []} = schema({...state, id, update}, (key, value) => setState({...state, [key]: value}))

  return state && <div className={style.component__page}>
    <div className={style.component__page__header}>
      <Header schema={{...state }}/>
    </div>
    <div className={style.component__page__content}>{content}</div>
  </div>
}

export default ComponentPage