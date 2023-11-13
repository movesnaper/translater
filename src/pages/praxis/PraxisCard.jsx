import React, {useState, useEffect } from "react"
import style from './Praxis.module.css'
import { CCardFooter, CRow, CCol, CCard, CCardBody } from '@coreui/react'
import PraxisCardContent from './PraxisCardContent'
// import PraxisCardFooter from './PraxisCardFooter'
import { db } from '../../db/index.js'

const PraxisCard =  ({items}) => {
  const [card, setCard] = useState({ })
  const [history, setHistory] = useState([])

  // const translate = async (key) => {
  //   const [value] = await db('/dictionary').post('/translate', { keys: [key] })
  //   return value
  // }

  const addHistory = (item) => {
    const items = [...history, item]
    if (items.length > 5) items.splice(0, 1)
    setHistory(items.map((v, index) => ({...v, index})))
  }

  const getRandom = async (item) => {
    if (!item._id) return []
    const random = () => 0.5 - Math.random()
    const items = (await db('/dictionary').get(`/random/4`))
      .filter(({_id}) => _id !== item._id)
    return [...items, item].sort(random)
  }


  const addResult = async (result) => {
    if (card.result || !card._id) return
    const item = {...card, result}
    setCard(item)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    addHistory(item)
  }

  const update = async (item) => {
    const random = item.random || await getRandom(item)
    return setCard({...item, random })
  }


  const next = async (result, index) => {
    if(result) await addResult(result)
    update(history[index] || items[Math.floor(Math.random()*items.length)])
  }

  useEffect(() => { next() }, [items.length])


  return <CRow >
  <CCol >
   <CCard>
    <CCardBody className={style.card__body}>
    <PraxisCardContent card={card} next={next}/>
    </CCardBody>
    <CCardFooter className={style.card__footer}>
      <CButton disabled={!history.length}
        onClick={() => next(false, card.index - 1)}>Prev</CButton>
      <CButton onClick={() => next(-1, card.index + 1)}>Next</CButton>
    </CCardFooter>
   </CCard>
 </CCol>

 
</CRow>
}

export default PraxisCard