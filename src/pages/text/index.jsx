import React, {useState} from "react"
import Page from '../../components/page'
import Layout from './layout'
import { dropDowvNavs } from '../../components/statistic'
import Modal from './modal'
import TooltipSpan from './layout/TooltipSpan'

import { db } from '../../db'
const api = db(`/documents`)

const TextPage =  () => {
  const [state, setState ] = useState({ values: [], obj: {}, mark: null })

  const setResult = async({key, value}, ref, mark) => {
    const values = value.filter(({_id}) => !!_id) 
    try {
      await api.post(`/text`, { key, ref, values })
      const obj = {...state.obj, [key]: values, [ref]: values}
      setState({...state, obj, mark})
    } catch(e) {
      console.log(e);
    }    
  }
  const statistic = ({ id, title, keys, total, color, min }) => [
    dropDowvNavs({ title, id }, 'praxis', 'dictionary'),
    { xs: 2, value: `keys: ${keys}`},
    { xs: 4, progress: [
      { color, min, value: + total, label: `${total} %`}
    ]}
  ]

  return <Page schema={Modal} statistic={statistic}>{
    ({id, setModal, update}) => {
      return <Layout 
      id={id}
      values={state.values.map((item, index) => {
        const value = {...item, value: state.obj[item.key]}
        const save = ({value}) => setResult(value, item.key, index).then(update)
        return <TooltipSpan  item={value} key={index} mark={index === state.mark}
        onClick={() => {
          setModal({ index, value, save })
          setState({...state, mark: index})
        }}/>
        
      })}
      update={async (limit, skip) => {
        try {
          setState(await api.get(`/text/${id}`, { limit, skip }))
        } catch (e) { console.error(e) }
      }}
      />
    }
  }</Page>
}

export default TextPage