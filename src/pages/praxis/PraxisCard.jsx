import React, {useState, useEffect } from "react"
import Timer from "./Timer"
import style from './Praxis.module.css'
import { CFormCheck, CCardFooter, CRow, CCol, CCard, CCardBody, CCardText, CButton } from '@coreui/react'
import { db } from '../../db/index.js'

const PraxisCard =  ({items}) => {
  const [state, setState] = useState({docs: [], index: 0})
  const card = state.docs[state.index]
  const [active, setActive] = useState(false)

  // const random = () => 0.5 - Math.random()

  const translate = async ({key}) => {
    const [value] = await db('/dictionary').post('/translate', { keys: [key] })
    return value
  }

  const getRandom = async ({value}) => {
    const random = () => 0.5 - Math.random()
    const filter = ({_id}) => _id !== value._id
    const map = (v) => {
      const [dst] = v.dst.split(';').sort(random)
      return {...v, dst: dst.trim()}
    }
    const items = await db('/dictionary').get(`/random/5`)
    return [...items.filter(filter), value].sort(random).map(map)
      
  }

  const update = async() => {
    const item = items[Math.floor(Math.random()*items.length)]
    item.value = item.value || await translate(item)
    const doc = {...item, random: await getRandom(item)}
    return [...state.docs, doc]
  }

  const next = async (result, index = state.index + 1) => {
    setActive(false)
    if (result) await onChange(result)
    const docs = !state.docs[index] ? await update() : state.docs
    setState({...state, docs, index })
  }

  const prev = () => {
    setActive(false)
    setState({...state, index: state.index - 1})
  }

  const onChange = async (result) => {
    card.result = result
    setState({...state})
    return new Promise((resolve) => setTimeout(resolve, 3000))

  }

  useEffect(() => {
    next(false, 0).then(() => setActive(true))
  }, [])


  return <CRow >
  <CCol >
   <CCard>
     <CCardBody className={style.card__body}>
       { card && <CRow className={style.card__body__row}>
          <CRow className={style.card__body__value}>
            <CCol><h2>{ card.value._id }</h2></CCol>
            <CCol className="d-flex justify-content-end">
            <CButton className={style.timer_btn} onClick={() => setActive(!active)}>
              <Timer active={active} next={() => next({}).then(() => setActive(true))}></Timer>
            </CButton>
            </CCol>
          </CRow>
         <CCol style={!card.result ? {} : card.result === card.value._id ? {
           background: '#a9eba94a' } : { background: '#efbbbb9e' }}
         className={style.card__body__left}>
           { card.result && <CCardText className={style.card__translate}>
              {card.value.dst }
            </CCardText> }
         </CCol>
         <CCol className={style.card__values}>
           { card.random.map(({_id, dst}) => {
             return <CFormCheck key={_id} label={dst}
             defaultChecked={card.result === _id}
             disabled={!!card.result}
             onChange={() => next(_id).then(() => setActive(true))}
             />
           }) }
         </CCol>
       </CRow>}
     </CCardBody>
     <CCardFooter className={style.card__footer}>
       {/* <CButton  onClick={edit}>Edit</CButton> */}
       <CButton  disabled={!state.index} onClick={() => prev()}>Prev</CButton>
       <CButton  onClick={() => next()}>Next</CButton>
     </CCardFooter>
   </CCard>
 </CCol>

 
</CRow>
}

export default PraxisCard