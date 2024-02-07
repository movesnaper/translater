import React from "react"
import { useParams } from 'react-router-dom'
import Document from '../Document'
import Layout from './layout'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'
import { db } from '../../db'

const DictionaryPage =  () => {
  const { id = '' } = useParams()
  const api = db(`/documents/${id}`)

  return <Document>{
    (setResult) => <Statistic api={db(`/dictionary/info/${id}`)} 
      schema={(value) => {
        const {title} = value || {}
        const xs = title && 3
        return [
          dropDowvNavs({ xs: xs || 2, id, url: '/dictionary', title }, '/praxis', '/excludes'), 
          ...schema(value)
        ]
      }}>{ (update) => {

          const setItem = async (item) => {
            await setResult([{...item, doc_id: id}]).then(update)
            return item
          }

        return <Layout api={api} setItem={setItem}/>
      }}</Statistic>
  }</Document>
}

export default DictionaryPage