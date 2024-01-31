import React, {useRef, useState, useEffect} from "react"
import style from './style.module.css'
import { CRow, CCol } from '@coreui/react'
import { db } from '../../db/index.js'
import DocumentCard from './DocumentCard.jsx'

const Home =  () => {
  const inpFile = useRef()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)


  const upload =  async ({target}) => {
    const [file] = target.files
    if (!file) return
    setLoading(true)
    try {
      setDocs([...docs, {file}])
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

  const save = (file) => {
    try {
      const formData = new FormData()
      formData.append('pdfFile', file)
      setLoading(true)
      db('/documents/upload').upload(formData).then(update)      
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => { update() }, [])

  return <div className={style.home}>
    <CRow className="gap-5">
      {[ ...docs, { btn: 'Add' } ].map((doc, index) => {
        return <CCol sm={3} key={index}>
        <DocumentCard doc={doc} loading={loading} save={save}
        upload={() => inpFile.current.click()}/>
      </CCol>

      })}
    </CRow>
    <input type="file" ref={inpFile} hidden onChange={upload}/>
  </div>
}

export default Home