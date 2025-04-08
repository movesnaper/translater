import React, { useState, useEffect } from "react";
import { useDebouncedCallback  } from 'use-debounce';
import { db } from '../../db/index.js'
import Autocomplete from '../../pages/Autocomplete.jsx'
import style from './style.module.css'
import Badge from "./Badge.jsx";
const api = db(`/documents/translate/lingvo`)

const CardAutocomplete = ({ value = {}, setValue }) => {
  
  const key = value._id || value.key
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  
  const update = async () => {
    if(loading) return
    try {
      setLoading(true)
      setItems(await api.get(`/key/${key}`) )
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }
  const debounced = useDebouncedCallback(update, 1000, { maxWait: 3000 } )

  useEffect(() => { 

    key && debounced()
   }, [key])




  return <div className={style.card__title}>
    <Autocomplete
    items={items} 
    name="id"
    value={key}
    footer={Badge({value})}
    setValue={({value: key}) => setValue({...value, key, _id: key })}
    schema={ ({_id: key, dst}) => {
      return <div
      onClick={async() => {
        setValue({ ...value, _id: key, key, dst })
      }}> { key } { dst } </div> 
    }
    }/>
    {value && Badge({value})}
  </div>
}

export default CardAutocomplete