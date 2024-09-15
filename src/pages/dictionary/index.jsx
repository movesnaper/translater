import React from "react"
import Page from '../../components/page'
import Layout from './layout'
import Modal from './modal'
import Result from './layout/TableResult'
import DocTitle from '../../components/docTitle'
import { db } from '../../db'
const api = db(`/documents`)

const statistic = ({ id, title }) => [
  { value: DocTitle({title, menu: [
    {title: 'text', href: `/text/${id}`},
    {title: 'praxis', href: `/praxis/${id}`}
  ]})}
]

const Dictionary =  () => {
  return <Page schema={statistic}>{ ({ id, update }) => {
        const setResult = async (card) => {
          const { value } = card || {}
          try {
            api.post(`/results/${id}`, {value}).then(update)
            return card
          } catch(e) {
            console.error(e);
          }
        }
        return <Layout 
        api={({skip = 0, limit = 100}) => api.get(`/dictionary/${id}`, { skip, limit })}
        schema={({values, setModal}, update) => {
          return {
            modal: Modal,
            table: {
              header: [
                {value: '#', getValue: (_, index) => index + 1},
                {value: 'value', getValue: ({_id}) => _id},
                {value: 'dst', getValue: ({dst}) => dst},
                {value: 'result', getValue: (v, index) => v.dst && <Result value={v} addResult={(value) => {
                  setResult({value}).then(() => update(index, value))
                }}/>},
              ],
              items: values.map((value, index) => ({value, onClick: () => 
                setModal({
                  value, 
                  index, 
                  save: ({value}) => setResult({value}).then(() => update(index, value)),
                  remove: (value) => setResult({value: {...value, _id: false}}).then(() => update(index))
              })}))
            },
            // content: (value, index, update) => {
            //   const { _id, dst } = value || {}
            //   return { 
            //     onClick: () => setModal({ 
            //       value, 
                  
                  
            //     }), 
            //     cells: [
            //     { value: index + 1},
            //     { value: _id},
            //     { value: dst},
                // { value: dst && <Result value={value} addResult={(value) => {
                //   setResult({value}).then(() => update(index, value))
                // }}/>}
            //   ] }
            // }
          }
        }}
        />
      }}</Page>
}

export default Dictionary