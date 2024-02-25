import Header from './header'
import { Outlet } from "react-router-dom"
import { Provider } from './Provider'

const Lauout = () => {
  return <div className="App">
    <Provider>
      <Header/>
      <div className='app-content'>
        <Outlet></Outlet>
      </div>
    </Provider>
    
  </div>
}

export default Lauout