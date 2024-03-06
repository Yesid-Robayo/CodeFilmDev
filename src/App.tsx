import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './helpers/auth';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
export default App;