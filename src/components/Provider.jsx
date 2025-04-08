import jwt_decode from "jwt-decode"
import React, {useState, createContext, useEffect} from "react"
import { useParams } from 'react-router-dom'

export const Context = createContext()


export const Provider = ({ children }) => {
  const { id: doc_id = '' } = useParams()
  const [ user, setUser ] = useState({})
  const [ menu, setMenu ] = useState(null)
  const [ pageText, setPageText ] = useState(null)
  const [ pagePraxis, setPagePraxis ] = useState(null)
  const [ pageDictionary, setPageDictionary ] = useState(null)


  const update = {
    user: (jwt = localStorage.getItem('user_jwt')) => {
      if (jwt) localStorage.setItem('user_jwt', jwt)
      setUser(jwt && jwt_decode(jwt))
    },
    menu: (value) => {
      setMenu(value)
    },
    pageText: async (pageText = JSON.parse(localStorage.getItem('page-text') || '{}')) => {
      if (pageText) localStorage.setItem('page-text', JSON.stringify(pageText))
      setPageText(pageText)
    },
    pagePraxis: async (pagePraxis = JSON.parse(localStorage.getItem('page-praxis') || '{}')) => {
      if (pagePraxis) localStorage.setItem('page-praxis', JSON.stringify(pagePraxis))
      setPagePraxis(pagePraxis)
    },
    pageDictionary: async (pageDictionary = JSON.parse(localStorage.getItem('page-dictionary') || '{}')) => {
      if (pageDictionary) localStorage.setItem('page-dictionary', JSON.stringify(pageDictionary))
      setPageDictionary(pageDictionary)
    },
  }

  useEffect(() => {
    update.user()
    update.pageText()
    update.pagePraxis()
    update.pageDictionary()
  }, [])


  return <Context.Provider value={[{
      doc_id,
      user,
      menu: doc_id && menu, 
      pageText, 
      pagePraxis,
      pageDictionary,
      }, update]}>{ children }</Context.Provider>
}