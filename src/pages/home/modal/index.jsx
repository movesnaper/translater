import React from "react"
import { CFormTextarea } from '@coreui/react'
import { CButton } from '@coreui/react'
import Tabs from '../../../components/tabs/index.jsx'
import style from './style.module.css'

  const Modal = ({save}) => ({ 
        header: ({value = {}}) => {
          const {title, desc, user} = value
          return <div className={style.documents__modal__header}>
          <div>{title}</div>
          <div>{desc || user}</div>
        </div>
        },
        content: ({value = {}, index}, setValue) => {
          const {title, desc, user} = value
          const update = (value) => setValue({value, index})
          return <div className={style.documents__modal__content}>
            <div>
              <CFormTextarea rows={3} value={title} name="title"
              onInput={({target}) => update({...value, title: target.value})}/>
            </div>
            {Tabs({schema: () => {
              return [
                { title: 'Description', component: () => <CFormTextarea 
                name="desc"
                rows={3}
                value={desc || user} 
                onInput={({target}) => update({...value, desc: target.value})}/> },
              ]
            }})}
          </div>
        },
        footer: (value) => {
          return <div className={style.home__modal__footer}>
          <CButton variant='ghost' onClick={() => save(value)}>Save</CButton>
        </div>
        }
    })

export default Modal