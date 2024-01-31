import React, { useState } from 'react'
import Table from '../../../components/table'
import DropDownBtn from '../../../components/dropDownBtn'
import { checkInputs } from '../../dictionary/table/schema'

import style from './style.module.css'

const ExcludesTable = ({ api, setItems }) => {
  const [values, setValues] = useState([])

  const update = (items) => {
    items.map((item) => values.splice(item.index, 1, item))
    setValues([...values])
  }

  const items = values.map((value, index) => ({...value, index }))
  const checked = items.filter(({checked}) => !!checked)

  const setValue = (value) => setItems(checked.map((item) => ({...item, value})))
    .then(() => setValues(items.filter(({checked}) => !checked)))

  return <div className={style.excludes__table}>
    <Table api={api} height={400} limit={10} 
    setItems={(items) => setValues([...values, ...items])}
    schema={{ items, header: [
      { title: '#', getValue: ({ index }) => index + 1 },
      { title: 'Id', getValue: ({ key, value }) => value?._id || key },
      {...checkInputs(update), title: <DropDownBtn schema={[
        { value: checked.length, menu: [
          { title: 'Remove', action: () => setValue(undefined) },
          { title: 'Return', action: () => setValue('') },              
        ] }
      ]}/> }
    ]}}/>  
  </div>
}

export default ExcludesTable