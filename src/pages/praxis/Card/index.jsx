import React, { useState, useEffect} from "react"
import Layout from './CardLayout'
import Items from './CardItems'
import Result from "./CardResult"
import Title from "./CardTitle"
import Transcription from "./CardTranscription"
import Header from "./CardHeader"
import Timer from "./CardTimer"
import style from './style.module.css'

const Card = ({ api, footer, addResult }) => {
  const [card, setCard] = useState({})
  
  const { value, item, items } = card || {}

  const { _id, result } = value || {}

  const mathRandom= () => 0.5 - Math.random()

  const getDst = ({dst}) => dst ? dst.split(/,|;/).sort(mathRandom) : []

  const getCard = async () => {
    const { card, random } = await api()
    const items = [...random, card].map((value) =>
      ({...value, dst: getDst(value)[0]}))
    return {...card, items: items.sort(() => 0.5 - Math.random()) }
  }

  const next = async (card) => {
    setCard(card || await getCard())
  }

  const inRange = (x, min, max) => x >= min &&  x <= max

  const getResult = (v) => {
    if (v && result === undefined) return {...value, result: 5}
    if (!v && result === 10) return {...value, result: 5}
    const sum = (result || 0) + (v || -1)
    return {...value, result: inRange(sum, 0, 10) ? sum : (result || 0)  }
  }

  const setResult = async (item) => {
    const value = getResult(_id === item )
    const cardValue = {...card, item, value }
    addResult(cardValue)
    return new Promise((resolve) => {
      setCard({...cardValue, resolve})
      setTimeout(resolve, 3000)
    })
  }

  useEffect(() => { next() }, [])

  return <div className={style.praxis__card}>
    {Layout({
      header: <Header schema={[
        { component: <Title value={{ result, key: _id }}/> },
        { component: <Transcription value={value}/> },
        { xs: 1, component: <Timer disabled={!!item} reset={items} next={() => setResult(-1)}/>}
      ]}/>,
      left:  item && <Result value={ value } success={item === _id}/>,
      right: <Items items={items} checked={item}
       addResult={(item) => setResult(item).then(next)}/>,
      footer: footer({...card, resolve: card.resolve || next })
  
    })}
  </div>

}


export default Card