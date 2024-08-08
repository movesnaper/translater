import React, {useState} from "react"
import { useParams } from 'react-router-dom'
import { db } from '../../db/index.js'
import style from './style.module.css'
import Modal from '../modal'
import Statistic from '../statistic'
const api = db(`/documents`)

const ComponentPage =  ({ children, statistic, schema }) => {
  const { id = '' } = useParams()
  const [modal, setModal] = useState(false)
  const setResult = async (value) => {
    try {
      await api.post(`/results/${id}`, {value})
      setModal(false)
    } catch(e) {
      console.log(e);
    }
  }

  return <div className={style.component__page}>
    <Statistic id={id} api={api} schema={statistic}>
        { (info, update) => info && children({
          id,
          modal,
          update: (v) => update(v).then(() => setModal(false)), 
          setModal,
          setResult: (v) => setResult(v).then(() => update())
          }) }
      </Statistic>
    { Modal({ schema, modal, setModal })}
  </div>
}

export default ComponentPage