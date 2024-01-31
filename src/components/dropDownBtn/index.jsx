import React, {useState} from "react"
import { CRow, CCol, CButton } from '@coreui/react'
import { CDropdownItem, CDropdownToggle, CDropdown, CDropdownMenu } from '@coreui/react'
import style from './style.module.css'
const DropDownBtn  = ({ schema }) => {
  const [active, setActive] = useState(false)

  const toggle = (evt) => {
    evt.stopPropagation()
    setActive(!active)
  }

  return <CRow className={style.dropDownBtn}>{
    schema.map((item, index) => {
      const { xs, title, color, action, menu, disabled, variant = 'ghost', value } = item || {}
      return <CCol xs={xs} key={index}>
      <CDropdown className={style.dropDownBtn__group} variant="btn-group" visible={active}>
        { value || action && <CButton variant={variant}
        className={style.dropDownBtn__group__btn}
        disabled={disabled} color={color} onClick={action}>{title}</CButton> }
        { menu && <> 
          <CDropdownToggle className={style.dropDownBtn__toggle} variant="ghost" split  onClick={toggle}/>
          <CDropdownMenu> { menu.map(({title, action, disabled, value}, index) => 
            <CDropdownItem key={index} onClick={action}>
              { value || <CButton disabled={disabled} variant="ghost">{title}</CButton>}
            </CDropdownItem>)} 
          </CDropdownMenu> </>}
      </CDropdown>
    </CCol>
    }

  )}</CRow>
}

export default DropDownBtn
