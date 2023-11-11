import React, {useRef, useState, useEffect} from "react"
import style from './Home.module.css'
import { CRow, CCol } from '@coreui/react'
import { db } from '../../db/index.js'
import DocumentCard from './DocumentCard'

const Home =  () => {
  const inpFile = useRef()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)


  const onUpload =  async ({target}) => {
    const [file] = target.files
    if (!file) return
    setLoading('upload')
    try {
      const formData = new FormData()
      formData.append('pdfFile', file)
      setDocs([...docs, await db('/documents/upload').upload(formData)])
    } catch(e) {
      console.log(e)
      setLoading(false)
    }
  }

  const update = async () => {
    try {
      setDocs(await db('/documents').get())
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    update()
  }, [])

  return <div className={style.home}>
    <CRow className="gap-5">
      {[ ...docs, { title: 'Add', btn: 'upload' } ].map((doc, index) => {
        return <CCol sm={3} key={index}>
        <DocumentCard doc={doc} loading={loading} onClick={() => inpFile.current.click()}/>
      </CCol>

      })}
    </CRow>
    <input type="file" ref={inpFile} hidden onChange={onUpload}/>
  </div>
}

export default Home