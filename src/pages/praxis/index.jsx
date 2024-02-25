import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Card from './Card'
import Page from '../../components/page'
import Edit from './Card/CardEdit'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'

import { db } from '../../db'

const api = db(`/documents`)

const PraxisPage =  () => {
  const { id = '' } = useParams()
  const [card, setCard] = useState({})
  const [history, setHistory] = useState([])


  const next = async (card) => {
    setCard(card || await getCard())
  }

  const mathRandom= () => 0.5 - Math.random()

  const getDst = ({dst}) => dst ? dst.split(/,|;/).sort(mathRandom) : []

  const getCard = async () => {
    const { card, random } = await api.get(`/card/${id}`)
    const items = [...random, card.value].map((value) => 
      ({...value, dst: getDst(value)[0]}))
    return {...card, items: items.sort(() => 0.5 - Math.random()) }
  }

  const addHistory = (card) => {
    setHistory([card, ...history]
      .filter((v, index) => index <= 5).reverse()
        .map((v, index) => ({...v, index})))
  }

  useEffect(() => { next() }, [id])
  
  return <Page> 
    { (setResult) => {

      const {edit, index = history.length, resolve = next} = card

      // const cardTimeout = (card) => async (resolve) => {
      //   setCard({...card, resolve})
      //   setTimeout(resolve, 2000)
      //   return card
      // }


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
            setCard(card)
            setResult(card).then(update)
            const cardPromise = getCard()
            new Promise((resolve) => {
              setTimeout(() => {
                cardPromise.then(setCard)
                resolve()
              }, 2000)
            }).then(() => addHistory(card))
          }
        return info && <Card card={{...card, setResult: addResult}} footer={[
          { xs: 2, title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
          {},
          { xs: 2, title: 'Next', action: () => resolve(history[index + 1]), menu: [
            { title: 'Edit', action: () => resolve({...card, edit: card}) },
            { title: 'Remove', action: () => addResult({...card, value: undefined}) },
            { title: 'Exclude', action: () => addResult({...card, value: 'exclude'})}
          ] }
        ]}> <Edit card={{...edit, 
              setCard: (edit) => setCard({...card, edit}),
              setResult: () => addResult(edit, 3)
            }} />
        </Card>     
      }}</Statistic>
    }}
  </Page>
}

export default PraxisPage
