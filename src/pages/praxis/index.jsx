import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Card from './Card'
import Page from '../../components/page'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'

import { db } from '../../db'

const api = db(`/documents`)

const PraxisPage =  () => {
  const { id = '' } = useParams()
  const [history, setHistory] = useState([])

  const addHistory = (card) => {
    setHistory([card, ...history]
      .filter((v, index) => index <= 5).reverse()
        .map((v, index) => ({...v, index})))
  }


  
  return <Page> 
    { (setResult) => {

      // const { index = history.length, resolve = next } = card

      return <Statistic api={() => api.get(`/info/${id}`)} 
      schema={(value) => {
        const {title} = value || {}
        return [
          dropDowvNavs({ xs: 3, id, title }, 'dictionary', 'text'),
          ...schema(value)
        ]
      }}>{
        (info, update) => {
          const addResult = async (card) => {
            setResult(card).then(update)
            addHistory(card)
          }          

        return info && <Card api={() => api.get(`/card/${id}`)} addResult={addResult} 
          footer={[
          // { xs: 2, title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
          {},
          // { xs: 2, title: 'Next', action: () => resolve(history[index + 1]) }
        ]}/>     
      }}</Statistic>
    }}
  </Page>
}

export default PraxisPage
