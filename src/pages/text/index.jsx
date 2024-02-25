import React from "react"
import { useParams } from 'react-router-dom'
import Page from '../../components/page'
import Layout from './layout'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'
import { db } from '../../db'
const api = db(`/documents`)

const TextPage =  () => {
  const { id = '' } = useParams()
  const setResult = (value) => {
    try {
      return api.post(`/text`, value)
    } catch(e) {
      console.log(e);
    }    
  }

  return <Page>{
    () => <Statistic api={() => api.get(`/info/${id}`)} 
      schema={({ title, keys, total }) => {
        const info = total < 75 && 'info'
        return [
          dropDowvNavs({ id, title }, 'praxis', 'dictionary'),
          { xs: 2, value: `keys: ${keys}`},
          { xs: 4, progress: [
            { color: info || 'success', min: 25, value: + total, label: `${total} %`}
          ]}
        ]
      }}>{ (info, update) => info && <Layout api={api} id={id} 
          setItem={ (value) => setResult(value).then(update) }/>
      }</Statistic>
  }</Page>
}

export default TextPage