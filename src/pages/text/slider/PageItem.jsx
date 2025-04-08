import React, { useState } from "react";
import ContextMenu from './ContextMenu'
import TooltipSpan from '../layout/TooltipSpan'

import style from './style.module.css'

const PageItem = ({edit, font, value, onClick, context}) => {
  const [state, setState ] = useState({ values: [], obj: {}, total: 0, loading: false, modal: false})

    const {values = [], obj = {}} = value
    const objValue = Object.assign(obj, edit)
    const items = values.map((v) => ({...v, value: objValue[v._id]}))
    const setContext = (context) => setState({...state, context})
    const getContextMenu = ({pageX: x, pageY: y}) => setContext({ x, y, range: window.getSelection().getRangeAt(0)})
    
    return <div className={style.text__slider__page_item_content} style={{fontSize: font}}
    onClick={() => setContext(false)} 
    onContextMenu={(e) => {
      e.preventDefault()
      state.context ? setContext(false) : getContextMenu(e)
    }}
    >
      {items.map((item, index) => <TooltipSpan
          key={index}
          item={item}
          index={index}
          onClick={() => onClick(item)}
      />)}
    <ContextMenu context={state.context} onClose={setContext}
    schema={context(() => {
      console.log(state);
      
      // update({limit, mark})
    })}
    />
    </div>
}

export default PageItem