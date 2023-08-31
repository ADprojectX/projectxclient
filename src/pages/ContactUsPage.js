import './css/ContactUsPage.css';
import React, { useState, useRef } from 'react';
import PublicNavBar from '../components/PublicNavBar';
import PublicFooter from '../components/PublicFooter';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
    const form = useRef();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Add this state variable for error messages

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!email || !name || !message) {
            setErrorMessage('All fields are mandatory.');
            return;
        }

        emailjs.sendForm('service_fhrgtda', 'template_yyvk5nb', form.current, 'VwjJGknL7DbcQEvJp')
          .then((result) => {
              console.log(result.text);
              setIsSubmitted(true);
              setName('');
              setEmail('');
              setMessage('');
              setErrorMessage(''); // Clear the error message upon successful submission
          }, (error) => {
              console.log(error.text);
              setErrorMessage('Something went wrong. Please try again.');
          });
    };

  return (
    <div className='contact-us-page'>
        <PublicNavBar />
        <div className="login">
            <div className='form-container'>
                <h2>Contact</h2>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <form ref={form} className="form" onSubmit={handleFormSubmit}>
                    <input type="text" name="user_name" placeholder="Name" value={name} onChange={handleNameChange} required />
                    <input type="email" name="user_email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                    <textarea 
                        name="message"
                        placeholder="Message" 
                        value={message} 
                        onChange={handleMessageChange}
                        style={{height: '163px', resize: 'none'}}
                        required
                    ></textarea>
                    <button type="submit">Send Message</button>
                </form>
                {isSubmitted && <p>Thank you for contacting us!</p>}
            </div>
        </div>
        <PublicFooter />
    </div>
  );
};

export default ContactUs;
