import React from "react"
import Page from '../../components/page'
import Layout from './layout'
import TooltipSpan from './layout/TooltipSpan'
import Range from '../../components/range'

import { db } from '../../db'
const api = db(`/documents`)

const TextPage =  () => {
  

  return <Page menu={(id) => [
    {title: 'praxis', href: `/praxis/${id}`}, 
    {title: 'dictionary', href: `/dictionary/${id}`}
  ]} 
  schema={({id, header, update}, setState) => {
    const textEdit = async ({values, mark, limit}) => {
      try {
        await api.post(`/text/edit/${id}`, {values, mark, limit})
        update()
      } catch (e) { console.error(e) }
    }
    const setResult = async({key, value}, ref) => {
      const values = value.filter(({_id}) => !!_id)
      try {
        api.post(`/text/${id}`, { key, ref, values }).then(update)
        return { [key]: values, [ref]: values }
      } catch(e) {
        console.log(e);
      }    
    }
    return {
      settings: [
        {title: 'test', action: () => setState('header', !header)}
      ],
      content: <Layout id={id} api={(props) => api.get(`/text/${id}`, props)}
      schema={({values, obj, mark, total, limit, font, setModal}) => {
        return {
          header: (update) => header && Range({ values: [font], settings: {step: 0.1, min: 10, max: 40},
            setValues: ([value]) => update(value) }),
          content: (update) => (item, index) => <TooltipSpan
          key={index} index={index} mark={mark === index} item={item}
          onClick={() => {
            setModal({ index, value: item, 
              save: ({value: modal}) => {
                setResult(modal, item.key)
                .then((value) => {
                  update({obj: Object.assign(obj, value)})
                  setModal(false)
                })
              }
            })
            update({mark: index})
          }}/>,
          footer: (update) => [
            { title: 'Prev', action: () => update(mark - limit)},
            { title: `Current ${Math.floor(mark / limit) + 1}`},
            { title: `Total ${Math.floor(total / limit) + 1}`},
            { title: 'Next', action: () => update(mark + limit)}
          ],
          context: (update) => [
            { title: 'remove', action: async ([start, end]) => {
              values.splice(start, end - start + 1 )
              return textEdit({ values, mark, limit }).then(update)
            }},
          ]
        }
      }}/>
    }
  }}/>
}

export default TextPage