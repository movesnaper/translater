import React, {useState} from "react"
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
const Tabs = ({ value, setValue, schema }) => {
  const [active, setActive] = useState(0)

  return  <>
    <CNav variant="tabs">
        { schema.map(({title}, index) => {
          return   <CNavItem key={index}>
          <CNavLink href="#" active={active === index} onClick={() => setActive(index)}>
            {title}
          </CNavLink>
        </CNavItem>
        })}
    </CNav>
    <CTabContent>
      { schema.map(({component}, index) => {
        const update = (value) => {
          setValue(value)
          setActive(0)
        }
        const visible = active === index
        return <CTabPane role="tabpanel" key={index} visible={visible}>
          {component({value, setValue: update, visible})}
        </CTabPane>
      })}
    </CTabContent>
  </>
}

export default Tabs