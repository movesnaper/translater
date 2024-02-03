import React, {useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Document from '../Document'
import Layout from './layout'
import style from './style.module.css'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'
import { db } from '../../db'

const replace = (cur, key) => {
  const value = `<span class='translate'>${key}</span>`
  return cur.replace(new RegExp(key, 'g'), value)
}

const Dictionary =  () => {
  const { id = '' } = useParams()
  const [state, setState] = useState({})
  const update = async () => {
    try {
      const { text, results} = await db('/documents').get(`/${id}`)
      setState({ results, text: Object.keys(results).reduce(replace, text)})
      // setText(Object.keys(results).reduce(replace, text))
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => { id && update() }, [id])

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
          }

        return <Layout value={state} setItems={setItems}/>
      }}</Statistic>
  }</Document>
}

export default Dictionary