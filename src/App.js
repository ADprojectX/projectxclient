// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
// import VideoPlayer from './VideoPlayer';
// import VideoList from './VideoList';
import VideoPlayer from './pages/videoplayer';
import TitlePage from './pages/TitlePage';
import ScriptPage from './pages/ScriptPage';
import VoicePage from './pages/VoicePage';
import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';
import PrivateRouteLayout from './layout/PrivateRouteLayout'
// import SScriptPage from './pages/SScriptPage';



function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Private Routes */}
            <Route element={<PrivateRouteLayout/>}>
              <Route path="/dashboard" element={<DashboardPage />}/>
              <Route path="/script" element={<ScriptPage />} />
              <Route path="/title" element={<TitlePage />} />
            </Route>
            <Route path="/video" element={<VideoPlayer />} />
            <Route path="/voice" element={<VoicePage />} />
            <Route path="/script" element={<ScriptPage />} />
            <Route path="/Loading" element={<LoadingPage />} />

            {/* <Route path="/videolist" element={<VideoList />} /> */}
          </Routes>
        </div>
      </Router>
    );
}

const ProtectedRoute = ({children }) => {
  const user = localStorage.getItem('isAuthenticated');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated');
//   return (
//     <Route
//       {...rest}
//       element={<Component />}
//       render={() =>
//         isAuthenticated ? (
//           <Component />
//         ) : (
//           <Navigate to="/login" replace />
//         )
//       }
//     />
//   )
// };


export default App;
