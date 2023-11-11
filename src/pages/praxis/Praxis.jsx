import React, { useState, useEffect} from "react"
import { useParams, NavLink } from 'react-router-dom'
import style from './Praxis.module.css'
import { CContainer } from '@coreui/react'
import { db } from '../../db/index.js'
// import Modal from './modal/Modal'
import PraxisCard from './PraxisCard'


const Praxis =  () => {
  const [card, setCard] = useState({ keys: [] })
  const { id } = useParams()

  const setModal = () => {
    setCard({...card, modal: !card.modal})
  }

  const setLoading = (loading) => {
    setCard({...card, loading})
  }

  const update = async () => {
    try {
      const doc = await db('/documents').get(`/${id}`)
      setCard(doc)
    }catch(e) {
      console.log(e);
    }finally {
    }
  }


  const edit = (v) => {
    setModal(true)
  }

  useEffect(() => {
    update()
  }, [])

  return <CContainer className={style.Praxis}>
    {/* // <Modal visible={card.modal} setModal={setModal} card={card}/> */}
    <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-center align-items-center">
        <NavLink color="light" to={`/dictionary/${id}`}>
            {card.title}
        </NavLink>
      </div>
      <div  className={style.praxis__header}>
        <h1>Total: {card.keys.length}</h1>
      </div>
    </div>
    {card.keys.length && <PraxisCard items={card.keys} />}
    </CContainer>
}

export default Praxis