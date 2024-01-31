import React, { useState, useEffect } from "react"
import style from './style.module.css'
import { useParams } from 'react-router-dom'
import Card from './Card'
import Document from '../Document'
import Edit from './Card/CardEdit'
import Statistic, { schema, dropDowvNavs } from '../../components/statistic'

import { db } from '../../db'

const api = db(`/documents/`)

const Praxis =  () => {
  const { id = '' } = useParams()
  const [card, setCard] = useState({})
  const [history, setHistory] = useState([])


  const next = async (card) => {
    setCard(card || await getCard())
  }

  const mathRandom= () => 0.5 - Math.random()

  const getRendom = async (id) => {
    const items = await api.get(`/random/${5}`)
    return items.filter((v) => v._id !== id)
  }

  const getDst = ({dst}) => dst ? dst.split(/,|;/).sort(mathRandom) : []

  const getCard = async () => {
    const card = await api.get(`/card/${id}`)
    const filter = (v) => v._id !== card.value._id
    const items = card.value && [...await getRendom(filter), card.value]
     .map((value) => ({...value, dst: getDst(value)[0]})).sort(mathRandom)
    return {...card, items, edit: !card.value && card }
  }

  const addHistory = (card) => {
    setHistory([card, ...history]
      .filter((v, index) => index <= 5).reverse()
        .map((v, index) => ({...v, index})))
  }

  useEffect(() => { next() }, [id])
  
  return <Document id={id}> 
    { (addResult) => {

      const {edit, index = history.length, resolve = next} = card

      const cardTimeout = (card, timeout = 0) => async (resolve) => {
        setCard({...card, resolve})
        setTimeout(resolve, timeout * 1000)
      }

      return <Statistic api={db(`/dictionary/info/${id}`)} 
      schema={(value) => {
        const {title} = value || {}
        const xs = title && 3
        return [
          dropDowvNavs({ xs: xs || 2, id, url: '/praxis', title }, '/dictionary', '/excludes'),
          ...schema(value)
        ]
      }}>{
        (update) => {
          const setResult = async (card, timeout) => {
            addResult([card]).then(update).then(() => addHistory(card))
            return new Promise(cardTimeout(card, timeout)).then(next)
          }
        return <Card card={{...card, setResult}} footer={[
          { xs: 2, title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
          {},
          { xs: 2, title: 'Next', action: () => resolve(history[index + 1]), menu: [
            { title: 'Edit', action: () => resolve({...card, edit: card}) },
            { title: 'Remove', action: () => setResult({...card, value: undefined}) },
            { title: 'Exclude', action: () => setResult({...card, value: 'exclude'})}
          ] },
        ]}> <Edit card={{...edit, 
              setCard: (edit) => setCard({...card, edit}),
              setResult: () => setResult(edit, 3)
            }} />
        </Card>     
      }}</Statistic>
    }}
  </Document>
}

export default Praxis
