import { Route, Routes } from 'react-router-dom'

// ADMIN PAGES
import { EditQuestionPage } from '@pages/admin/EditQuestionPage/EditQuestionPage'

import './App.css'

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />

      <Route path="admin">
        <Route path="question/edit/:questionId" element={<EditQuestionPage />} />
      </Route>

      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>Page Not Found!</p>
          </main>
        }
      />
    </Routes>
  )
}

export default App
