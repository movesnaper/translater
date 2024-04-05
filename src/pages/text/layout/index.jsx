import React, { useState, useEffect, useContext } from "react";
import HtmlText from './HtmlText'
import { Context } from "../../../components/Provider"

const TextLayout = ({ id, api, setItem }) => {
  const [{ pageText }, { pageText: updatePage }] = useContext(Context)
  const { limit = 100, mark = 0 } = pageText ? (pageText[id] || {}) : {}
  const [{ values = [], obj = {} }, setValues] = useState({})

  const setPage = (mark) => {
    updatePage({...pageText, [id]: { mark }})
  }

 const update = async (skip = mark) => {
  try {
    const values = await api.get(`/text/${id}`, { limit, skip })
    setValues(values)
  } catch (e) { console.error(e) }
 }

  useEffect(() => { pageText && update() }, [pageText])

  return <HtmlText schema={({ modal, setModal }) => {
    const { index, key } = modal || {}
    const setValue = (value) => {
      setItem({...modal, value})
      .then(() => update())
      setModal(false)
    }

    return {
      values: values.map((item) => ({...item, value: obj[item.key]})),
      footer: [
        { xs: 2, title: 'Prev', action: () => setPage(mark - limit) },
          {},
        { xs: 2, title: 'Next', action: () => setPage(mark + limit) },
      ],
      modalSchema: [ {},
        { title: 'Save', action: () => setValue(modal.value),
        menu: [
          { title: 'Exclude', action: () => setValue({ _id: key, exclude: true })},
          { title: 'Remove', action: () => setValue(undefined)}
        ]}]
    }
  }}/>

}

export default TextLayout