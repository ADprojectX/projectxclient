import './App.css';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import VideoPlayer from './pages/Videoplayer';
import TitlePage from './pages/TitlePage';
import ScriptPage from './pages/ScriptPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import ContactUs from './pages/ContactUsPage';
import PrivateRouteLayout from './layout/PrivateRouteLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route>
    {/* Public Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/contact" element={<ContactUs />} />
    {/* Private Routes */}
    <Route element={<PrivateRouteLayout/>}>
      <Route path="/dashboard" element={<DashboardPage />}/>
      <Route path="/script" element={<ScriptPage />} />
      <Route path="/title" element={<TitlePage />} />
      <Route path="/video" element={<VideoPlayer />} />
      <Route path="/projects" element={<ProjectPage />} />
    </Route>
  </Route>
  )
)

function App() {
  return (
        <div className="App">
          <RouterProvider router={router}/>        
        </div>
    );
}


export default App;
