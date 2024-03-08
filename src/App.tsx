import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { useSelector } from 'react-redux';
import { NavTab } from './components/navTab/NavTab';
import { ManageVideosPage } from './pages/manageVideoPage/ManageVideosPage';
import { MyVideosPage } from './pages/myVideosPage/MyVideosPage';
import { AllVideosPage } from './pages/allVideosPage/allVideosPage';
import { AccountPage } from './pages/accountPage/AccountPage';
import { ContentCategoryPage } from './pages/contentCategory/ContentCategoryPage';
import { ContentCategoryPageOnly } from './pages/categoryPageOnly/ContentCategoryPageOnly';
import { ContentDetailsPage } from './pages/videoPage/ContentDetailsPage';
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
        <Route path="/categories" element={<ContentCategoryPage />} />
        <Route path="/category/:categoryKey" element={<ContentCategoryPageOnly />} />
        <Route path="/video/:videoId" element={<ContentDetailsPage />} />
        <Route path="/myVideos" element={<MyVideosPage />} />
        <Route path="/allVideos" element={<AllVideosPage />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
    </Router>
  );
}
export default App;