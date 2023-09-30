import React, {useState, createContext, useEffect} from "react"

export const UserContext = createContext()

const fetchUser = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: 'admin' })
    }, 1000)
  })
}

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState()
   useEffect( () => {
    // fetchUser().then((user) => setUser(user))
  }, [])

  return <UserContext.Provider value={user}>{ children }</UserContext.Provider>
}