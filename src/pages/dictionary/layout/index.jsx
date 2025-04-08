import React, { useState, useEffect, useContext } from 'react'
import Table from '../../../components/table'
import Modal from '../../text/modal'
import { Context } from "../../../components/Provider"
import ShowModal from '../../../components/modal'
import style from './style.module.css'

const DictionaryTable = ({ id, api, schema }) => {
  const [{ pageDictionary = {}}, { pageDictionary: updatePage }] = useContext(Context)
  // const { skip = 0, limit = 20 } = pageDictionary[id] || {}
  const page = pageDictionary[id]
  const {filter, [page?.filter || false]: skip = 0, limit = 20} = page || {}
  const [values, setValues] = useState(false)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  // const [filter, setFilter] = useState(false)

  const setPage = (value) => {
    updatePage({...pageDictionary, [id]: {...page, ...value}})
  }

  const setFilter = (filter) => {
    setPage({filter})
  }

  // useEffect(() => {
  //   if (!values) update({skip, limit})
  //  }, [values])

   useEffect(() => {
    update({skip})
   }, [filter])

  const update = async ({skip, limit}, getValues = (v) => v) => {
    try {
      setLoading(true)
      const { values: items, total } = await api({skip, limit, filter})
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

  const {table} = schema({filter, total, setModal, setFilter}, async (index)=> {
    const {index: skip} = values[index] || {}
    update({skip, limit: values.length - index}, (items) => {
      return [...values.filter((v, i) =>  i < index), ...items]
    })
    setModal(false)
  })

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
      <Table total={total} items={values} schema={table}
        update={(scroll) => {
          if (loading) return
          const {skip, limit, getValues} = getSkip(scroll)
            if (skip < total ) update({skip, limit}, getValues)
        }}/>
    { ShowModal({ schema: Modal, modal, setModal })}
  </div>
}

export default DictionaryTable