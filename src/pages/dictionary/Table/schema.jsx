import React from 'react'
import CheckInput from '../../../components/checkInputs'
import Result from './TableResult'

export const checkInputs = (update) => {
  return { style: { width: '20px' },
  getValue: (item) => <CheckInput checked={!!item.checked}
    onCheck={(checked) => update([{...item, checked}])}/>}
}
  
export const header = (update) => {
   return    [ { title: '#', getValue: ({index}) => index + 1 },
   { title: 'Id', getValue: ({ key, value }) => value?._id || key },
   { title: 'Distanation', getValue: ({ value }) => value?.dst },
   { title: 'Result', getValue: (item) => <Result value={item.value} 
       addResult={(value) => update([{...item, value}])}/>},
   ]
  }
