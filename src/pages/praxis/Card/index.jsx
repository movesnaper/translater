import React, { useState, useEffect} from "react"
import {CButton} from '@coreui/react'
import DropDownBtn from '../../../components/dropDownBtn'
import CardHistory from './CardHistory'
import Layout from './CardLayout'
import Items from './CardItems'
import Result from "./CardResult"

import style from './style.module.css'

const Card = ({ api, header, footer, addResult }) => {
  const [card, setCard] = useState({})
  const { value, item, items, history } = card || {}
  const mathRandom= () => 0.5 - Math.random()
  const getDst = ({dst} = {}) => dst ? dst.split(/,|;/).sort(mathRandom) : []

  const getCard = async (value = {}) => {
    const { card, random } = await api(value)
    const itemsDst = random.map((value) => ({...value, dst: getDst(value)[0]}))
    .filter(({dst}) => dst && dst !== card.dst)
    const items = [...itemsDst, {...card, dst: getDst(card)[0]}]
    return { value: card, items: items.sort(mathRandom) }
  }

  const next = async ({history, value: resultCard} = {}) => {
    setCard(history || await getCard(resultCard, value))
  }

  const setResult = async (item) => {
    return new Promise(async (resolve) => {
      const value = {...card, item }
      const v = await addResult(value)
      setCard({...v, resolve: () => resolve(v)})
      setTimeout(() =>resolve(v), 3000)
    })
  }

  useEffect(() => { next() }, [])

  return <div className={style.praxis__card}>
    {Layout({
      header: value && <div className={style.card__header}>
        {header(card, (value) => setResult(value).then((v) => next(v)))}
      </div>,
      body: () => {
        const ResultComponent = <Result value={ value } success={item === value?._id}/>
        const ItemsComponent = <Items items={items} checked={item} disabled={history >=0}
        addResult = {(item) => setResult(item).then((v) => next(v))}/>
        return value && <div className={style.card__body}>
          {!item ? ItemsComponent : history >=0 ? 
        CardHistory({schema:() => [
          {title: '<', component: () => ResultComponent},
          {title: '>', component: () => ItemsComponent}          
        ]}) : ResultComponent }
        </div>
      },
      footer: value && <div className={style.card__footer}>
        {footer({card: {...card, items, resolve: card.resolve || next }}).map(({title, action, disabled, schema}) => {
        return <div key={title} >
          <CButton variant='ghost'  disabled={disabled} onClick={action}>
          {title}
        </CButton>
        {schema && <DropDownBtn schema={[ { menu: schema} ]}/>}
        </div>
      })}
      </div>
    })}
  </div>
}

export default Card