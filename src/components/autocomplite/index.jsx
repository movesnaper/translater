import React, {useState, useEffect} from "react"
import { CFormInput, CDropdownItem, CDropdown, CDropdownMenu, CDropdownToggle, CInputGroup } from '@coreui/react'
import { useDebouncedCallback  } from 'use-debounce';

import style from './style.module.css'


const Autocomplete  = ({ items = [], defaultValue, schema, name }) => {
  // const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(defaultValue)

  const { getValue, onChange, onShow, children} = schema({value, setValue})
  // const update = () => {
  //   if(loading) return
  //   try {
  //     setLoading(true)
  //     return api(value)
  //   } catch(e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false)
  //   }}
  // // const debounced = useDebouncedCallback(() => {
  //   if(loading) return
  //   if(!value) return []
  //   try {
  //     setLoading(true)
  //     return api(value)
  //   } catch(e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false)
  //   }
  // }, 1000, { maxWait: 3000 } )

  // useEffect(() => { value && debounced() }, [value])

  return <div className={style.search__input__component} >
    {children && children()}
    <CInputGroup>
    <CFormInput name={name} 
    delay={1000}
    value={value}
    onChange={onChange}
    onInput={({target}) => setValue(target.value)}
    />

    <CDropdown  variant="input-group" onShow={() => onShow && onShow(value)}>
      <CDropdownToggle color="secondary" variant="outline" />
      <CDropdownMenu className={style.autocomplete__dropdown_menu}>
        { items && items.map((item, index) => {
          return <CDropdownItem key={index} href="#">{getValue(item)}</CDropdownItem>
        })}
      </CDropdownMenu>
  </CDropdown>

</CInputGroup>
  </div>
}

export default Autocomplete
