import React, {useState} from 'react';
import { useNavigate, Redirect } from 'react-router-dom';
import axios from 'axios';
import './css/TitlePage.css'
import TypeWriterEffect from 'react-typewriter-effect';
import Typewriter from "typewriter-effect";
import SideBar from '../components/SideBar';
import { BsFillArrowRightCircleFill } from "react-icons/bs"; 

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function TitlePage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [title, setTitle] = useState('');
  const [csrfToken, setCsrfToken] = React.useState('')
  const [topic, setTopic] = React.useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
        setErrorMessage('Title cannot be empty');
        return;
      }
    // Perform the desired action with the title
    console.log('Title:', title);
    let headers = {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    };
    let data = {topic:topic}
    axios.post(`${REQ_BASE_URL}/project/`, data, {headers: headers, withCredentials:true})
      .then((response) => {
        localStorage.setItem('reqid', response.data.reqid);
        // console.log(response.data.script);
        console.log(response.data)
        console.log('Project Submitted');
        // navigate('/script', { state: { script: response.data.script } });
        navigate('/script', {state:{reqid:response.data.reqid}});
      })
      .catch((error) => {
        setErrorMessage('project not submitted');
        console.log(error);
      });
    // TODO: SEND THIS TITLE TO THE BACKEND---------------------

    // Reset the title field
    setTitle(title);
  };

  return (
    <div className="title">
      <SideBar />
      <div className="title-content">
          {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
          
          <div className='title-input-unit'>
              <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter your video title here..." />
              <button onClick={handleSubmit} type="submit">
                <BsFillArrowRightCircleFill className="title-btn" color={title.trim() === '' ? 'transparent' : '#10C300'} size={32}/>
              </button>
          </div>

        <div className='typewriter-display'>
          <div className='typewriter-texts'>
            <div className='tt'>
              <Typewriter
                options={{
                  loop:true,
                  skipAddStyles:false,
                  cursor:"",
                  delay: 40,
                }}
                onInit={(typewriter) => {
                  typewriter
                  .typeString("10 Essential tips for raising happy and healthy pets")
                  .pauseFor(1000)
                  .deleteAll()
                  .pauseFor(1000)
                  .typeString("The Ultimate Guide to Personal Finance: Master Your Money")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Delicious and easy recipes for quick weeknight dinners")
                  .pauseFor(1000)
                  .deleteAll()
                  .pauseFor(1000)
                  .typeString("Yoga for Beginners: Relax and Rejuvenate with Simple Poses")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Effective workouts without any equipment")
                  .pauseFor(1000)
                  .deleteAll()
                  .pauseFor(1000)
                  .typeString("Gardening Tips and Tricks: Cultivate a Stunning Green Oasis")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Parenting Advice: Nurturing Happy and Confident Children")
                  .pauseFor(1000)
                  .deleteAll()
                  .pauseFor(1000)
                  .typeString("Self-Care Routine: Pamper Yourself for a Healthy Mind and Body")
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
                  typewriter.loop = true;
                }}
                />
            </div>
            
            {/* <div className='tt'>
              <Typewriter
                options={{
                  loop:true,
                  skipAddStyles:false,
                  cursor:"",
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Delicious and easy recipes for quick weeknight dinners")
                        .pauseFor(5000)
                        .deleteAll()
                        .pauseFor(2000)
                        .typeString("Yoga for Beginners: Relax and Rejuvenate with Simple Poses")
                        .pauseFor(1000)
                        .deleteAll()
                        .start();
                    typewriter.loop = true;
                }}
              />
            </div>

            <div className='tt'>
              <Typewriter
                options={{
                  loop:true,
                  skipAddStyles:false,
                  cursor:"",
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Effective workouts without any equipment")
                        .pauseFor(5000)
                        .deleteAll()
                        .pauseFor(2000)
                        .typeString("Gardening Tips and Tricks: Cultivate a Stunning Green Oasis")
                        .pauseFor(1000)
                        .deleteAll()
                        .start();
                    typewriter.loop = true;
                }}
              />
            </div>

            <div className='tt'>
              <Typewriter
                options={{
                  loop:true,
                  skipAddStyles:false,
                  cursor:"",
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Parenting Advice: Nurturing Happy and Confident Children")
                        .pauseFor(5000)
                        .deleteAll()
                        .pauseFor(2000)
                        .typeString("Self-Care Routine: Pamper Yourself for a Healthy Mind and Body")
                        .pauseFor(1000)
                        .deleteAll()
                        .start();
                    typewriter.loop = true;
                }}
              />
            </div> */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default TitlePage;
