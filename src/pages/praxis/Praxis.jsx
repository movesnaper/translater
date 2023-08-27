import React, { useState, useEffect} from "react"
import { useParams } from 'react-router-dom'
import style from './Praxis.module.css'
import { CFormCheck, CCardFooter, CContainer, CRow, CCol, CCard, CCardBody, CCardText, CButton } from '@coreui/react'
import axios from 'axios'
import Modal from './modal/Modal'

const url = 'http://localhost:5000/praxis'

const Praxis =  () => {
  const [card, setCard] = useState({ docs: [], values: []})
  const [modal, setModal] = useState(false)
  const { id } = useParams();

  const update = async () => {
    const {data} = await axios.get(`${url}/${id || ''}` )
    setCard(data)
  }
  const handleCgange = (result = {}) => {

    setCard({...card, result})
  }
  const edit = (v) => {
    setModal(true)
  }


  useEffect(() => {
    update()
  }, [])

  return <CContainer className={style.Praxis}>
    <Modal visible={modal} setModal={setModal} card={card}/>
    <CRow>
      <div  className={style.praxis__header}>
        <h1>Total: {card.total}</h1>
      </div>
    </CRow>
    <CRow >
       <CCol >
        <CCard>
          <CCardBody className={style.card__body}>
            <CRow className={style.card__body__row}>
              <h2 className={style.card__body__value}>{ card.key }</h2>
              <CCol
              style={!card.result ? {} : card.result.origin === card.key ? {
                background: '#a9eba94a'
              } : {
                background: '#efbbbb9e'
              }}
              className={style.card__body__left}>
                { card.result && card.docs.map((doc, index) => {
                  return <CCardText className={style.card__translate}
                  key={index}>{doc && doc.translate }</CCardText>
                })}
              </CCol>
              <CCol className={style.card__values}>
                { card.values.map((doc = {}, index) => {
                  return <CFormCheck key={index} label={doc && doc.translate}
                  // className={style.card__formChek}
                  defaultChecked={card.result && card.result._id === doc._id}
                  disabled={!!card.result}
                  onChange={() => handleCgange(doc)}
                  />
                }) }
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className={style.card__footer}>
            <CButton  onClick={edit}>Edit</CButton>
            <CButton  onClick={update}>Next</CButton>
          </CCardFooter>
        </CCard>
      </CCol>

      
    </CRow>
    </CContainer>
}

export default Praxis