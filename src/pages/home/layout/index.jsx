import React, { useState, useEffect } from "react"
import ShowModal from '../../../components/modal'
import Table from '../../../components/table'
import style from './style.module.css'

const HomeLayout = ({ api, schema }) => {
  const [state, setState ] = useState({})
  // const [mark, setMark] = useState({})

  const { values } = state
  const setModal = (modal) => setState({...state, modal})
  const setValues = (values) => setState({...state, values})

  const update = async () => {
    try {
      const { values: items } = await api()
      // setMark(skip)
      setValues(items)
    } catch (e) {
      console.error(e);
    }
  }
  const { header, table, modal } = schema({ ...state, setModal, setValues }, update)


  useEffect(() => { 
    api && update()
   }, [api])
  return <div className={style.pages__home__layout}>
    <div className={style.home__layout__header}>{header}</div>
    <div className={style.home__layout__table}>
      <Table items={values} schema={table}/>
    </div>
    { ShowModal({ schema: modal(), modal: state.modal, setModal })}
  </div>

}

export default HomeLayout