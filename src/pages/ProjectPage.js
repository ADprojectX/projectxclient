import SideNavBar from "../components/SideBar";
import './css/ProjectPage.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';


function ProjectPage() {
  
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${REQ_BASE_URL}/get-project`, { withCredentials: true })
            .then(response => {
                setProjects(response.data);  // assuming response data contains the list of projects
            })
            .catch(error => {
                console.error('Failed to fetch projects:', error);
            });
    }, []);

    function handleProjectClick(projectId) {
        localStorage.setItem('reqid', projectId);
        navigate('/video');
    }


    return (
        <div className="project-page">
            <SideNavBar />
            <div className="project-page-main">
                <h2>Projects</h2>
                <div className="project-grid">
                    {projects.map(project => (
                        <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                            <p>{project.topic || "Untitled"}</p>
                            {/* <h3>Project ID: {project.id}</h3> */}
                            <p>Created: {new Date(project.created).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  export default ProjectPage;