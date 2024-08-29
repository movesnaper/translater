import React, { useEffect, useContext, useState } from "react";
import DropDownBtn from '../../../components/dropDownBtn'
import { Context } from "../../../components/Provider"
import Range from '../../../components/range'
import style from './style.module.css'

const TextLayout = ({ id, api, schema }) => {
  const [state, setState ] = useState({ values: [], obj: {}, mark: null, total: 0})
  const [{ pageText }, { pageText: updatePage }] = useContext(Context)
  const { limit = 150, mark = 0, font = 14  } = pageText ? (pageText[id] || {}) : {}

  const setPage = async({mark, font}) => {
    updatePage({...pageText, [id]: { mark, font }})
    return {mark, font, limit}
  }

  const update = async ({limit, mark}) => {
    try {
      setState(await api({ limit, skip: mark }))
    } catch (e) { console.error(e) }
  }

  useEffect(() => { update({limit, mark}) }, [])
  const values = state.values.map((item) => ({...item, value: state.obj[item.key]}))
  return <>
    <div className={style.text__html__header}>
      {Range({
        values: [font], 
        settings: {step: 0.1, min: 10, max: 40}, 
        setValues: ([font]) => setPage({font, mark})
        })}
    </div>
    <div className={style.text__html__body} style={{fontSize: font}}>
      {schema({...state, values }, (value) => {
      setState(Object.assign(state, value))
    })}</div>
    <div className={style.text__html__footer}>
    <DropDownBtn className={style.text__html__footer__btns}  schema={[
      { title: 'Prev', action: () => setPage({mark: mark - limit, font}).then(update) },
      { title: `Current ${Math.floor(mark / limit) + 1}`, action: () => {}},
      { title: `Total ${Math.floor(state.total / limit) + 1}`, action: () => {}},
      { title: 'Next', action: () => setPage({mark: mark + limit, font}).then(update) },
    ]}/>
    </div>
  </>

}

export default TextLayout