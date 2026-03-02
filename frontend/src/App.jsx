import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { MatchDetailPage } from './pages/MatchDetailPage'
import { CreateMatchPage } from './pages/CreateMatchPage'
import './styles/index.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/matches/new" 
            element={
              <ProtectedRoute>
                <CreateMatchPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/matches/:id" 
            element={<MatchDetailPage />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
