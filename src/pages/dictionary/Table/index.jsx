import React, { useState } from 'react'
import Table from '../../../components/table'
import DropDownBtn from '../../../components/dropDownBtn'
// import { header } from './schema'
import Result from './TableResult'

import Modal from './TableModal'
import style from './style.module.css'

const DictionaryTable = ({ api, setItems }) => {
  const [modal, setModal] = useState(false)
  const [values, setValues] = useState([])

  const update = (value, index = modal) => {
    values.splice(index, 1, value)
    setValues([...values])
    setModal(false)
  }

  const modalFooter = <DropDownBtn schema={
    [{}, { title: 'Save', action: () => setItems(values[modal]).then(update), menu: [
      { title: 'remove',  action: () => setItems({...values[modal], value: null}).then(update)}
    ] }]}/> 

  return <div className={style.dictionary__table}>
    <Modal modal={values[modal]} setModal={setModal} footer={modalFooter}/>
    <Table api={api} height={350}
      schema={{
        setItems: (items) => setValues([...values, ...items]),
        header: ['#', 'id', 'Distanation', 'Result'],
        items: values.filter(({value}) => !!value).map(({ key, value }, index) => {
          const { _id = key, dst } = value || {}

          const setValue = (value) => {
            setItems({...values[index], value})
            .then((value) => update(value, index))
          }
        return { onClick: () => setModal(index), cells: [
          { value: index + 1},
          { value: _id},
          { value: dst},
          { value: dst && <Result value={value} 
            addResult={setValue}/>}
        ] }
      })
      }}/>
  </div>
}

export default DictionaryTable