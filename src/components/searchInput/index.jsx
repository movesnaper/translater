import React, { useState, useEffect } from "react"
import Autocomplete from '../autocomplite/index.jsx'
import { CCloseButton } from '@coreui/react'
import style from './style.module.css'

const SearchInput  = ({ schema }) => {
  const [items, setItems] = useState([])

  const { api, update } = schema({ items})

  const unic =  (v, index, array) => v && array.indexOf(v) === index

 return <Autocomplete name="search" items={items.map(({_id}) => _id).filter(unic)} 
  schema={({ value, setValue }) => {

  return {
    children: () => <CCloseButton onClick={() => {
      setValue('')
      update()
    }} className={style.autocomplete__close_btn} />,
    // api: (search = '') => {
    //   try {
    //     api({search}).then(({values}) => setItems(values))
    //   }catch(e) {
    //     console.error(e);
        
    //   }
    // },
    getValue: () => {
      return <div onClick={async() => {
        setValue(value)
        // update(value)
      }}> { value } </div> 
    }

  }
}}/>

}

export default SearchInput
