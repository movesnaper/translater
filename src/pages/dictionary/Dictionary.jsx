import style from './Dictionary.module.css'
import axios from 'axios'
import React, { useState, useEffect } from "react"
import { CListGroup, CListGroupItem, CButton } from '@coreui/react'
import { useParams, NavLink } from 'react-router-dom';

const url = 'http://localhost:5000/dictionary'

const Dictionary =  () => {
  const [dictionary, setDictionary] = useState({ docs: [] })
  const [loading, setLoadind] = useState(false)
  const { id } = useParams();

  const update = async () => {
    if (loading  || dictionary.done) return
    try {
      setLoadind(true)
      const params = { bookmark: dictionary.bookmark, limit: 10 }
      const {data} = await axios.get(`${url}/${id || ''}`, { params })
      const docs = [...dictionary.docs, ...data.docs]
      setDictionary({...data, docs, done: !data.docs.length})
    } catch (e) {
      console.log(e);
    } finally {
      setLoadind(false)
    }

  }

  useEffect(() => {
   
    update()
  }, [])

  const handelScroll = ({target}) => {
    !loading && target.scrollHeight - target.scrollTop <= 400  && update()
  }

  return <div className={style.Dictionary}>
      <div  className={style.Dictionary__header}>
        <h1>Total: {dictionary.total}</h1>
        <NavLink to={`/praxis/${id || ''}`}>
          <CButton  color="light" variant="outline" >praxis</CButton>
        </NavLink>
      </div>
      <div  className={style.Scroller} style={{ height: 400 }}
      onScroll={handelScroll}>
      <CListGroup className={style.ListGroupe}>
        {dictionary.docs.map((doc, index) => {
          return <CListGroupItem key={index} className={style.ListItem}>
            <div>
            <div>{doc.origin}</div>
            <div>{doc.translate}</div>
            </div>
          </CListGroupItem>
        })}

      </CListGroup>
      </div>

  </div>
}

export default Dictionary