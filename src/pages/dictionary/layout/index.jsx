import React, { useState } from 'react'
import Table from '../../../components/table'
import Modal from '../../../components/modal'

import style from './style.module.css'

const DictionaryTable = ({ api, schema }) => {
  const [values, setValues] = useState([])
  const [modal, setModal] = useState(false)

  const {modal: modalSchema, content} = schema({setModal})

  return <div className={style.pages__dictionary__layout}>
    <Table api={api} schema={{
        setItems: (items) => setValues([...values, ...items]),
        header: ['#', 'id', 'Distanation', 'Result'],
        items: values.map((value, index) => {
        return content(value, index, (index, value) => {
          value ? values.splice(index, 1, value) : values.splice(index, 1)
          setValues(values)
          setModal(false)
        })
      })
      }}/>
    { Modal({ schema: modalSchema, modal, setModal })}
  </div>
}

export default DictionaryTable