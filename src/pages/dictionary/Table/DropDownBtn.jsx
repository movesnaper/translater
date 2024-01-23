import React from "react";
import { CButton, CFormCheck, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import style from './Dictionary.module.css'

const DropDownBtn = ({ value, addResult }) => {
  const exclude = () => {
    addResult(value);
  }
  const edit = () => {
    addResult(value);
  }
  const remove = () => {
    addResult(value);
  }

  return <CDropdown variant="btn-group">
  <CDropdownToggle variant="ghost" />
  <CDropdownMenu>
    <CDropdownItem onClick={exclude}> Exclude </CDropdownItem>
    <CDropdownItem onClick={edit}> Edit </CDropdownItem>
    <CDropdownItem onClick={remove}> Remove </CDropdownItem>
  </CDropdownMenu>

</CDropdown>

}

export default DropDownBtn