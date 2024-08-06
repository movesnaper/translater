import React, {useState} from "react"
// import { useParams } from 'react-router-dom'
import Page from '../../components/page'
import Table from './table'
// import Modal from './table/TableModal'
import Modal from '../modal'
// import DropDownBtn from '../../components/dropDownBtn'
import Result from './table/TableResult'

// import style from './style.module.css'
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

          // const setItems = async (value) => {
          //   setResult(value)
          //   .then(update)
          //   return value
          // }

        return <Table 
        // setItems={setItems}
          api={(skip) => api.get(`/dictionary/${id}`, { skip, limit: 20 })}
          schema={(card, index, update) => {
            const { _id, dst } = card?.value || {}
            return { 
              onClick: () => setModal({...card, save: (value) => {
                // console.log(index, value);
                setResult({...value, key: _id}).then(() => update(index, value))
              }}), 
              cells: [
              { value: index + 1},
              { value: _id},
              { value: dst},
              { value: dst && <Result value={card.value} addResult={update}/>}
            ] }
          }}>
            {/* {(values) => {
              const modalFooter = <DropDownBtn schema={
              [{}, { title: 'Save', action: () => setItems(values[modal]), menu: [
              { title: 'remove',  action: () => setItems({...values[modal], value: null})}
              ]}]}/> 
              return <Modal modal={values[modal]} setModal={setModal} footer={modalFooter}/>
            }} */}
        </Table>
      }}</Page>
}

export default Dictionary