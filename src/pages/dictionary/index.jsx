import React from "react"
import Page from '../../components/page'
import Table from './table'
import Modal from './modal'
import Result from './table/TableResult'
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
  return <Page schema={Modal} statistic={statistic}>{ ({id, setModal, setResult}) => {
        return <Table 
          api={({skip = 0, limit = 100}) => {
            console.log(skip, limit);
            
            return api.get(`/dictionary/${id}`, { skip, limit })
          }}
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