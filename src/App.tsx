import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { useSelector } from 'react-redux';
import { NavTab } from './components/navTab/NavTab';
import { CategoriesPage } from './pages/categoriesPage/CategoriesPage';
import { CategoriesPageOnly } from './pages/categoriesPage/CategoriesPageOnly';
import { ManageVideosPage } from './pages/manageVideoPage/ManageVideosPage';
import { VideoPage } from './pages/videoPage/VideoPage';
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
        <Route path="/videos" element={<ManageVideosPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:categoryKey" element={<CategoriesPageOnly />} />
        <Route path="/video/:videoId" element={<VideoPage />} />

      </Routes>
    </Router>
  );
}
export default App;