import React, { useEffect, useContext, useState } from "react";
import DropDownBtn from '../../../components/dropDownBtn'
import { Context } from "../../../components/Provider"
import ShowModal from '../../../components/modal'
import Modal from '../modal'
import ContextMenu from './ContextMenu'
import style from './style.module.css'

const TextLayout = ({ id, api, schema }) => {
  const [state, setState ] = useState({ values: [], obj: {}, total: 0, loading: false, modal: false})
  const [{ pageText = {} }, { pageText: updatePage }] = useContext(Context)
  const { limit = 200, mark = 0, font = 14  } = (pageText || {})[id] || {}

  const setPage = ({mark, font}) => {
    updatePage({...pageText, [id]: { mark, font }})
  }

  const setModal = (value = false) => {
    setState({...state, modal: value})
  }

  const update = async (props = {limit, mark}) => {
    try {
      setState({...state, loading: true})
      setState(await api(props))
    } catch (e) { console.error(e) }
  }

 const setContext = (context) => setState({...state, context})

const getContextMenu = ({pageX: x, pageY: y}) => setContext({ x, y, range: window.getSelection().getRangeAt(0)})

  useEffect(() => { id && update() }, [id, mark])

  const values = state.values.map((item) => ({...item, value: state.obj[item.key]}))

  const {content, footer, context} = schema({...state, mark, limit, font, setModal})
  
  return <div className={style.pages__text__layout}>

    <div className={style.text__html__body} style={{fontSize: font}} onClick={() => setContext(false)} 
    onContextMenu={(e) => {
      e.preventDefault()
      state.context ? setContext(false) : getContextMenu(e)
    }}>
      {values.map(content((value) => setState(Object.assign(state, value))))}
    </div>
    <div className={style.text__html__footer}>
      {footer((key, value) => setPage({mark, font, [key]: value}))
      .map(({title, action, menu}) => <div key={title}>
        <DropDownBtn schema={[{ title, menu, action, disabled: state.loading }]}/>
        </div>
      )}
    </div>
    { ShowModal({ schema: Modal, modal: state.modal, setModal })}
    <ContextMenu context={state.context} onClose={setContext} schema={context(() => {
      update({limit, mark})
    })}/>
  </div>

}

export default TextLayout