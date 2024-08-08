import React from "react"
import Page from '../../components/page'
import Table from './table'
import Modal from './modal'
import Result from './table/TableResult'
import { dropDowvNavs } from '../../components/statistic'
import { db } from '../../db'
const api = db(`/documents`)
const statistic = ({ id, title, keys, total, color, min }) => [
  dropDowvNavs({ title, id }, 'text', 'praxis'),
  { xs: 2, value: `keys: ${keys}`},
  { xs: 4, progress: [
    { color, min, value: + total, label: `${total} %`}
  ]}
]
const Dictionary =  () => {
  return <Page schema={Modal} statistic={statistic}>{ ({id, setModal, setResult}) => {
        return <Table 
          api={(skip) => api.get(`/dictionary/${id}`, { skip, limit: 20 })}
          schema={(value, index, update) => {
            const { _id, dst } = value || {}
            return { 
              onClick: () => setModal({ 
                value, 
                save: ({value}) => {
                  setResult(value).then(() => update(index, value))
                },
                remove: (value) => {
                  setResult({...value, _id: false}).then(() => update(index))
                }
              }), 
              cells: [
              { value: index + 1},
              { value: _id},
              { value: dst},
              { value: dst && <Result value={value} addResult={(value) => {
                setResult(value).then(() => update(index, value))
              }}/>}
            ] }
          }}>

        </Table>
      }}</Page>
}

export default Dictionary