import React, { useState, useContext } from "react"
import { Context } from "../../../components/Provider"
import style from './style.module.css'


const PraxisLayout =  ({schema, id}) => {
  const [history, setHistory] = useState([])
  const [{ pagePraxis }, { pagePraxis: updatePage }] = useContext(Context)
  const { result = 10 } = pagePraxis ? (pagePraxis[id] || {}) : {}

  const setPage = async(result) => {
    updatePage({...pagePraxis, [id]: { result }})
    return {result}
  }
  const addHistory = (card) => {
    setHistory([card, ...history]
      .filter((v, index) => index <= 5).reverse()
        .map((v, index) => ({...v, history: index})))
  }


  return <>
  <div className={style.praxis__layout__header}>
    {schema.header({result, setPage})}
  </div>
  <div className={style.text__html__content}>
    {schema.content({history, addHistory, mark: result})}
  </div>
  
  </>
}

export default PraxisLayout
