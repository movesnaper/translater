import React from 'react'
import CheckInput from '../../../components/checkInputs'
import Result from './TableResult'

export const checkInputs = (update) => {
  return { style: { width: '20px' },
  getValue: (item) => <CheckInput checked={!!item.checked}
    onCheck={(checked) => update([{...item, checked}])}/>}
}

  
export const header = (update) => {
  const dst = ({ dst, exclude } = {}) => 
    dst || exclude && <span style={{color: 'red'}}>Exclude</span>
   return    [ { title: '#', getValue: (v, index) => index + 1 },
   { title: 'Id', getValue: ({ key, value }) => value?._id || key },
   { title: 'Distanation', getValue: ({ value }) => dst(value) },
   { title: 'Result', getValue: (item) => <Result value={item.value} 
       addResult={(value) => update({...item, value})}/>},
   ]
  }
