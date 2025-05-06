import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import { About } from './pages/About'
import Navbar from './components/NavBar'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/exchange_rates_live' element={<Exchange/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/error' element={<Error/>} />
      </Routes>
    </>
  )
}

export default App
