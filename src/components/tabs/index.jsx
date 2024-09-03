import React, {useState} from "react"
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
const Tabs = ({ schema }) => {
  const [active, setActive] = useState(0)

  return  <>
    <CNav variant="tabs">
        { schema({active, setActive}).map(({title}, index) => {
          return  title && <CNavItem key={index}>
          <CNavLink href="#" active={active === index} onClick={() => setActive(index)}>
            {title}
          </CNavLink>
        </CNavItem>
        })}
    </CNav>
    <CTabContent>
      { schema({active, setActive}).map(({component}, index) => {
        return component && <CTabPane role="tabpanel" key={index} visible={active === index}>
          {component() }
        </CTabPane>
      })}
    </CTabContent>
  </>
}

export default Tabs