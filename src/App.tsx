import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { useSelector } from 'react-redux';
import { NavTab } from './components/NavTab';
function App() {
  const isAutenticated = useSelector((state: any) => state.auth.isAutenticated);
  return (
    <Router>
      <NavTab />
      <Routes>
        <Route path="/login" element={isAutenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={isAutenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}
export default App;