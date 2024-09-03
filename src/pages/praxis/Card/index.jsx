import React, { useState, useEffect} from "react"
import {CButton} from '@coreui/react'
import DropDownBtn from '../../../components/dropDownBtn'
import CardHistory from './CardHistory'
import Layout from './CardLayout'
import Items from './CardItems'
import Result from "./CardResult"
import CardHeader from "../../../components/cardHeader"
import Timer from "./CardTimer"
import style from './style.module.css'

const Card = ({ api, footer, addResult }) => {
  const [card, setCard] = useState({})
  const { value, item, items, history } = card || {}
  const { _id, result } = value || {}
  
  const mathRandom= () => 0.5 - Math.random()
  const getDst = ({dst} = {}) => dst ? dst.split(/,|;/).sort(mathRandom) : []

  const getCard = async () => {
    const { card, random } = await api()
    const items = [...random, card].map((value) =>
      ({...value, dst: getDst(value)[0]}))
    return { value: card, items: items.sort(() => 0.5 - Math.random()) }
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
      header: <div className={style.card__header}>
        {value && <CardHeader value={value}/>}
        <Timer disabled={!!item} reset={items} next={() => setResult(-1)}/>
      </div>,
      body: () => {
        const ResultComponent = <Result value={ value } success={item === _id}/>
        const ItemsComponent = <Items items={items} checked={item} disabled={history >=0}
        addResult = {(item) => setResult(item).then(next)}/>
        return <div className={style.card__body}>
          {!item ? ItemsComponent : history >=0 ? 
        CardHistory({schema:() => [
          {title: '<', component: () => ResultComponent},
          {title: '>', component: () => ItemsComponent}          
        ]}) : ResultComponent }
        </div>
      },
      footer: <div className={style.card__footer}>
        {footer({card: {...card, resolve: card.resolve || next }}).map(({title, action, disabled, schema}) => {
        return <div key={title} >
          <CButton variant='ghost'  disabled={disabled} onClick={action}>
          {title}
        </CButton>
        {schema && <DropDownBtn schema={[
          { value: <span ></span> },
          { menu: schema}
        ]}/>}
        </div>
      })}



      </div>
    })}
  </div>
}

export default Card