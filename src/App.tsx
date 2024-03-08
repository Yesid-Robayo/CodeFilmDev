import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { useSelector } from 'react-redux';
import { NavTab } from './components/navTab/NavTab';
import { CategoriesPage } from './pages/categoriesPage/CategoriesPage';
import { CategoriesPageOnly } from './pages/categoryPageOnly/CategoriesPageOnly';
import { ManageVideosPage } from './pages/manageVideoPage/ManageVideosPage';
import { VideoPage } from './pages/videoPage/VideoPage';
import { MyVideosPage } from './pages/myVideosPage/MyVideosPage';
import { AllVideosPage } from './pages/allVideosPage/allVideosPage';
import { AccountPage } from './pages/accountPage/AccountPage';
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
        <Route path="/manageVideos" element={<ManageVideosPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:categoryKey" element={<CategoriesPageOnly />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/myVideos" element={<MyVideosPage />} />
        <Route path="/allVideos" element={<AllVideosPage />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
    </Router>
  );
}
export default App;