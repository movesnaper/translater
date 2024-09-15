import React, { useState } from 'react'
import Table from '../../../components/table'
import Modal from '../../../components/modal'
import style from './style.module.css'

const DictionaryTable = ({ api, schema }) => {
  const [values, setValues] = useState([])
  const [modal, setModal] = useState(false)

  const {modal: modalSchema, table} = schema({values, setModal}, (index, value)=> {
    value ? values.splice(index, 1, value) : values.splice(index, 1)
    setValues(values)
    setModal(false)
  })

  return <div className={style.pages__dictionary__layout}>
      <Table api={api} schema={{...table, setItems: (items) => setValues([...values, ...items])}}/>
    { Modal({ schema: modalSchema, modal, setModal })}
  </div>
}

export default DictionaryTable