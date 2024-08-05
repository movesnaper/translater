import React from "react";
import { db } from '../../db/index.js'
import Autocomplete from '../../pages/Autocomplete'
import style from './style.module.css'

const AutocompleteTitle = ({ value, setValue }) => {
  const { _id, key } = value || {}
  const api = db(`/documents/translate/lingvo/key/`)
  return <Autocomplete api={api} 
  name="id"
  value={_id || key}
  setValue={({ value: target, _id }) => setValue({...value, _id: target ||_id })}
  schema={ (item) => <div className={style.card__edit__autocomplete_item}
    onClick={() => setValue(item)}> { item._id } { item.dst } </div> 
  }/>
}

export default AutocompleteTitle