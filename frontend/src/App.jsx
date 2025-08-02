import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';

// Layouts
import MainAppLayout from './layouts/MainAppLayout.jsx';

// Pages
import HomePage from './pages/HomePage';
import KnowYourCropsPage from './pages/KnowYourCropsPage';
import TradeCenterPage from './pages/TradeCenterPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />

      {/* Protected Routes */}
      <Route element={authUser ? <MainAppLayout /> : <Navigate to="/login" />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/trade_center" element={<TradeCenterPage />} />
        <Route path="/know_your_crops" element={<KnowYourCropsPage />} />
        <Route path="/about_us" element={<AboutUsPage />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;