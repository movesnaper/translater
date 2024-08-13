import React from "react"
import { CFormTextarea } from '@coreui/react'

import Content from './Content'
import Title from '../praxis/Card/CardTitle'
import DropDownBtn from '../../components/dropDownBtn'
import Tabs from './Tabs.jsx'
import Example from './Example'
import Translate from './Translate'

  const Modal = { 
        header: (value) => Title(value),
        content: (card, setValue) => {
          const {value} = card
          return Content({schema: [
            { component: <CFormTextarea rows={3} value={value?.dst} name="dst"
            onInput={({target}) => {
              setValue({...card, value: {...value, dst: target.value}})
            }}/>},
            { component: Tabs({ value, setValue: (value) => {
              setValue({...card, value})
            },
              schema: [
                { title: 'Example', component: Example },
                { title: 'lingvo', component: Translate('lingvo')},
                { title: 'yandex', component: Translate('yandex')}
              ]
            })}
          ]})
        },
        footer: ({key, index, value, save}) => <DropDownBtn schema={
          [ {},
            { title: 'Save', action: () => save({key, index, value}) }
          ]
        }/>
    }

export default Modal