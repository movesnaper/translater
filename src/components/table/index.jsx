import React, { useEffect, useRef } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import style from './style.module.css'


const Table = ({ items, schema, update= () => {}}) => {
  const { onClickRow, header } = schema|| {}
  const scrollableDiv = useRef(null);
  const getHeight = () => {
  // const height = (items?.length / total * 100)
  // return height >= 80 ? 80 : height
  return 80

  }
  const handelScroll = ({ scrollHeight, scrollTop }) => {
    
    // if (items.length >= 100) return scrollableDiv.current.scroll({top: 0, behavior: "smooth"})
    if (scrollTop <= 0) {
      update('top')
    }
    if (scrollHeight < scrollTop + window.innerHeight) {
      update('bottom')
    }
  }
  return <div ref={scrollableDiv} className={style.table__scroll} style={{ height: `${getHeight()}vh` }} 
  onScroll={({target}) => handelScroll(target)}>
    <CTable hover small style={{ width: '100%'}}>
    {/* style={{ position: "sticky", top: 0, height: '51px', verticalAlign: 'baseline' }} */}
    <CTableHead className={style.table__header}>
      <CTableRow>
      {/* <CTableHeaderCell colspan='2' style={style} >{'value'}</CTableHeaderCell>
      <CTableHeaderCell style={style} >{'value'}</CTableHeaderCell> */}
        {header.filter(({value}) => value !== false).map(({value, colSpan, style}, index) => 
        <CTableHeaderCell colSpan={colSpan} style={style} key={index}>{value}</CTableHeaderCell>)}
      </CTableRow>
    </CTableHead>
    <CTableBody>{ items && items.map((value, index) => {
      return <CTableRow key={index} onClick={() => onClickRow && onClickRow(value, index)}>
        { header.map(({getValue, style}, indexHeader) => 
        <CTableDataCell style={style} key={indexHeader}>
          {getValue && getValue(value, index)}
        </CTableDataCell>)}
    </CTableRow>
    })}
    </CTableBody>
  </CTable>
</div>
}

export default Table