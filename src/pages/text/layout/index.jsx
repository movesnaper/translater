import React, { useEffect, useState } from "react"
import style from './style.module.css'
import Modal from '../../dictionary/table/TableModal'
import DropDownBtn from '../../../components/dropDownBtn'


const Text = ({ value, setItems}) => {
  const {text, results} = value || {}
  const [item, setItem] = useState(null)
  const [modal, setModal] = useState(false)
  const { dst, offset } = item || {}

  const showItem = (item, { x, y }) => {
    setItem({...item, offset: {x, y}})
  }

  const hideItem = () => {
    let timeout = window.setTimeout(setItem, 3000)
    while (timeout--) { window.clearTimeout(timeout) }
  }

  const edit = (v) => {
    setModal(v)
  }

  const addAction = (node) => {
    const { textContent: key } = node || {}
    const { _id, dst } = results[key] || {}
      node.onclick = (evt) => showItem({ key, _id, dst }, evt)
      node.ondblclick = () => edit({key, value: {_id, dst}})
  }
  
  useEffect(() => { item && hideItem() }, [item])

  useEffect(() => {
    Array.from(document.getElementsByClassName('translate')).forEach(addAction)
  }, [results])

  const modalFooter = <DropDownBtn schema={
    [{}, { title: 'Save', action: () => setItems([modal]).then(setModal)}]}/> 
  
return <>
  <Modal modal={modal} setModal={setModal} footer={modalFooter}/>
  { dst && <span style={{ top: `${offset.y - 40}px`, left: `${offset.x + 10}px`}} 
  className={style.pages__item}>{dst}</span>}
  <div className={style.pages__text} dangerouslySetInnerHTML={{ __html: text}}
></div>
</>
}

export default Text