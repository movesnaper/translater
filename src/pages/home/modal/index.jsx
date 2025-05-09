import React from "react"
import { CFormLabel, CFormInput , CFormTextarea } from '@coreui/react'
import { CButton } from '@coreui/react'
// import Tabs from '../../../components/tabs/index.jsx'
import style from './style.module.css'

  const Modal = ({save}) => ({ 
        header: ({value = {}}) => {
        //   const {title, desc, user} = value
        //   return <div className={style.documents__modal__header}>
        //   <div>{title}</div>
        //   <div>{desc || user}</div>
        // </div>
        },
        content: ({value = {}, index}, setValue) => {
          const {title, desc, info, user} = value
          const update = (value) => setValue({value, index})
          return <div className={style.documents__modal__content}>
            <div className={style.content__doc__item}>
              <CFormLabel htmlFor="doc__title">{'title'}</CFormLabel>
              <CFormInput  id='doc__title' value={title} name="title"
              onInput={({target}) => update({...value, title: target.value})}/>
            </div>
            <div className={style.content__doc__item} >
            <CFormLabel htmlFor="doc__desc">{'desc'}</CFormLabel>
            <CFormTextarea id='doc__desc' rows={3} value={desc}
              name="desc" onInput={({target}) => update({...value, desc: target.value})}/>
            </div>
            <div className={style.content__doc__item} >
            <CFormLabel htmlFor="doc__info">{'info'}</CFormLabel>
              <div className={style.content__doc__info}>
                {Object.entries(info || {}).map(([key, value], index) => {
                  return <div key={`content__doc__info${index}`}>{key} {value}</div>
                })}
              </div>
            </div>

          </div>
        },
        footer: (value) => {
          return <div className={style.home__modal__footer}>
          <CButton variant='ghost' onClick={() => save(value)}>Save</CButton>
        </div>
        }
    })

export default Modal