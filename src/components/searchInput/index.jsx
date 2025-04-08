import React, {useState} from "react"
import { CForm, CFormInput, CRow, CCol, CButton, CSpinner } from '@coreui/react'
import { CDropdownItem, CDropdownToggle, CDropdown, CDropdownMenu } from '@coreui/react'
import style from './style.module.css'

const SearchInput  = ({ schema, style: elStyle }) => {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)



 return <CFormInput
    style={elStyle}
    type="email"
    id="exampleFormControlInput1"
    placeholder="name@example.com"
    aria-describedby="exampleFormControlInputHelpInline"
  />

}

export default SearchInput
