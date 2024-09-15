import React, { useEffect, useContext, useState } from "react";
import { CButton } from '@coreui/react'
import { Context } from "../../../components/Provider"
import Modal from '../../../components/modal'
import ContextMenu from './ContextMenu'
import style from './style.module.css'

const TextLayout = ({ id, api, schema }) => {
  const [state, setState ] = useState({ values: [], obj: {}, total: 0})
  const [modal, setModal] = useState(false)
  const [{ pageText = {} }, { pageText: updatePage }] = useContext(Context)
  const { limit = 200, mark = 0, font = 14  } = (pageText || {})[id] || {}

  const setPage = async({mark, font}) => {
    updatePage({...pageText, [id]: { mark, font }})
    return {mark, font, limit}
  }

  const update = async ({limit, mark}) => {
    try {
      setState(await api({ limit, skip: mark }))
    } catch (e) { console.error(e) }
  }

 const setContext = (context) => setState({...state, context})

const getContextMenu = ({pageX: x, pageY: y}) => setContext({ x, y, range: window.getSelection().getRangeAt(0)})

  useEffect(() => { update({limit, mark}) }, [mark])

  const values = state.values.map((item) => ({...item, value: state.obj[item.key]}))
  const {header, content, footer, modal: modalSchema, context} = schema({...state, mark, limit, font, setModal})
  return <div className={style.pages__text__layout}>
    <div className={style.text__html__header}>
      {header((font) => setPage({font, mark}))}
    </div>
    <div className={style.text__html__body} style={{fontSize: font}} onClick={() => setContext(false)} onContextMenu={(e) => {
      e.preventDefault()
      state.context ? setContext(false) : getContextMenu(e)
    }}>
      {values.map(content((value) => setState(Object.assign(state, value))))}
    </div>
    <div className={style.text__html__footer}>
      {footer((mark) => setPage({mark, font}).then(update))
      .map(({title, action}) => <div key={title}>
        <CButton variant='ghost' onClick={action}>{title}</CButton>
        </div>
      )}
    </div>
    { Modal({ schema: modalSchema, modal, setModal })}
    <ContextMenu context={state.context} onClose={setContext} schema={context(() => {
      update({limit, mark})
    })}/>
  </div>

}

export default TextLayout