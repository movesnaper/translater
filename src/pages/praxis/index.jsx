import React, { useState, useEffect } from "react"
import style from './style.module.css'
import { useParams } from 'react-router-dom'
import Card from './Card'
import Document from '../Document'
import Edit from './Card/CardEdit'
import { db } from '../../db'

const api = db(`/documents/`)

const Praxis =  () => {
  const { id } = useParams()
  const [card, setCard] = useState({})
  const [history, setHistory] = useState([])

  const next = async (card) => {
    setCard(card || await getCard())
  }

  const random= () => 0.5 - Math.random()

  const getRendom = async (id) => {
    const items = await api.get(`/random/${5}`)
    return items.filter((v) => v._id !== id)
  }

  const getDst = ({dst}) => dst ? dst.split(/,|;/).sort(random) : []

  const getCard = async () => {
    const { key, value } = await api.get(`${id}/card`)
    const items = value && [...await getRendom(value._id), value]
     .map((value) => ({...value, dst: getDst(value)[0]})).sort(random)
    return {key, value, items, edit: !value && { key }}
  }

  const addHistory = (card) => {
    setHistory([card, ...history]
      .filter((v, index) => index <= 5).reverse()
        .map((v, index) => ({...v, index})))
  }

  useEffect(() => { next() }, [id])
  
  return <Document id={id}> 
    { ({addResult}) => {
      const setResult = async (card, timeout = 0) => {
        const { key, value } = card
        addResult(key, value).then(() => addHistory(card))
        return new Promise( async (resolve) => {
          setCard({...card, resolve})
          setTimeout(resolve, timeout * 1000)
        }).then(next)
      }
      const {edit, key, index = history.length, resolve = next} = card

      return <Card card={{...card, setResult}} footer={[
        { title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
        { title: 'Next', action: () => resolve(history[index + 1]), menu: [
          { title: 'Edit', action: () => resolve({...card, edit: card}) },
          { title: 'Remove', action: () => setResult({key, value: undefined}) },
          { title: 'Exclude', action: () => setResult({key, value: 'exclude'})}
        ] },
      ]}> <Edit card={{...edit, 
            setCard: (edit) => setCard({...card, edit}),
            setResult: () => setResult(edit, 3)
          }} />
      </Card>
    }}
  </Document>
}

export default Praxis