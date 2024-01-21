import React, { useState, useEffect } from "react"
import style from './style.module.css'

import { CFormInput, CDropdownItem, CDropdown, CDropdownMenu, CDropdownToggle, CInputGroup } from '@coreui/react'

const Autocomplete  = ({ api, url, value, setValue, schema }) => {
  const [items, setItems] = useState([])
  const update = async () => {
    try {
      setItems(await api.get(url))
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(() => { update() }, [url])

  return <CInputGroup>
    <CFormInput value={ value } onInput={({target}) => setValue(target)}/>
    <CDropdown variant="input-group">
      <CDropdownToggle color="secondary" variant="outline" />
      <CDropdownMenu className={style.autocomplete__dropdown_menu}>
        { items.map((item, index) => {
          return <CDropdownItem key={index} href="#">{schema(item)}</CDropdownItem>
        })}
      </CDropdownMenu>
  </CDropdown>
</CInputGroup>
}

export default Autocomplete
