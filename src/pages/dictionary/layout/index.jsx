import React, { useState, useEffect } from 'react'
import Table from '../../../components/table'
import Modal from '../../../pages/modal'
import ShowModal from '../../../components/modal'
import style from './style.module.css'

const Layout = ({ page, api, schema }) => {
  const {filter, skip, limit } = page || {}
  const [values, setValues] = useState(false)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const setFilter = (filter) => {
    setPage({filter})
  }

   useEffect(() => {
    update({skip})
   }, [filter])

  const update = async ({skip, limit, search}, getValues = (v) => v) => {
    try {
      setLoading(true)
      const { values: items, total } = await api({skip, limit, filter, search})
      const values = getValues(items)
      setValues(values)
      values.length && setPage({ [filter]: values[0].index })
      setTotal(total)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  }

  const { table, setPage } = schema({api, values, filter, total, setModal, setFilter, setValues}, update)

const getSkip = (scroll) => {
  switch(scroll) {
    case 'top': {
      const {index} = values[0] || {}
      const skip = index - 5 > 0 ? index - 5 : 0
      return {skip, limit: 5, getValues: (items) => {
        return [...items.filter(({index: v}) => v < index), ...values]
      }}
    }
    case 'bottom': return {skip: values[values.length - 1]?.index + 1, getValues: (items) => {
      return [...values, ...items].filter((v, index) => index >= limit / 2)
    }}
  }
}

  return <div className={style.pages__dictionary__layout}>
      <Table  total={total} items={values} schema={table}
        update={(scroll) => {
          if (loading) return
          const {skip, limit, getValues} = getSkip(scroll)
            if (skip < total ) update({skip, limit}, getValues)
        }}/>
    { ShowModal({ schema: Modal, modal, setModal })}
  </div>
}

export default Layout