import { Route, Routes } from 'react-router-dom'
import { CompTest } from '@components'

import './App.css'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <h1> Vite React App </h1>

      <CompTest />

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="about" element={<h1>About</h1>} />
      </Routes>
    </div>
  )
}

export default App
