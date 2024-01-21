import React from "react"
import Layout from './CardLayout'
import Items from './CardItems'
import Result from "./CardResult"
import BtnSave from "./CardBtnSave"
import Title from "./CardTitle"
import Transcription from "./CardTranscription"
import Timer from "./CardTimer"
import Footer from "./CardFooter"

const Card = ({ card, footer, children  }) => {
  
  const { key, value = {}, edit, item, items } = card || {}

  const  inRange = (x, min, max) => x >= min &&  x <= max

  const getResult = (item) => {
    const result = (value.result || 0) + (value._id === item || -1)
    return {...value, result: inRange(result, 0, 10) ? result : value.result  }
  }

  const setResult = async (item) => {
    const value = getResult(item)
    return card.setResult({...card, item, value}, 3)
  }

  return Layout({
    header: [
      <Title title={value._id || key} result={value.result} />,
      <Transcription value={edit ? edit.value : value}/>,
      edit ? <BtnSave value={edit.value} onClick={() => card.setResult(edit, 3)}/>
      : <Timer disabled={!!item || !!edit } reset={items} next={() => setResult(-1)}/>
    ],
    left:  item && <Result value={ value } success={item === value._id}/>,
    right: <Items items={items} checked={item}
     addResult={(item) => setResult(item)}/>,
    edit: edit && children,
    footer: <Footer card={card} schema={footer}/>

  })
}


export default Card