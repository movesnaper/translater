import React, { useState } from "react"

import Header from './header'
import { Outlet } from "react-router-dom"

const Lauout = () => {
  const [state, setState] = useState({})

  return <div className="App">
      <Header state={state} setState={setState}></Header>
      <div className='app-content'>
        <Outlet context={[state, (value) => {
          setState(state => {
            return {...state, ...value}
          })
        }]}></Outlet>
      </div>
  </div>
}

export default Lauout