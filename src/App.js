import './App.css'
import { Routes, Route } from "react-router-dom"
import {Home, Login, Text, Excludes, Dictionary, Praxis, NotFound} from './pages'
import Layout from './components/Layout'


function App() {
  return <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="/auth/:action?" element={<Login/>}></Route>
        <Route path="/excludes/:id?" element={<Excludes/>}></Route>
        <Route path="/dictionary/:id?" element={<Dictionary/>}></Route>
        <Route path="/text/:id?" element={<Text/>}></Route>
        <Route path="/praxis/:id?" element={<Praxis/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
}

export default App;
