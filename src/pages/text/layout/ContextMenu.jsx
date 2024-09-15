import React, {useState} from "react";
import { CSpinner, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react'

import style from './style.module.css'


const ContextMenu = ({schema, context, onClose}) => {
  const [loading, setLoading] = useState(false)
  const { x, y, range } = context || {}
  const contextStyle = {
    display: context ? 'block' : 'none',
    position: 'absolute',
    top: y,
    left: x,
    zIndex: 200
  }

  const getSelectedNodes  = ({startContainer, endContainer}) => {
    const nextNode = (node) => node.localName === 'span' ? node 
      : nextNode(node.parentNode)
    return [startContainer, endContainer].map(({parentNode}) => 
      + nextNode(parentNode).getAttribute('data-index'))
  }


  return  <CDropdown style={contextStyle}  visible={true} className={style.pages__text__context}>
  <CDropdownMenu>
  {loading ? <div className={style.pages__text__context__spiner}>
    <CSpinner component="span" size="sm" aria-hidden="true"/>
  </div>
  : schema.map(({title, action}, index) => 
        <CDropdownItem key={index}  href="#" onClick={() => {
          setLoading(true)
          action(getSelectedNodes(range)).then(() => setLoading(false))
        }}>{title}</CDropdownItem>)}  

  </CDropdownMenu>
</CDropdown>

}

export default ContextMenu