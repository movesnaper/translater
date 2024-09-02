import React from "react"
import { CFormTextarea } from '@coreui/react'
import Content from './Content'
import CardHeader from '../../components/cardHeader'
import DropDownBtn from '../../components/dropDownBtn'
import Tabs from '../../components/tabs/index.jsx'
import Example from './Example'
import Translate from './Translate'

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
        footer: ({key, index, value, save}) => <DropDownBtn schema={
          [ {},
            { title: 'Save', action: () => save({key, index, value}) }
          ]
        }/>
    }

export default Modal