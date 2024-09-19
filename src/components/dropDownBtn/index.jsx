import React, {useState} from "react"
import { CRow, CCol, CButton, CSpinner } from '@coreui/react'
import { CDropdownItem, CDropdownToggle, CDropdown, CDropdownMenu } from '@coreui/react'
import style from './style.module.css'
const DropDownBtn  = ({ schema }) => {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggle = (evt) => {
    evt.stopPropagation()
    setActive(!active)
  }

  return <CRow className={style.dropDownBtn}>{
    schema.map((item, index) => {
      const { xs, title, color, action, menu, variant = 'ghost', value, disabled } = item || {}
      return <CCol xs={xs} key={index}>
      <CDropdown className={style.dropDownBtn__group} variant="btn-group" visible={active}>
        { value || <CButton variant={variant}
        className={style.dropDownBtn__group__btn}
        disabled={loading || disabled} color={color} onClick={(e) => action && action(e, setLoading)}>{
          loading ? <CSpinner component="span" size="sm" aria-hidden="true"/> : title
        }</CButton> }
        { menu && <> 
          <CDropdownToggle className={style.dropDownBtn__toggle} variant="ghost" split  onClick={toggle}/>
          <CDropdownMenu> { menu.map(({title, disabled, action, href}, index) => 
            <CDropdownItem className={style.dropDownBtn__item} key={index} href={href} disabled={loading || disabled} 
              onClick={(e) => action && action(e, setLoading)}>{ title }</CDropdownItem>)} 
          </CDropdownMenu> </>}
      </CDropdown>
    </CCol>
    }

  )}</CRow>
}

export default DropDownBtn
