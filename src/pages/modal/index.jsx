import React from "react"
import { CFormTextarea } from '@coreui/react'
import Content from './Content'
import CardHeader from '../../components/cardHeader'
import { CButton, CSpinner } from '@coreui/react'
import Tabs from '../../components/tabs/index.jsx'
import Example from './Example'
import Translate from './Translate'
import style from './style.module.css'

  const Modal = { 
        header: ({value}) => CardHeader({value}),
        content: (card, setValue) => {
          const {value} = card
          return Content({schema: [
            { component: <CFormTextarea rows={3} value={value?.dst} name="dst"
            onInput={({target}) => {
              setValue({...card, value: {...value, dst: target.value}})
            }}/>},
            { component: Tabs({ schema: ({active}) => {
                const props = {value, setValue: (value) => {
                  setValue({...card, value})
                }}
                return [
                  { title: 'Example', component: () => Example(props) },
                  { title: 'lingvo', component: () => active ===1 && Translate('lingvo')(props)},
                  // { title: 'yandex', component: () => Translate('yandex')}
                ]
              }
            })}
          ]})
        },
        footer: ({key, index, value, save}) => {
          return <div className={style.card__modal__footer}>
          <CButton variant='ghost' onClick={() => save({key, index, value})}>{
          // loading ? <CSpinner component="span" size="sm" aria-hidden="true"/> : 
          'Save'
        }</CButton>
        </div>
        }
    }

export default Modal