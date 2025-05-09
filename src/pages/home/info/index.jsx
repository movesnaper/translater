import React, { useState, useEffect } from "react";
import DocTitle from '../../../components/docTitle'
import { CBadge, CAvatar  } from '@coreui/react'

import style from './style.module.css'

const PageInfo = ({doc, setModal, api}) => {
  const [state, setState ] = useState({})
  const {id, title, info, user_id} = doc || {}
  const {keys, color} = info || {}


  const update = async (doc) => {
    setState(doc.title ? doc : await api(doc))
  }

  useEffect(() => { update(doc) }, [doc])
  return  <div className={style.info__content}>
    {DocTitle({
      title: <div className={style.info__title}>{title}</div>,
      menu: [
        {title: 'text', href: `/text/${id}`},
        {title: 'praxis', href: `/praxis/${id}`},
        {title: 'dictionary', href: `/dictionary/${id}`},
        { getValue: () => {
          return <div onClick={() => setModal(state)}>{'edit'}</div>
        }}
      ]
    })}
    <div>
    <CBadge color={color}>{keys}</CBadge>
      
      </div>
    <div>
    <CAvatar color={color || 'primary'} textColor="white">{user_id}</CAvatar>
    </div>
  </div>
  }

export default PageInfo