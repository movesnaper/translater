import Header from './header/Header'
import { Outlet } from "react-router-dom"

const Lauout = () => {
  return <div className="App">
    <Header></Header>
      <div className='app-content'>
        <Outlet></Outlet>
      </div>
  </div>
}

export default Lauout