import React, {useRef, useState, useEffect, useContext} from "react"
import style from './style.module.css'
import { CRow, CCol } from '@coreui/react'
import { db } from '../../db/index.js'
import DocumentCard from './card/index.jsx'
import { Context } from "../../components/Provider"
import Info from './info'
import CheckInput from '../../components/checkInputs'
import DropDownBtn from '../../components/dropDownBtn'


const HomePage =  () => {
  const [{user}] = useContext(Context)

  const inpFile = useRef()

  const [docs, setDocs] = useState([])

  const [loading, setLoading] = useState(false)

  const checked = docs.filter(({checked}) => !!checked)

  const upload =  async ({target}) => {
    const [file] = target.files
    if (!file) return
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('pdfFile', file)
      setDocs([...docs, await db('/documents/upload').upload(formData)])
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const update = async () => {
    try {
      setLoading(true)
      setDocs(await db('/documents').get())
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  const save = ({ title }) => {
    try {
      setLoading(true)
      db('/documents').post('/', { title }).then(update)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    const docs = checked.map(({id}) => id)
    try {
      await db().remove('/documents', {docs})
      update()
    } catch(err) {
      console.log(err);
    }
  }

  const check = (index) => {
    const doc = docs[index]
    docs.splice(index, 1, {...doc, checked: !doc.checked})
    setDocs([...docs])
  }

  useEffect(() => { user && update() }, [user])

  const cards = user &&  <CRow>
    <CCol>
      <CRow className="gap-5">
        {[ ...docs, { upload: () => inpFile.current.click() } ].map((doc, index) => {
          return <CCol sm={3} key={index}>
          {doc.id && <CheckInput checked={!!doc.checked}
             onCheck={() => check(index)}/>}
          <DocumentCard doc={{...doc, save }} loading={loading}/>
        </CCol>

        })}
      </CRow>
    </CCol>
    <CCol xs={1}><DropDownBtn schema={[
        { value: checked.length, menu: [
          { title: 'Remove', action: remove },
        ] }
      ]}/></CCol>
  </CRow>

  return <div className={style.home__page}>{cards || <Info/>}
    <input type="file" ref={inpFile} hidden onChange={upload}/>
  </div>
}

export default HomePage