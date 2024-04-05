import React, {useState} from "react"
import { useParams } from 'react-router-dom'
import Page from '../../components/page'
import Table from './table'
import Modal from './table/TableModal'
import DropDownBtn from '../../components/dropDownBtn'
import Result from './table/TableResult'

// import style from './style.module.css'
import Statistic, { dropDowvNavs } from '../../components/statistic'
import { db } from '../../db'
const api = db(`/documents`)

const Dictionary =  () => {
  const { id = '' } = useParams()
  const [modal, setModal] = useState(false)
console.log(modal);
  return <Page>{
    (setResult) => <Statistic api={() => api.get(`/info/${id}`)} 
      schema={({ title, keys, total }) => {
        const info = total < 75 && 'info'
        return [
          dropDowvNavs({ id, title }, 'praxis', 'dictionary'),
          { xs: 2, value: `keys: ${keys}`},
          { xs: 4, progress: [
            { color: info || 'success', min: 25, value: + total, label: `${total} %`}
          ]}
        ]
      }}>{ (info, update) => {

          const setItems = async (value) => {
            setResult(value).then(update)
            return value
          }

        return info && <Table setItems={setItems}
          api={(skip) => api.get(`/dictionary/${id}`, { skip, limit: 20 })}
          schema={({key, value, index}, update) => {
            const { _id = key, dst } = value || {}
            return { 
              onClick: () => setModal(index), 
              cells: [
              { value: index + 1},
              { value: _id},
              { value: dst},
              { value: dst && <Result value={value} addResult={update}/>}
            ] }
          }}>
            {(values) => {
              const modalFooter = <DropDownBtn schema={
              [{}, { title: 'Save', action: () => setItems(values[modal]).then(update), menu: [
              { title: 'remove',  action: () => setItems({...values[modal], value: null}).then(update)}
              ]}]}/> 
              return <Modal modal={values[modal]} setModal={setModal} footer={modalFooter}/>
            }}
        </Table>
      }}</Statistic>
  }</Page>
}

export default Dictionary