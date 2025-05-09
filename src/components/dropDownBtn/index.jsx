import React, {useState} from "react"
// import { CCol } from '@coreui/react'
import { CDropdownItem, CDropdownToggle, CDropdown, CDropdownMenu } from '@coreui/react'
import style from './style.module.css'
const DropDownBtn  = ({ schema, active: value ,style: elStyle }) => {
  const [active, setActive] = useState(value)

  const { title, menu } = schema({active, setActive})

      return <div style={elStyle}>
      <CDropdown className={style.dropDownBtn__group}>
          <CDropdownToggle className={style.dropDownBtn__toggle} variant="ghost" split  
          >{title}</CDropdownToggle>
        { menu && <CDropdownMenu> { menu.map((item, index) => {
          const { disabled, href, getValue = ({title}) => title } = item || {}
          return <CDropdownItem className={style.dropDownBtn__item} key={index} href={href} disabled={disabled} 
          active={active === index} onClick={() => setActive(index)}>{ getValue(item)}</CDropdownItem>
        })} 
          </CDropdownMenu>
          }
      </CDropdown>
    </div>

}

export default DropDownBtn
