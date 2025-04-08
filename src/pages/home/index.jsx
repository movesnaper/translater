import React, {useRef} from "react"
import { db } from '../../db/index.js'

import { CFormCheck, CButton } from '@coreui/react'
import CardBtn from '../../components/CardBtn.jsx'
import DropDownBtn from '../../components/dropDownBtn'
import Layout from './layout'
import Info from './info'
import Modal from './modal'
import style from './style.module.css'

const HomePage =  () => {

  const inpFile = useRef()


  const upload =  async (file) => {
    if (!file) return
    try {
      const formData = new FormData()
      formData.append('pdfFile', file)
      return db('/documents/upload').upload(formData)
    } catch(error) { console.error(error) } 
  }

  // const save = async ({id, title, desc}) => {
  //   try {
  //     return db('/documents').post(`/${id}`, {title, desc})
  //   } catch (error) { console.error(error) }
  // }

  const remove = async (checked) => {
    try {
      return db().remove('/documents', {docs: checked.map(({id}) => id)})
    } catch(error) { console.error(error) }
  }



  return <Layout
    api={() => db('/documents').get()}
    schema={({values, setModal, setValues}) => {
      const checked = values ? values.filter(({checked}) => checked >= 0) : []

      const select = (index, checked) => {
        values.splice(index, 1, {...values[index], checked:  checked ? index : undefined})
        setValues([...values])
      }

      return {
        header: <CardBtn schema={({setLoading}) => {
          return {
            title: 'Add', 
            color: 'dark', 
            onClick: () => inpFile.current.click(),
            prepend: <input type="file" ref={inpFile} hidden onChange={({target}) => {
              setLoading(true)
              upload(...target.files).then(() => setValues(false)).then(() => setLoading(false))
            }}/>
          }
        }}/>,
        table: {
          header: [
            {value: '#', getValue: (_, index) => index + 1},

            {value: 'desc', getValue: ((doc, index) => {
              return <Info doc={doc} api={({id}) => db('/documents').get(`/${id}`)} 
              setModal={(value) => setModal({value, index})}/>
            })},
            { value: DropDownBtn({schema: [
              { title: checked.length || '', menu: [
                {title: 'remove', action: () => remove(checked).then(() => setValues(false)) }
              ]}
            ]}), 
            getValue: (({checked}, index) => <CButton style={{width: '100%'}}  variant='ghost' onClick={(e) => {
              e.stopPropagation()
              select(index, !(checked >= 0) )
            }}><CFormCheck defaultChecked={checked >= 0 }/> </CButton>)}
          ],
          items: values && values.map((value, index) => ({ value }))
        },
        modal: (update) => Modal({
          save: async ({value, index}) => {
            const {id, title, desc} = value
            try {
              await db('/documents').post(`/${id}`, {title}).then(() => update(value, index))
              setModal(false)
            } catch (error) { console.error(error) }
          }
        })
      }
    }}
  />

}

export default HomePage