import React, {useState} from "react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import Translate from './Translate'
import Transcript from './Transcript'
import Example from './Example'

const schema = [
  { title: 'Translate', component: Translate },
  { title: 'Transcript', component: Transcript },
  { title: 'Example', component: Example },
]

const ItemBody = ({value, setValue}) => {
  const [active, setActive] = useState(0)

  return <>
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
    return <CTabPane role="tabpanel" key={index} visible={active === index}>
      {component({value, setValue})}
    </CTabPane>
  })}
</CTabContent>
</>

}
export default ItemBody