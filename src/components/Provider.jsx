import jwt_decode from "jwt-decode"
import React, {useState, createContext, useEffect} from "react"
// import { useParams } from 'react-router-dom'

export const Context = createContext()


export const Provider = ({ children }) => {
  // const { id: doc_id = '' } = useParams()
  const [ state, setState ] = useState({})
  // const [ page, setPage ] = useState({})
  // const [ user, setUser ] = useState({})
  // const [ menu, setMenu ] = useState(null)
  // const [ pageText, setPageText ] = useState({})
  // const [ pagePraxis, setPagePraxis ] = useState({})
  // const [ pageDictionary, setPageDictionary ] = useState({})


  // const update = {

    // pageText: async (pageText = JSON.parse(localStorage.getItem('page-text') || '{}')) => {
    //   if (pageText) localStorage.setItem('page-text', JSON.stringify(pageText))
    //   setPageText(pageText)
    // },
    // pagePraxis: async (pagePraxis = JSON.parse(localStorage.getItem('page-praxis') || '{}')) => {
    //   if (pagePraxis) localStorage.setItem('page-praxis', JSON.stringify(pagePraxis))
    //   setPagePraxis(pagePraxis)
    // },
    // pageDictionary: async (pageDictionary = JSON.parse(localStorage.getItem('page-dictionary') || '{}')) => {
    //   if (pageDictionary) localStorage.setItem('page-dictionary', JSON.stringify(pageDictionary))
    //   setPageDictionary(pageDictionary)
    // },
  // }
  const update = (key, value) => {
    const obj = value || JSON.parse(localStorage.getItem(key))
    if (obj) localStorage.setItem(key, JSON.stringify(obj))
      return setState(state => {
        return {...state, [key]: obj}
      })

  }

  useEffect(() => {
    // update('page-text')
    // update.pageText()
    // update.pagePraxis()
    // update.pageDictionary()
  }, [])


  return <Context.Provider value={[
    // {
      // doc_id,
      // user,
      // menu: doc_id && menu, 
      // pageText, 
      // pagePraxis,
      // pageDictionary,
      // }, 
      state,
      update
    ]}>{ children }</Context.Provider>
}