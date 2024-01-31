import React from "react"
import { useParams } from 'react-router-dom'
import Document from '../Document'
import Table from './table'
import style from './style.module.css'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'
import { db } from '../../db'

const Dictionary =  () => {
  const { id = '' } = useParams()

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

          const setItems = async (items) => {
            await setResult(items).then(update)
            return items
          }

        return <Table api={db(`/dictionary/${id}`)} setItems={setItems}/>
      }}</Statistic>
  }</Document>
}

export default Dictionary