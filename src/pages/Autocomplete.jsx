import React from "react"
import style from './style.module.css'

import { CFormInput, CDropdownItem, CDropdown, CDropdownMenu, CDropdownToggle, CInputGroup } from '@coreui/react'

const Autocomplete  = ({ items = [], value = '', setValue, schema, name }) => {
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
