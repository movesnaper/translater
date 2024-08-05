import React from "react";
import DropDownBtn from '../../../components/dropDownBtn'
import { db } from '../../../db/index.js'

const api = db(`/documents/translate/lingvo/`)


const Footer = ({value, setValue}) => {
  // const [items, setItems] = useState([])
  const {value: items, key} = value || {}
  const url = `id/${key}`
  // const test = ({value}) => {
  //   setValue({...card, value})
  // }
  return <DropDownBtn schema={
    [ 
      { title: 'load', action: async() => {
        const values = await api.get(url)
        console.log(values);
        setValue({...value, value: [...items, ...values]})
      } },
      // {},
      // { title: 'Save', action: () => setResult({index, value}) }
    ]
  }/>
}

export default Footer