import React, {useRef} from "react"
import { db } from '../../db/index.js'
import DocTitle from '../../components/docTitle'
import { NavLink } from "react-router-dom"
import { CFormCheck, CButton } from '@coreui/react'
import CardBtn from '../../components/CardBtn.jsx'
import DropDownBtn from '../../components/dropDownBtn'
import Layout from './layout'
import Modal from './modal'
import style from './style.module.css'

const HomePage =  () => {

  const inpFile = useRef()


  const upload =  async (file) => {
    // if (!file) return
    try {
      const formData = new FormData()
      formData.append('pdfFile', file)
      return db('/documents/upload').upload(formData)
    } catch(error) { console.error(error) } 
  }

  const save = async ({id, title, desc}) => {
    try {
      return db('/documents').post(`/${id}`, {title, desc})
    } catch (error) { console.error(error) }
  }

  const remove = async (checked) => {
    const docs = checked.map(({id}) => id)
    try {
      await db().remove('/documents', {docs})
      return docs
    } catch(error) { console.error(error) }
  }

  const merge = async(id) => {
    try {
        await db('/documents').get(`/merge/${id}`)
    } catch (error) { console.error(error) }
}

  return <Layout
    api={() => db('/documents').get()}
    schema={({values = [], setModal, setValues}) => {
      const checked = values.filter(({checked}) => checked >= 0)

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
              upload(...target.files)
                .then((doc) => setValues([doc, ...values]))
                  .then(() => setLoading(false))
            }}/>
          }
        }}/>,
        table: {
          header: [
            {value: '#', getValue: (_, index) => index + 1},
            {value: 'title', getValue: (value, index) => {
              const {id, title} = value
              return DocTitle({
                title: <NavLink className={style.pages__home__link} to={`/text/${id}`} >{title}</NavLink>,
                menu: [
                  {title: 'praxis', href: `/praxis/${id}`},
                  {title: 'dictionary', href: `/dictionary/${id}`},
                  {title: 'edit', action: () => setModal({value, index})},
                  {title: 'merge', action: (_, setLoading) => {
                    setLoading(true)
                    merge(id).then(() => setLoading(false))
                  }}
                ]
              })
            }
              
            },
            {value: 'desc', getValue: (({desc, user}) => desc || user)},
            { value: DropDownBtn({schema: [
              { value: checked.length, menu: [
                {title: 'remove', action: () => 
                  remove(checked).then((ids = []) => 
                    setValues(values.filter(({id}) => !ids.includes(id))))}
              ]}
            ]}), getValue: (({checked}, index) => <CButton style={{width: '100%'}}  variant='ghost' onClick={(e) => {
              e.stopPropagation()
              select(index, !(checked >= 0) )
            }}>
              <CFormCheck
            defaultChecked={checked >= 0 }/> </CButton>)}
          ],
          items: values.map((value, index) => ({ value }))
        },
        modal: Modal({save: ({value, index}) => 
          save(value).then(() => {
            values.splice(index, 1, value)
            setValues(values)
            setModal(false)
          })})
      }
    }}
  />

}

export default HomePage