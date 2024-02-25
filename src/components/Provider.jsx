import jwt_decode from "jwt-decode"
import React, {useState, createContext, useEffect} from "react"
export const Context = createContext()


export const Provider = ({ children }) => {
  // const [ state, setState ] = useState({})
  const [ user, setUser ] = useState({})
  const [ pageText, setPageText ] = useState(null)


  const update = {
    user: (jwt = localStorage.getItem('user_jwt')) => {
      if (jwt) localStorage.setItem('user_jwt', jwt)
      setUser(jwt && jwt_decode(jwt))
    },
    pageText: async (pageText = JSON.parse(localStorage.getItem('page-text') || '{}')) => {
      if (pageText) localStorage.setItem('page-text', JSON.stringify(pageText))
      setPageText(pageText)
    }
  }

  useEffect(() => {
    update.user()
    update.pageText()
  }, [])


  return <Context.Provider value={[{ user, pageText }, update]}>{ children }</Context.Provider>
}