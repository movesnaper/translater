import React, { useState, useContext } from "react"
import { Context } from "../../../components/Provider"
import style from './style.module.css'


const PraxisLayout =  ({schema, id}) => {
  const [history, setHistory] = useState([])
  const [{ pagePraxis }, { pagePraxis: updatePage }] = useContext(Context)
  const { result = 10, historyLn = 3 } = pagePraxis ? (pagePraxis[id] || {}) : {}

  const setPage = async(result) => {
    updatePage({...pagePraxis, [id]: { result }})
    return {result}
  }
  const addHistory = (card, index) => {
    const {length} = history
    history.splice(index >=0 || length + 1, 1, card)
    const items = history
      .filter((v, index) => length - index < historyLn)
        .map((v, index) => ({...v, history: index}))
    setHistory(items)
    return card
  }


  return <div className={style.praxis__layout}>
  <div className={style.praxis__layout__header}>
    {schema.header({result, setPage})}
  </div>
  <div className={style.praxis__layout__content}>
    {schema.content({history, addHistory, mark: result})}
  </div>
  </div>
}

export default PraxisLayout
