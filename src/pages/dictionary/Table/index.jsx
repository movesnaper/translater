import React, { useState } from 'react'
import Table from '../../../components/table'
import DropDownBtn from '../../../components/dropDownBtn'
import { header, checkInputs } from './schema'
import Modal from './TableModal'
import style from './style.module.css'

const DictionaryTable = ({ api, setItems }) => {
  const [modal, setModal] = useState(false)
  const [values, setValues] = useState([])

  const update = (items) => {
    items.map((item) => values.splice(item.index, 1, item))
    setValues([...values])
    setModal(false)
  }

  const modalFooter = <DropDownBtn schema={
    [{}, { title: 'Save', action: () => setItems([modal]).then(update) }]}/> 
  const items = values.map((item, index) => ({...item, index }))
  const checked = items.filter(({checked}) => !!checked)

  const setValue = (value) => setItems(checked.map((item) => ({...item, value})))
    .then(() => setValues(items.filter(({checked}) => !checked)))

  return <div className={style.dictionary__table}>
    <Modal modal={modal} setModal={setModal} footer={modalFooter}/>
    <Table api={api} height={400} limit={10}
      setItems={(items) => setValues([...values, ...items])}
      schema={{ items, onClick: setModal, header: [ 
        ...header((items) => setItems(items).then(update)), 
        {...checkInputs(update), title: <DropDownBtn schema={[
          { value: checked.length, menu: [
            { title: 'Remove', action: () => setValue(undefined) },
            { title: 'Exclude', action: () => setValue('exclude') }           
          ] }
        ]}/> } 
        ]
      }}/>
  </div>
}

export default DictionaryTable