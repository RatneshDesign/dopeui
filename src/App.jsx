import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Docs from './Pages/Docs/Docs'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:componentName" element={<Docs />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </>
  )
}

export default App