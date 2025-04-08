import React, { useState, useEffect } from "react";
import DocTitle from '../../../components/docTitle'
import { NavLink } from "react-router-dom"
import style from './style.module.css'

const PageInfo = ({doc, api, setModal}) => {
  const [state, setState ] = useState({})
  const {id, title, totalKeys, user_id} = state || {}


  const update = async (doc) => {
    setState(doc.title ? doc : await api(doc))
  }

  useEffect(() => { update(doc) }, [doc])
  return  DocTitle({
      title: <NavLink className={style.pages__home__link} to={`/text/${id}`} >{title}</NavLink>,
      menu: [
        {title: 'praxis', href: `/praxis/${id}`},
        {title: 'dictionary', href: `/dictionary/${id}`},
        {title: 'edit', action: (v) => {
          setModal(state)
        }},
        // {title: 'merge', action: (_, setLoading) => {
        //   setLoading(true)
        //   merge(id).then(() => setLoading(false))
        // }}
      ]
    })
  }

export default PageInfo