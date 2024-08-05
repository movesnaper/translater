import React, { useEffect, useContext } from "react";
import HtmlText from './HtmlText'
import { Context } from "../../../components/Provider"

const TextLayout = ({ id, values, update }) => {
  const [{ pageText }, { pageText: updatePage }] = useContext(Context)
  const { limit = 100, mark = 0 } = pageText ? (pageText[id] || {}) : {}

  const setPage = (mark) => {
    updatePage({...pageText, [id]: { mark }})
  }

  useEffect(() => { pageText && update(limit, mark) }, [pageText])

  return <HtmlText schema={{
    content: values,
    footer: [
      { xs: 2, title: 'Prev', action: () => setPage(mark - limit) },
        {},
      { xs: 2, title: 'Next', action: () => setPage(mark + limit) },
    ],    
  }}
  />

}

export default TextLayout