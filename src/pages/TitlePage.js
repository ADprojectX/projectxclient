import React, {useState} from 'react';
import { useNavigate, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000/api';

function TitlePage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [userName, setUserName] = React.useState(null);
  const [title, setTitle] = useState('');

  React.useEffect(() => {
    axios.get(`${API_BASE_URL}/dashboard/`, { withCredentials: true })
      .then((response) => {
        setUserName(response.data.username);
      })
      .catch((error) => {
        setErrorMessage('unauthorized');
        navigate('/login');
        console.log(error);
      });
  }, []);

  const handleLogoutClick = () => {
    let data = { token: Cookies.get('jwt') };
    axios.post(`${API_BASE_URL}/logout/`, data, { withCredentials: true })
      .then((response) => {
        Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true });
        Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true });
        console.log('logout_successful');
        navigate('/login');
      })
      .catch((error) => {
        setErrorMessage('cannot logout');
        console.log(error);
      });
  };

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

    // TODO: SEND THIS TITLE TO THE BACKEND---------------------

    // Reset the title field
    setTitle('');

    navigate('/script');

  };

  return (
    <div className="title-page">
      <h2>Title Page</h2>
      <h1>Hello, {userName}</h1>
      <p>Welcome to the Title Page</p>
      <button onClick={handleLogoutClick}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter Title" />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default TitlePage;
