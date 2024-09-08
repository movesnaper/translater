import React, { useState } from "react"
import style from './style.module.css'
import Modal from '../../../components/modal'


const PraxisLayout =  ({schema}) => {
  const [history, setHistory] = useState([])
  const [modal, setModal] = useState(false)

  const update = (card, index) => {
    const {length} = history
    history.splice(index >=0 || length + 1, 1, card)
    const items = history.filter((v, index) => length - index < 3)
      .map((v, index) => ({...v, history: index}))
    setHistory(items)
    return card
  }
  const inRange = (x, min, max) => x >= min &&  x <= max

  const getResult = ({_id, result}, item) => {
    const value = _id === item
    if (value) {
      if (result === undefined) return 5
      if (result === 5) return 8
    }
    if (!value) {
      if (result === 5) return 2
      if (inRange(result, 8, 10)) return 6
    }
    const sum = (result || 0) + (value || -1)
    return inRange(sum, 0, 10) ? sum : (result || 0)
  } 
  const {content, modal: modalSchema} = schema({
    history, 
    update, 
    setModal, 
    getResult: ({value, item}) => ({...value, result: getResult(value, item)})
  })

  return <div className={style.praxis__layout}>
  <div className={style.praxis__layout__content}>
    {content}
  </div>
  { Modal({ schema: modalSchema, modal, setModal })}

  </div>
}

export default PraxisLayout
