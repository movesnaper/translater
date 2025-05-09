import React, { useState } from "react";
import Autocomplete from '../../components/autocomplite'
import { db } from '../../db/index.js'
import style from './style.module.css'

const api = db(`/documents/translate/lingvo`)

const Header = ({ value, setValue }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)


  return <div className={style.card__header__left}>
    <Autocomplete name="id" items={items} defaultValue={value?._id} schema={({ setValue: update}) => {
      return {
        onShow: (value) => {
          if(loading) return
          try {
            setLoading(true)
            api.get(`/key/${value}`).then(setItems)
          } catch(e) {
            console.log(e);
          } finally {
            setLoading(false)
          }
        },
        onChange: ({target}) => {
          const key = target.value
          setValue({ ...value, _id: key, key})
        },
        getValue: ({_id: key, dst}) => {
          return <div onClick={async() => {
            setValue({ ...value, _id: key, key, dst })
            update(key)
          }}> { key } { dst } </div> 
        },
      }
    }}/>
</div>
}

export default Header