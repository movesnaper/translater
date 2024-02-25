import React from "react"
import { useParams } from 'react-router-dom'
import Page from '../../components/page'
import Table from './table'
// import style from './style.module.css'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'
import { db } from '../../db'
const api = db(`/documents`)

const Dictionary =  () => {
  const { id = '' } = useParams()

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
      }}>{ (value, update) => {

          const setItems = async (value) => {
            setResult(value).then(update)
            return value
          }

        return value && <Table setItems={setItems}
          api={(skip) => api.get(`/dictionary/${id}`, { skip, limit: 20 })}/>
      }}</Statistic>
  }</Page>
}

export default Dictionary