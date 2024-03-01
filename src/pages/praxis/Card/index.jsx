import React from "react"
import Layout from './CardLayout'
import Items from './CardItems'
import Result from "./CardResult"
import BtnSave from "./CardBtnSave"
import Title from "./CardTitle"
import Transcription from "./CardTranscription"
import Header from "./CardHeader"
import Timer from "./CardTimer"
import DropDownBtn from '../../../components/dropDownBtn'
import style from './style.module.css'

const Card = ({ card, footer, children  }) => {
  
  const { key, value, edit, item, items } = card || {}

  const { _id, result } = value || {}

  const  inRange = (x, min, max) => x >= min &&  x <= max

  const getResult = (v) => {
    if (v && result === undefined) return {...value, result: 5}
    if (!v && result === 10) return {...value, result: 5}
    const sum = (result || 0) + (v || -1)
    return {...value, result: inRange(sum, 0, 10) ? sum : (result || 0)  }
  }

  const setResult = async (item) => {
    const value = getResult(_id === item )
    return card.setResult({...card, item, value})
  }

  return <div className={style.praxis__card}>{
    Layout({
      header: <Header schema={[
        { component: <Title value={{ result, key: edit ? key : _id }}/> },
        { component: <Transcription value={edit ? edit.value : value}/> },
        { component: edit ? <BtnSave value={edit.value} onClick={() => card.setResult(edit, 3)}/>
        : <Timer disabled={!!item || !!edit } reset={items} next={() => setResult(-1)}/>}
      ]}/>,
      left:  item && <Result value={ value } success={item === _id}/>,
      right: <Items items={items} checked={item}
       addResult={(item) => setResult(item)}/>,
      edit: edit && children,
      footer: <DropDownBtn schema={footer}/>
  
    })    
  }</div>

}


export default Card