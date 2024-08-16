import React, { useEffect, useContext, useState } from "react";
import DropDownBtn from '../../../components/dropDownBtn'
import { Context } from "../../../components/Provider"
import Range from './Range'
import style from './style.module.css'

const TextLayout = ({ id, api, schema }) => {
  const [state, setState ] = useState({ values: [], obj: {}, mark: null, total: 0})
  const [{ pageText }, { pageText: updatePage }] = useContext(Context)
  const { limit = 150, mark = 0, font = 14  } = pageText ? (pageText[id] || {}) : {}

  const setPage = ({mark, font}) => {
    updatePage({...pageText, [id]: { mark, font }})
  }

  const update = async (limit, skip) => {
    try {
      setState(await api({ limit, skip }))
    } catch (e) { console.error(e) }
  }

  useEffect(() => { pageText && update(limit, mark) }, [pageText])
  const values = state.values.map((item) => ({...item, value: state.obj[item.key]}))
  return <>
    <div className={style.text__html__body} style={{fontSize: font}}>
      <div className={style.text__html__range_layout}>
      {Range({values: [font], setValues: ([font]) => setPage({font, mark})})}
      </div>
      {schema({...state, values }, (value) => {
      setState(Object.assign(state, value))
    })}</div>
    <DropDownBtn schema={[
      { xs: 2, title: 'Prev', action: () => setPage({mark: mark - limit, font}) },
      { title: `Current ${Math.floor(mark / limit) + 1}`, action: () => {}},
      { title: `Total ${Math.floor(state.total / limit) + 1}`, action: () => {}},
      { xs: 2, title: 'Next', action: () => setPage({mark: mark + limit, font}) },
    ]}/>
  </>

}

export default TextLayout