import React, { useState } from 'react'
import Table from '../../../components/table'
// import { header } from './schema'

import style from './style.module.css'

const DictionaryTable = ({ api, setItems, children, schema }) => {
  const [values, setValues] = useState([])

  const update = (value, index) => {
    values.splice(index, 1, value)
    setValues([...values])
    // setModal(false)
  }



  return <div className={style.dictionary__table}>
    {children(values)}
    <Table api={api} height={350}
      schema={{
        setItems: (items) => setValues([...values, ...items]),
        header: ['#', 'id', 'Distanation', 'Result'],
        items: values.filter(({value}) => !!value).map((value, index) => {
          

          const update = (value) => {
            setItems({...values[index], value})
            .then((value) => update(value, index))
          }
        return schema({...value, index }, update)
      })
      }}/>
  </div>
}

export default DictionaryTable