import jwt_decode from "jwt-decode"
import React, {useState, createContext, useEffect} from "react"
export const UserContext = createContext()


export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState()
  
  const update = (jwt = localStorage.getItem('user_jwt')) => {
    jwt && localStorage.setItem('user_jwt', jwt)
    setUser(jwt ? jwt_decode(jwt) : '')
  }

  useEffect(() => {
    update()
  }, [])


  return <UserContext.Provider value={ [user, update] }>{ children }</UserContext.Provider>
}