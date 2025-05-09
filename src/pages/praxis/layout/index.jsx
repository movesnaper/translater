import React, { useState, useContext } from "react"
import style from './style.module.css'
import Modal from '../../../pages/modal'
import ShowModal from '../../../components/modal'


const PraxisLayout =  ({ schema }) => {
  const [state, setState] = useState({history: [], modal: false})
  // const { sound = false } = page || {}

  const setHistory = (history) => {
    setState({...state, history})
  }
  const setModal = (modal) => {
    setState({...state, modal})
  }
  const update = (card, index) => {
    const {length} = state.history
    state.history.splice(index >=0 || length + 1, 1, card)
    const items = state.history.filter((v, index) => length - index < 3)
      .map((v, index) => ({...v, history: index}))
    setHistory(items)
    return card
  }

  const { content } = schema({...state, update, setModal })

  return <div className={style.praxis__layout}>
  <div className={style.praxis__layout__content}>
    {content}
  </div>
  { ShowModal({ schema: {...Modal, header: ({value}) => value?._id}, modal: state.modal, setModal })}

  </div>
}

export default PraxisLayout
