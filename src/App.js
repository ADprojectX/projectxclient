// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DashboardPage from './DashboardPage';
import VideoPlayer from './VideoPlayer';
// import VideoList from './VideoList';

function App() {
  return (
      <Router>
        <div className="App">
          <h1 id = 'abc'>Welcome to my App</h1>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/video" element={<VideoPlayer />} />
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

function HomePage() {
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleSignupClick = () => {
    window.location.href = '/signup';
  };

  const handleVideoClick = () => {
    window.location.href = '/video';
  };
  const handleVideoListClick = () => {
    window.location.href = '/videolist';
  };

  return (
    <div className="home">
      <h2>Home</h2>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignupClick}>Sign Up</button>
      <button onClick={handleVideoClick}>Video Player</button>
      {/* <button onClick={handleVideoListClick}>Video List</button> */}
    </div>
  );
}

export default App;
