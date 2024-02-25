import React, { useState, useEffect, useContext } from "react";
import HtmlText from './HtmlText'
import { Context } from "../../../components/Provider"

const TextLayout = ({ id, api, setItem }) => {
  const [{ pageText }, { pageText: updatePage }] = useContext(Context)
  const { limit = 100, mark: pageMark = 0 } = pageText ? (pageText[id] || {}) : {}
  const [values, setValues] = useState([])

  const setPage = (mark) => {
    updatePage({...pageText, [id]: { mark }})
  }

 const update = async (mark = pageMark) => {
  try {
    const { values } = await api.get(`/text/${id}`, { limit, mark })
    setValues(values)
    return values
  } catch (e) { console.log(e) }
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
      values,
      footer: [
        { xs: 2, title: 'Prev', action: () => setPage(pageMark - limit) },
          {},
        { xs: 2, title: 'Next', action: () => setPage(pageMark + limit) },
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