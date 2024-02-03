import React, {useRef, useState, useEffect, useContext} from "react"
import style from './style.module.css'
import { CRow, CCol } from '@coreui/react'
import { db } from '../../db/index.js'
import DocumentCard from './card/index.jsx'
import { UserContext } from "../../components/UserProvider.jsx"
import Info from './info'

const Home =  () => {
  const [user] = useContext(UserContext)
  const inpFile = useRef()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)


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

  const save = ({ title, results }) => {
    try {
      setLoading(true)
      db('/documents').post('/', { title, results }).then(update)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => { user && update() }, [user])


  const cards = user &&  <CRow className="gap-5">
      {[ ...docs, { upload: () => inpFile.current.click() } ].map((doc, index) => {
        return <CCol sm={3} key={index}>
        <DocumentCard doc={{...doc, save }} loading={loading}/>
      </CCol>

      })}
    </CRow>
  return <div className={style.home}>
    { cards || <Info/> }
    <input type="file" ref={inpFile} hidden onChange={upload}/>

  </div>
}

export default Home