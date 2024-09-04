import React from "react"
import Page from '../../components/page'
import Layout from './layout'
import Modal from './modal'
import TooltipSpan from './layout/TooltipSpan'
import DocTitle from '../../components/docTitle'

import { db } from '../../db'
const api = db(`/documents`)

const TextPage =  () => {

  const statistic = ({ id, title }) => [
    { value: DocTitle({title, menu: [
      {title: 'praxis', href: `/praxis/${id}`},
      {title: 'dictionary', href: `/dictionary/${id}`}
    ]})}
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
      footer={({total, mark, limit}, updatePage) => {
        return [
          { title: 'Prev', action: () => updatePage(mark - limit)},
          { title: `Current ${Math.floor(mark / limit) + 1}`},
          { title: `Total ${Math.floor(total / limit) + 1}`},
          { title: 'Next', action: () => {
            console.log(total, mark, limit);
            
            updatePage(mark + limit)
          }},
        ]
      }}
      />
    }
  }</Page>
}

export default TextPage