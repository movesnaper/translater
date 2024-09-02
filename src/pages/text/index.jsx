import React from "react"
import Page from '../../components/page'
import Layout from './layout'
import { dropDowvNavs } from '../../components/statistic'
import Modal from './modal'
import TooltipSpan from './layout/TooltipSpan'

import { db } from '../../db'
const api = db(`/documents`)

const TextPage =  () => {

  const statistic = ({ id, title, keys, total, color, min }) => [
    dropDowvNavs({ title, id }, 'praxis', 'dictionary'),
    { xs: 2, value: `keys: ${keys}`},
    { xs: 4, progress: [
      { color, min, value: + total, label: `${total} %`}
    ]}
  ]

  return <Page schema={Modal} statistic={statistic}>{
    ({id, setModal, update}) => {
      const setResult = async({key, value}, ref) => {
        const values = value.filter(({_id}) => !!_id)
        try {
          api.post(`/text/${id}`, { key, ref, values }).then(update)
          return { [key]: values, [ref]: values }
        } catch(e) {
          console.log(e);
        }    
      }
      return <Layout id={id}
      api={(props) => api.get(`/text/${id}`, props)}
      schema={({values, obj, mark}, updateState) => {
        return values.map((item, index) => <TooltipSpan
        key={index} mark={mark === index} item={item}
        onClick={() => {
          setModal({ index, value: item, 
            save: ({value: modal}) => {
              setResult(modal, item.key)
              .then((value) => updateState({obj: Object.assign(obj, value)}))
            }
          })
          updateState({mark: index})
        }}/>)
      }}
      />
    }
  }</Page>
}

export default TextPage