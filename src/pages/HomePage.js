import PublicNavBar from '../components/PublicNavBar'
import './css/Home.css'
import ReactPlayer from "react-player";


function HomePage() {
    const handleLoginClick = () => {
      window.location.href = '/login';
    };

    return (
      <div className="home">
        <PublicNavBar />
        <div className='home-main'>
          <div className='hero'>
            <p className='hero-desc1'>Turn Your Vision into <span className='hero-top-title'>Reality</span></p>
            <h1>Craft your videos with <span className='hero-title-gen-ai'>generative AI</span></h1>
            <p className='hero-desc2'>Start with a thought, and let the AI evolve it. With scripts that engage, scenes that enthrall, voiceovers that connect, and edits that enchant. Welcome to impactful storytelling.</p>
            <button>Try Now</button>
          </div>

          <div>
            <div className="video-container">
              <video width="100%" height="auto" autoPlay muted loop>
                <source src="../main.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HomePage;
