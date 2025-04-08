import React, { useState, useContext } from "react"
import style from './style.module.css'
import ShowModal from '../../../components/modal'
import Modal from '../../modal'
import { Context } from "../../../components/Provider"


const PraxisLayout =  ({id, schema}) => {
  const [state, setState] = useState({history: [], modal: false})
  const [{ pagePraxis = {} }, { pagePraxis: updatePage }] = useContext(Context)
  const { sound = false } = (pagePraxis || {})[id] || {}
  const {history, modal} = state
  const setPage = ({sound}) => {
    updatePage({...pagePraxis, [id]: { sound }})
  }
  const setHistory = (history) => {
    setState({...state, history})
  }
  const setModal = (modal) => {
    setState({...state, modal})
  }
  const update = (card, index) => {
    const {length} = history
    history.splice(index >=0 || length + 1, 1, card)
    const items = history.filter((v, index) => length - index < 3)
      .map((v, index) => ({...v, history: index}))
    setHistory(items)
    return card
  }

  const {content} = schema({
    history,
    sound,
    update, 
    setModal, 
    setPage
  })

  return <div className={style.praxis__layout}>
  <div className={style.praxis__layout__content}>
    {content}
  </div>
  { ShowModal({ schema: Modal, modal, setModal })}

  </div>
}

export default PraxisLayout
