import React, { useState, useEffect } from "react";
import Modal from '../../../components/modal'
import Table from '../../../components/table'
import style from './style.module.css'

const HomeLayout = ({ api, schema }) => {
  const [state, setState ] = useState({})
  const [mark, setMark] = useState({})

  const { values } = state
  const setModal = (modal) => setState({...state, modal})
  const setValues = (values) => setState({...state, values})

  const { header, table, modal } = schema({ ...state, setModal, setValues })
  const update = async () => {
    try {
      const { values: items, skip } = await api({skip: mark})
      setMark(skip)
      setValues([...values || [], ...items])
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => { 
    api && update()
   }, [api])
  return <div className={style.pages__home__layout}>
    <div className={style.home__layout__header}>{header}</div>
    <div className={style.home__layout__table}>
      <Table update={update} items={values} schema={table}/>
    </div>
    { Modal({ schema: modal((value, index) => {
      values.splice(index, 1, value)
      
    }), modal: state.modal, setModal })}
  </div>

}

export default HomeLayout