import React, { useState } from 'react'
import Table from '../../../components/table'
import style from './style.module.css'

const DictionaryTable = ({ api, schema }) => {
  const [values, setValues] = useState([])
  return <div className={style.dictionary__table}>
    <Table api={api}
      schema={{
        setItems: (items) => setValues([...values, ...items]),
        header: ['#', 'id', 'Distanation', 'Result'],
        items: values.map((value, index) => {
          const update = (index, value) => {
            value ? values.splice(index, 1, value) : values.splice(index, 1)
            setValues(values)
          }
        return schema(value, index, update)
      })
      }}/>
  </div>
}

export default DictionaryTable