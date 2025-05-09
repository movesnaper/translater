import React from "react"
import Content from './Content'
import ItemsList from './ItemsList.jsx'
import Header from './Header.jsx'
import { CButton, CSpinner } from '@coreui/react'
import DropDownBtn from '../../components/dropDownBtn'

import style from './style.module.css'

const save = (api) => async(ref, key, items = []) => {
  const values = items.filter(({uid, active}) => uid || active !== undefined)
  .map((v) => ({...v, _id: key || ref}))
  try {
    return api({ key: ref, value: key, values })
  } catch(e) {
    console.error(e);
  }    
}

  const Modal = { 
        header: (card, setValue) => Header({value: card.value, setValue: (value) => setValue({...card, value })}),
        content: (card, setModal) => {
          return  Content({schema: [ 
            {component: ItemsList(card.value, (value) => setModal({...card, value }))},
          ]})
        },
        footer: ({ value, save }) => {
          return <div className={style.card__modal__footer}>
            {DropDownBtn({schema: () => {
              return {
                title: <CButton variant='ghost' onClick={() => save(value)}>{'Save'}</CButton>,
                menu: [
                  {title: <div onClick={() => save(value)}>{'exclude'}</div>}
                ]
                
              }
            }})}
          {/* <CButton variant='ghost' onClick={() => save(value)}>{
          loading ? <CSpinner component="span" size="sm" aria-hidden="true"/> : 
          'Save'
        }</CButton> */}
        </div>
        }
    }

export default Modal