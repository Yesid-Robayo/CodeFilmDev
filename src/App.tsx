import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { useSelector } from 'react-redux';
import { NavTab } from './components/navTab/NavTab';
import { VideosPage } from './pages/videosPage/VideosPage';
function App() {
  const isAutenticated = useSelector((state: any) => state.auth.isAutenticated);
  return (
    <Router>
      <NavTab />
      <Routes>
        <Route path="/login" element={isAutenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
    </Router>
  );
}
export default App;