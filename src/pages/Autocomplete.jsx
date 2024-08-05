import React, { useState, useEffect } from "react"
import style from './style.module.css'

import { CFormInput, CDropdownItem, CDropdown, CDropdownMenu, CDropdownToggle, CInputGroup } from '@coreui/react'

const Autocomplete  = ({ api, value = '', setValue, schema, name }) => {
  const [items = [], setItems] = useState([])
  const update = async () => {
    try {
      value && setItems(await api.get(value) )
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(() => { update() }, [])

  return <CInputGroup>
    <CFormInput name={name} value={ value } onInput={({target}) => setValue(target)}/>
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
