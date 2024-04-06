import './styles/App.css'
import Searcher from "./utils/hooks/Searcher.jsx"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './hooks/Form.jsx'

function App() {

  return (
    <>
      <main className="buscador-main">
        <Searcher/>
      </main>
      <Form />
    </>
  )
}

export default App
