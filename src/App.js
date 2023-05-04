// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DashboardPage from './DashboardPage';

function App() {
  return (
      <Router>
        <div className="App">
          <h1 id = 'abc'>Welcome to my App</h1>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <PrivateRoute element={<DashboardPage/>}/> */}
            <Route exact path='/dashboard' element={<PrivateRoute/>} />
          </Routes>
        </div>
      </Router>
    );
}

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  //check if I as a user am able to manipulate the isAuthenticated
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function HomePage() {
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleSignupClick = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="home">
      <h2>Home</h2>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignupClick}>Sign Up</button>
    </div>
  );
}

export default App;
