import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
		</Routes>
	)
}
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar onLoginClick={() => setShowLoginModal(true)} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/client-dashboard" 
            element={
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            } 
