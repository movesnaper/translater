import React from "react"
import Page from '../../components/page'
import Table from './table'
import style from './style.module.css'
import { db } from '../../db'
import Statistic, { dropDowvNavs } from '../../components/statistic'
import { useParams } from 'react-router-dom'


const ExcludesPage =  () => {
  const { id = '' } = useParams()
  const url = '/dictionary/excludes'
  
  return <Page>{ 
    (setResult) => <Statistic api={db(`${url}/length`)} schema={(total) => [
      dropDowvNavs({ xs: 2, id, url: '/excludes'}, '/dictionary', '/praxis'),
      {},
      { progress: [ { color: 'primary', value: 100, label: `${total}`} ]}
    ]}>{
        (update) => {

      const setItems = async (items) => {
        await setResult(items).then(update)
        return items
      }

      return <Table api={db(url)} setItems={setItems}/>
      }}</Statistic>
    }</Page>
}

export default ExcludesPage