import Header from './header/Header'
import { Outlet } from "react-router-dom"
import { UserProvider } from './UserProvider'

const Lauout = () => {
  return <div className="App">
    <UserProvider>
      <Header/>
      <div className='app-content'>
        <Outlet></Outlet>
      </div>
    </UserProvider>
    
  </div>
}

export default Lauout