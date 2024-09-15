import React, { useState } from "react";
import Modal from '../../../components/modal'
import Table from '../../../components/table'
import style from './style.module.css'

const HomeLayout = ({ api, schema }) => {
  const [state, setState ] = useState({})
  const { values= [] } = state

  const setModal = (modal) => setState({...state, modal})
  const setValues = (values) => setState({...state, values})

  const { header, table, modal } = schema({ ...state, setModal, setValues })


  return <div className={style.pages__home__layout}>
    <div className={style.home__layout__header}>{header}</div>
    <div className={style.home__layout__table}>
      <Table api={api} schema={{...table, setItems: (items) => setValues([...values, ...items])}}/>
    </div>
    { Modal({ schema: modal, modal: state.modal, setModal })}
  </div>

}

export default HomeLayout