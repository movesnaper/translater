import React, {useState, useEffect, useRef} from "react"
import Timer from "./Timer"
import style from './Praxis.module.css'
import { CFormCheck, CCardFooter, CRow, CCol, CCard, CCardBody, CCardText, CButton } from '@coreui/react'
import { db } from '../../db/index.js'

const PraxisCard =  ({items}) => {
  const [state, setState] = useState({docs: []})
  // const RefTimer = useRef(RefTimer)
  const card = state.docs[state.index]

  const update = async() => {
    const key = items[Math.floor(Math.random()*items.length)]
    const doc = await db('/praxis').get(`/${key}`)
    return [...state.docs, doc]
  }

  const next = async (index = state.index + 1) => {
    const docs = !state.docs[index] ? await update() : state.docs
    setState({...state, docs, index})
  }

  const onChange = async (result) => {
    // RefTimer.stop()
    card.result = result
    setState({...state})
    return new Promise((resolve) => {
       setTimeout(() => {
        next().then(() => {
          // resolve(RefTimer.reset())
        })
      }, 3000)
    })

  }

  useEffect(() => {
    next(0)
  }, [])

  const startTimer = (timer) => {
    console.log(timer);
  }

  return <CRow >
  <CCol >
   <CCard>
     <CCardBody className={style.card__body}>
       { card && <CRow className={style.card__body__row}>
          <CRow className={style.card__body__value}>
            <CCol><h2>{ card.src }</h2></CCol>
            <CCol className="d-flex justify-content-end">
              <Timer start={startTimer}
              next={() => {
                return onChange({}).then(() => next())
              }}></Timer>
            </CCol>
          </CRow>
         <CCol style={!card.result ? {} : card.result.src === card.src ? {
           background: '#a9eba94a' } : { background: '#efbbbb9e' }}
         className={style.card__body__left}>
           { card.result && <CCardText className={style.card__translate}>
              {card.dst }
            </CCardText> }
         </CCol>
         <CCol className={style.card__values}>
           { card.items.map((doc = {}, index) => {
             return <CFormCheck key={index} label={doc && doc.dst}
             defaultChecked={card.result && card.result._id === doc._id}
             disabled={!!card.result}
             onChange={() => onChange(doc)}
             />
           }) }
         </CCol>
       </CRow>}
     </CCardBody>
     <CCardFooter className={style.card__footer}>
       {/* <CButton  onClick={edit}>Edit</CButton> */}
       <CButton  disabled={!state.index}
       onClick={() => next(state.index - 1)}>Prev</CButton>
       <CButton  onClick={() => next()}>Next</CButton>
     </CCardFooter>
   </CCard>
 </CCol>

 
</CRow>
}

export default PraxisCard