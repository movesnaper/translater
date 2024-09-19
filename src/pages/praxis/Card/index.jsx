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
  
  const mathRandom= () => 0.5 - Math.random()
  const getDst = ({dst} = {}) => dst ? dst.split(/,|;/).sort(mathRandom) : []

  const getCard = async () => {
    const { card, random } = await api()
    const itemsDst = random.map((value) => ({...value, dst: getDst(value)[0]}))
    .filter(({dst}) => dst && dst !== card.dst)
    const items = [...itemsDst, {...card, dst: getDst(card)[0]}]
    return { value: card, items: items.sort(mathRandom) }
  }

  const next = async (card) => {
    setCard(card || await getCard())
  }

  const setResult = async (item) => {
    return new Promise(async (resolve) => {
      setCard({...await addResult({...card, item }), resolve})
      setTimeout(resolve, 3000)
    })
  }

  useEffect(() => { next() }, [])

  return <div className={style.praxis__card}>
    {Layout({
      header: value && <div className={style.card__header}>
        { <CardHeader value={value}/>}
        <Timer disabled={!!item} reset={items} next={() => setResult(-1).then(next)}/>
      </div>,
      body: () => {
        const ResultComponent = <Result value={ value } success={item === value?._id}/>
        const ItemsComponent = <Items items={items} checked={item} disabled={history >=0}
        addResult = {(item) => setResult(item).then(next)}/>
        return value && <div className={style.card__body}>
          {!item ? ItemsComponent : history >=0 ? 
        CardHistory({schema:() => [
          {title: '<', component: () => ResultComponent},
          {title: '>', component: () => ItemsComponent}          
        ]}) : ResultComponent }
        </div>
      },
      footer: value && <div className={style.card__footer}>
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