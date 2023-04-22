import { useState } from 'react'
import './App.css'
import Header from './assets/components/header'
import Buscador from './assets/components/Buscador'
import MiApi from './assets/components/MiApi'

function App() {
  const [dbfarm, setDbFarm] = useState([])
  const [busqueda, setBusqueda] = useState('')


  return (
      <div className='container'>
        <Header />
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
        <MiApi dbfarm={dbfarm} setDbFarm={setDbFarm} busqueda={busqueda} />
      </div>

  )
}

export default App
