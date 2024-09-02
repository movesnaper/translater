import React from "react";
import { db } from '../../db/index.js'
import Autocomplete from '../../pages/Autocomplete.jsx'
import style from './style.module.css'
import Badge from "./Badge.jsx";

const CardAutocomplete = ({ value, setValue }) => {
  const { _id, key } = value || {}
  const api = db(`/documents/translate/lingvo/key/`)
  return <div className={style.card__title}>
    <Autocomplete
    api={api} 
    name="id"
    value={_id || key}
    footer={Badge({value})}
    setValue={({ value: target, _id }) => setValue({...value, _id: target ||_id })}
    schema={ (item) => <div
      onClick={() => setValue(item)}> { item._id } { item.dst } </div> 
    }/>
    {value && Badge({value})}
  </div>
}

export default CardAutocomplete