import React from "react"
import { CButton, CDropdownItem, CDropdownToggle, CDropdown, CDropdownMenu } from '@coreui/react'

const DropDownBtn  = ({ schema }) => {
  return schema.map(({ title, action, menu, disabled }, index) => {
    return <CDropdown variant="btn-group" key={index}>
    <CButton disabled={disabled} color="primary" onClick={action}>{title}</CButton>
    { menu && <> <CDropdownToggle color="primary" split />
      <CDropdownMenu> { menu.map(({title, action, disabled}, index) => 
        <CDropdownItem key={index} onClick={action}>
          <CButton disabled={disabled} variant="ghost">{title}</CButton>
        </CDropdownItem>)} 
      </CDropdownMenu> </>}

  </CDropdown> 
  })
  

}

export default DropDownBtn
