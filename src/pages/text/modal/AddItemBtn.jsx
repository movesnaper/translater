import React from "react";
import DropDownBtn from '../../../components/dropDownBtn'
import { db } from '../../../db/index.js'
const api = db(`/documents/translate/lingvo/`)


const AddItemBtn = (value, setModal) => {
  const { key, value: values = [] } = value || {}
  const setValue = (values) => {
    setModal({...value, value: values})
  }
  return  <DropDownBtn schema={
    [ {xs: 1, title: 'add', action: () => {
      setValue([...values, {}])
    }, menu: [
      { title: 'load', action: async() => {
        setValue([...values, ...await api.get(`id/${key}`)])
      } },
    ]}, {}
    ]
  }/>
}

export default AddItemBtn