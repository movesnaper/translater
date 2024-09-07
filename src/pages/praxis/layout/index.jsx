import React, { useState } from "react"
import style from './style.module.css'


const PraxisLayout =  ({schema}) => {
  const [history, setHistory] = useState([])
  const addHistory = (card, index) => {
    const {length} = history
    history.splice(index >=0 || length + 1, 1, card)
    const items = history
      .filter((v, index) => length - index < 3)
        .map((v, index) => ({...v, history: index}))
    setHistory(items)
    return card
  }


  return <div className={style.praxis__layout}>
  <div className={style.praxis__layout__content}>
    {schema.content({history, addHistory})}
  </div>
  </div>
}

export default PraxisLayout
