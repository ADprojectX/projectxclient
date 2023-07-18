import HomeCssPage from './css/Home.css'
import {  useOutletContext } from "react-router-dom";


function HomePage() {
    // const { obj }= useOutletContext();

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
        <button onClick={handleLoginClick}>Get Started</button>

        {/* <h2>obj: {obj}</h2> */}

        {/* <button onClick={handleSignupClick}>Sign Up</button>
        <button onClick={handleVideoClick}>Video Player</button> */}
        {/* <button onClick={handleVideoListClick}>Video List</button> */}
      </div>
    );
  }

  export default HomePage;